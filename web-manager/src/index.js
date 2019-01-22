import 'core-js/es6/promise';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/fn/object/assign';
import 'core-js/fn/string/includes';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/find-index';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './redux/index'

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
