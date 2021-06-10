import { combineReducers } from "redux";
import languageReducer from './language.reducer';
import userReducer from './userReducer';
import wordReducer from './wordReducer';
const appReducers = combineReducers({
    languageReducer,
    userReducer,
    wordReducer
});

export default appReducers;