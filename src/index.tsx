import React from 'react';
import ReactDOM from 'react-dom';
import OTree from './components/unique-organisms/o-tree';
import reportWebVitals from './reportWebVitals';

import './firebaseApp';

ReactDOM.render(
  <React.StrictMode>
    <OTree />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
