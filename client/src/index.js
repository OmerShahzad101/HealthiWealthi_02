import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import history from './router/utils/history';
import ErrorBoundary from './hoc/ErrorBoundary';

import store, { persistor } from './store';
import * as serviceWorker from './serviceWorker';
import './styles.css';
// import './assets/css/slick.css';
// import './assets/css/slick-theme.css';
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
