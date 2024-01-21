import React, { useState , useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { animated, useSpring, useTransition } from '@react-spring/web';
import '../dist/styles/styles.scss';
import Gallery from './components/gallery/Gallery.js';
import Home from './components/home/Home.js';
import MobileGallery from './Mobile/MobileGallery.js';
import MobileHome from './Mobile/MobileHome.js';
import Error from './components/Error.js';

const App = () => {

  useEffect(() => {
    handleSize();
  }, []);

  const [exhibits, selectExhibit] = useState(false);

  const [viewSize, getSize] = useState(window.innerWidth);

  const [XYRef, getXYRef] = useState({});

  const [isMounted, setMount] = useState(true);

  const MobileView = viewSize <= 450;

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
      element: MobileView ?
      <MobileHome isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} XYRef={XYRef} getXYRef={getXYRef}/> :
      <Home isMounted={isMounted} setMount={setMount} toggleSelect={toggleSelect} viewSize={viewSize} XYRef={XYRef} getXYRef={getXYRef}/>,
      errorElement: <Error/>
    },
    {
      path: "gallery/:id",
      element: MobileView  ? <MobileGallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount} XYRef={XYRef} getXYRef={getXYRef}/> :<Gallery exhibits={exhibits} selectExhibit={selectExhibit} setMount={setMount} XYRef={XYRef} getXYRef={getXYRef}/>,
      errorElement: <Error/>,
    }
  ]);

  return (
    <div className="app">
       <RouterProvider router={router} />
    </div>
  )
};

export default App;