import * as types from './../constants/action-types';

export const changeLanguage = language => {
    return {
        type: types.CHANGE_LANGUAGE,
        language
    }
}
export const saveUser = (username, password)=>{
    return {
        type: types.SAVE_USER,
        username,
        password
    }
}

export const logoutUser = (username)=>{
    return {
        type: types.SAVE_USER,
        username,
    }
}