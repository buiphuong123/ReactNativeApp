import * as types from './../constants/action-types';
var checkwordArr = [];

var memerizeReducer = (state = checkwordArr, action) => {
    switch (action.type) {
        case types.SHOW_ALL_WORD: {
            return { 
                checkwordArr: action.checkwordArr,
            };
        }
        case types.SHOW_MEMERIZE: {
            return state.map(e => {
                if(e._id !== action._id) return e;
                return {...e, isMemerize: !e.isMemerize};
            })
        }
        default: 
            return state;
        
    }
}
export default memerizeReducer;