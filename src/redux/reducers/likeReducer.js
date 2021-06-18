import * as types from './../constants/action-types';
var likewordAttr = [];

var likeReducer = (state = likewordAttr, action) => {
    switch (action.type) {
        case types.SHOW_LIKE: {
            return { 
                likewordAttr: action.likewordAttr,
            };
        }
        default: 
            return state;
        
    }
}
export default likeReducer;