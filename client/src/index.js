import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';
import Error from './components/Error.js';
import Gallery from './components/gallery/Gallery.js';

const root = createRoot(document.querySelector('#root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>
  },
  {
    path: "gallery",
    element: <Gallery/>,
    errorElement: <Error/>,
  }
]);


// root.render( <RouterProvider router={router} />);
root.render(<App/>)
