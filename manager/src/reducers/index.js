import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*import component level reducers*/
import admin from "./admin";
// import accessory from "./accessory";
// import users from "./users";

export const reducers = combineReducers({
    routing: routerReducer,
    form: formReducer,
    admin: admin,

    // users: users,
    // plant: plant,
    // accessory: accessory
});