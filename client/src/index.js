import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.js';

const root = createRoot(document.querySelector('#root'));

const body = document.querySelector('body');


root.render(<App/>);
// root.render(<div style={{
//   backgroundColor: 'blue',
//   height: '150%',
//   position: 'absolute',
//   zIindex: 10,
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0
// }}></div>)
