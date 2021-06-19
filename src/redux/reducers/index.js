import { combineReducers } from "redux";
import languageReducer from './language.reducer';
import userReducer from './userReducer';
import wordReducer from './wordReducer';
import cartReducer from './cartReducer';
import likeReducer from './likeReducer';
import memerizeReducer from './memerizeReducer';
import notMemerizeReducer from './notMemerizeReducer';
import tickReducer from './tickReducer';
const appReducers = combineReducers({
    languageReducer,
    userReducer,
    wordReducer,
    cartReducer,
    likeReducer,
    memerizeReducer,
    notMemerizeReducer,
    tickReducer,
});

export default appReducers;