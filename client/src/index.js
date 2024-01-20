import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';

const root = createRoot(document.querySelector('#root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "gallery",
    element: <div className='temp'>Gallery</div>,
    errorElement: <div className='error'>404 Not found</div>
  }
]);


root.render( <RouterProvider router={router} />);
