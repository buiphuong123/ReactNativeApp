import * as types from './../constants/action-types';
var memerizewordAttr = [];

var memerizeReducer = (state = memerizewordAttr, action) => {
    switch (action.type) {
        case types.SHOW_NOT_MEMERIZE: {
            return { 
                memerizewordAttr: action.memerizewordAttr,
            };
        }
        default: 
            return state;
        
    }
}
export default memerizeReducer;