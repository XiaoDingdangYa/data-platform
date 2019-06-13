import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<div>
    <Router/> 
</div>
, document.getElementById('root'));


serviceWorker.unregister();
