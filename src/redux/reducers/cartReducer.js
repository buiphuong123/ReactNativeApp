import * as types from './../constants/action-types';
var cartwordAttr = [];

var cartReducer = (state = cartwordAttr, action) => {
    switch (action.type) {
        case types.SHOW_CARD: {
            return { 
                cartwordAttr: action.cartwordAttr,
            };
        }
        default: 
            return state;
        
    }
}
export default cartReducer;