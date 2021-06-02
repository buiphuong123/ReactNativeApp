import { combineReducers } from "redux";
import languageReducer from './language.reducer';
import userReducer from './userReducer';
const appReducers = combineReducers({
    languageReducer,
    userReducer
});

export default appReducers;