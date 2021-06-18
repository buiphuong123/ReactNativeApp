import * as types from './../constants/action-types';
var notmemerizewordAttr = [];

var notMemerizeReducer = (state = notmemerizewordAttr, action) => {
    switch (action.type) {
        case types.SHOW_WORD_NOT_MEMERIZE: {
            return { 
                notmemerizewordAttr: action.notmemerizewordAttr,
            };
        }
        default: 
            return state;
        
    }
}
export default notMemerizeReducer;