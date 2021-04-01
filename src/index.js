import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import '../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import './index.css';
import './react-table.css';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
