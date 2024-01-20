import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';

const root = createRoot(document.querySelector('#root'));

const router = createBrowserRouter([{ path: "/", element: <App/>}]);


root.render( <RouterProvider router={router} />);
