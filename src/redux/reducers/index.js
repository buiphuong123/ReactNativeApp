import { combineReducers } from "redux";
import languageReducer from './language.reducer';
import userReducer from './userReducer';
import wordReducer from './wordReducer';
import cartReducer from './cartReducer';
import likeReducer from './likeReducer';
import memerizeReducer from './memerizeReducer';
import notMemerizeReducer from './notMemerizeReducer';
const appReducers = combineReducers({
    languageReducer,
    userReducer,
    wordReducer,
    cartReducer,
    likeReducer,
    memerizeReducer,
    notMemerizeReducer,
});

export default appReducers;