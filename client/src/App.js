import React, { useState , useEffect, useRef} from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { animated, useSpring, useTransition } from '@react-spring/web';
import '../dist/styles/styles.scss';
import Gallery from './components/gallery/Gallery.js';
import Home from './components/home/Home.js';
import MobileGallery from './Mobile/MobileGallery.js';
import MobileHome from './Mobile/MobileHome.js';
import Error from './components/Error.js';
import useGeoApify from './hooks/useGeoApify.js';

const App = () => {

  const visitedRef = useRef(false);
  let hasVisited = visitedRef.current;
  let pageRef = useRef({});

  const getVisitRef = () => {

    let events = ['load', 'hashchange', 'popstate', 'pushstate']
    for (event of events) {
      window.addEventListener(event, () => {
        let path = window.location.pathname + window.location.hash;
        pageRef.current[`${path}`] = true;
      })
    }
  };

  useEffect(() => {
    getVisitRef();
    handleSize();
    handleVisits();
  }, []);

  const [exhibits, selectExhibit] = useState(false);

  const [viewSize, getSize] = useState(window.innerWidth);

  const [XYRef, getXYRef] = useState({});

  const [isMounted, setMount] = useState(true);

  const MobileView = viewSize <= 450;

 const handleVisits = async () => {
    useGeoApify()
    .then((response) => {return response.json();})
    .then((result) => {
      let data = {
        ip: result.ip,
        country: result.country['iso_code'],
        city: result.city.name,
        lat: result.location.latitude,
        long: result.location.longitude,
        date: Date(),
        }
      let mountDate = new Date();
      const handleUnmount = () => {
        window.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            data['session_time'] = Math.floor((new Date().getTime() - mountDate.getTime()) / 1000);
            try {
              data.pages = pageRef.current
              } catch (error) {
                console.console.error();
            }
            const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
            navigator.sendBeacon("/visits", blob);
          }
        });
      }
      handleUnmount();
    })
    .catch((error) => {console.log('error', error)});
  };

// const handleVisits = async () => {

//       let mountDate = new Date();
//       const handleUnmount = () => {
//         window.addEventListener("visibilitychange", () => {
//           if (document.visibilityState === "hidden") {
//              const blob = new Blob([JSON.stringify(pageRef.current)], { type: "application/json" });
//             navigator.sendBeacon("/visits", blob);
//           }
//         });
//       }
//       handleUnmount();

//   };

  const handleSize = (size) => {
    window.addEventListener('resize', () => {
      console.log('window.innerWidth:', window.innerWidth);
      getSize(window.innerWidth);
    })
  };

  const spring = useSpring({
    from: { opacity: 0, transition: '0.5s ease-in', x: -200 },
    to: {opacity: 1, x: 0}
  })

  const toggleSelect = (exhibit) => {
    selectExhibit({...exhibits, ['exhibit']: exhibit});
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} viewSize={viewSize} XYRef={XYRef} getXYRef={getXYRef} />,
      errorElement: <Error/>
    },
    {
      path: "gallery/:id",
      element: <Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount} XYRef={XYRef} getXYRef={getXYRef} pageRef={pageRef} getVisitRef={getVisitRef}/>,
      errorElement: <Error/>,
    },
    {
      path: 'slide',
      element: <div className='slide'>slide</div>,
      errorElement: <Error/>,
      children: [
        {
          path: "slide/:id",
          element: <div id="detail">
          <Outlet />
      </div>,
        },
      ],
    }
  ]);

  return (
    <div className="app">
       { MobileView ?
          exhibits ?
           <MobileGallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount} XYRef={XYRef} getXYRef={getXYRef}/> :
           <MobileHome isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} XYRef={XYRef} getXYRef={getXYRef}/>
        :
       <RouterProvider router={router} />
       }
    </div>
  )
};

export default App;