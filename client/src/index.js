import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Context from './Context/Context'

ReactDOM.render(
  <React.StrictMode>
      <Context>
         <App/>
      </Context>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
