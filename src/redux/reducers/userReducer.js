import * as types from './../constants/action-types';
var userAttr = {id: '', username: '', email: ''};

var userReducer = (state = userAttr, action) => {
    switch (action.type) {
        case types.SAVE_USER: {
            return { 
                id: action.id,
                username: action.username,
                email: action.email,
                
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