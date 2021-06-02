import * as types from './../constants/action-types';
var userAttr = { username: '', email: '', password: ''};

var userReducer = (state = userAttr, action) => {
    switch (action.type) {
        case types.SAVE_USER: {
            return { 
                username: action.username,
                email: action.email,
                password: action.password,
            };
        }
        case types.LOGOUT_USER: {
            return {
                username: action.username
            }
        }
        default:
            return state;
    }
}
export default userReducer;