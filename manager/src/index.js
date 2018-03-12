/*Importing env vars to application*/
import './utils/env/env';
/*Importing api urls for application*/
import './utils/api';


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';



/*adding css to admin*/
import './assets/css/index.css';
import "react-widgets/dist/css/react-widgets.css";
// < !--BEGIN GLOBAL MANDATORY STYLES-- >
import "./assets/font-awesome/css/font-awesome.min.css";
import "./assets/simple-line-icons/simple-line-icons.min.css";
import "./assets/bootstrap/css/bootstrap.min.css";
// < !--END GLOBAL MANDATORY STYLES-- >

// < !--BEGIN THEME GLOBAL STYLES-- >


import "./assets/css/components.min.css";

// < !--End THEME GLOBAL STYLES-- >
    import "./assets/layout/css/layout.min.css" ;
    import "./assets/layout/css/themes/darkblue.min.css";
    import "./assets/layout/css/custom.min.css" ;
// < !--BEGIN THEME LAYOUT STYLES-- >

// < !--END THEME LAYOUT STYLES-- >
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';



/*importing reducers*/
import { reducers } from './reducers/index';
/*import Sagas*/
import sagas from './sagas/index';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const store = createStore(reducers, middleware);

/*dispatch action first to Saga then reducer*/
sagaMiddleware.run(sagas);
ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
