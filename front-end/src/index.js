import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);


serviceWorker.unregister();
