import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Home from '../components/Home';
import NotFound from '../components/404';
import {renderDevTools} from '../utils/devTools';
import { Router, Route, Link, browserHistory } from 'react-router'


const store = configureStore();

export default React.createClass({
  render() {
    return (
      <div>

        {/* <Home /> is your app entry point */}
        <Provider store={store}>
        	<Router history={browserHistory}>
		        <Route path="/" component={Home}/>
		        <Route path="*" component={NotFound}/>
		      </Router>
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    );
  }
});
