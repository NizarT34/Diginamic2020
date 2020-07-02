import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Table from './component/Table';
import App from './component/App'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

