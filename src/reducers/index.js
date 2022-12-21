import {combineReducers} from 'redux';
import {authReducer} from './auth';

//Multiple reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;