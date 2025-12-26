import React, { useState, useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "../dist/styles/styles.scss";
import Gallery from "./components/gallery/Gallery.js";
import Home from "./components/home/Home.js";
import MobileGallery from "./Mobile/MobileGallery.js";
import MobileHome from "./Mobile/MobileHome.js";
import Error from "./components/Error.js";
import useGeoApify from "./hooks/useGeoApify.js";

const App = () => {
  useEffect(() => {
    getVisitRef();
    handleSize();
    handleVisits();
  }, []);

  const pageRef = useRef({});

  const [exhibits, selectExhibit] = useState(false);

  const [viewSize, getSize] = useState(window.innerWidth);

  const [XYRef, getXYRef] = useState({});

  const [isMounted, setMount] = useState(true);

  const MobileView = viewSize <= 450;

  //* Track pages visited in session *//

  const getVisitRef = () => {
    let events = ["load", "hashchange", "popstate", "pushstate"];
    for (const event of events) {
      window.addEventListener(event, () => {
        let path = window.location.pathname + window.location.hash;
        try {
          pageRef.current[`${path}`] = true;
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  const handleVisits = async () => {
    useGeoApify()
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let data = {
          ip: result.ip,
          country: result.country["iso_code"],
          city: result.city.name,
          lat: result.location.latitude,
          long: result.location.longitude,
          date: Date(),
        };
        let mountDate = new Date();
        const handleUnmount = () => {
          window.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
              data["session_time"] = Math.floor(
                (new Date().getTime() - mountDate.getTime()) / 1000,
              );
              try {
                data.pages = pageRef.current;
              } catch (error) {
                console.error(error);
              }
              const blob = new Blob([JSON.stringify(data)], {
                type: "application/json",
              });
              navigator.sendBeacon("/visits", blob);
            }
          });
        };
        handleUnmount();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  //*----------------------------------*/

  const handleSize = () => {
    window.addEventListener("resize", () => {
      console.log("window.innerWidth:", window.innerWidth);
      getSize(window.innerWidth);
    });
  };

  const toggleSelect = (exhibit) => {
    selectExhibit({ ...exhibits, ["exhibit"]: exhibit });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          isMounted={isMounted}
          setMount={setMount}
          toggleSelect={toggleSelect}
          viewSize={viewSize}
          XYRef={XYRef}
          getXYRef={getXYRef}
        />
      ),
      errorElement: <Error />,
    },
    {
      path: "gallery/:id",
      element: (
        <Gallery
          exhibits={exhibits}
          selectExhibit={selectExhibit}
          setMount={setMount}
          XYRef={XYRef}
          getXYRef={getXYRef}
          pageRef={pageRef}
          getVisitRef={getVisitRef}
        />
      ),
      errorElement: <Error />,
    },
    {
      path: "slide",
      element: <div className="slide">slide</div>,
      errorElement: <Error />,
      children: [
        {
          path: "slide/:id",
          element: (
            <div id="detail">
              <Outlet />
            </div>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="app">
      {MobileView ? (
        exhibits ? (
          <MobileGallery
            exhibits={exhibits}
            selectExhibit={selectExhibit}
            setMount={setMount}
            XYRef={XYRef}
            getXYRef={getXYRef}
          />
        ) : (
          <MobileHome
            isMounted={isMounted}
            setMount={setMount}
            toggleSelect={toggleSelect}
            XYRef={XYRef}
            getXYRef={getXYRef}
          />
        )
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;
