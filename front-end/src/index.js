import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from './redux/store'


import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);


serviceWorker.unregister();
