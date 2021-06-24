import * as types from './../constants/action-types';
var checkwordArr = [];

var tickReducer = (state = checkwordArr, action) => {
    switch (action.type) {
        case types.SHOW_ALL_WORD: {
            return { 
                checkwordArr: action.checkwordArr,
            };
        }
        default: 
            return state;
        
    }
}
export default tickReducer;