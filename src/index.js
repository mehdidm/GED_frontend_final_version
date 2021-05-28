  
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import { RecoilRoot } from "recoil";
import recoilPersist from "recoil-persist";
axios.defaults.baseURL='http://localhost:8080/'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();