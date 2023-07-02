import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

const root = createRoot(document.querySelector('#root'));

const body = document.querySelector('body');


root.render(<App/>);
// root.render(
//   <div id="app">
//   </div>
// )
