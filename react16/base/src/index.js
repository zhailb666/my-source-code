/*
 * @Author: your name
 * @Date: 2020-08-25 13:51:29
 * @Description: file content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Demo01  from './demo/demo01';
import * as serviceWorker from './serviceWorker';

import './demo/requestIdCallback';

ReactDOM.render(
  <React.StrictMode>
    <Demo01 />
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM.unstable_createRoot(
//   document.getElementById('root')
// ).render(<React.StrictMode>
//     <App />
//   </React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
