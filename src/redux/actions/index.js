import * as types from './../constants/action-types';

export const changeLanguage = language => {
    return {
        type: types.CHANGE_LANGUAGE,
        language
    }
}
export const saveUser = (id, username, email)=>{
    return {
        type: types.SAVE_USER,
        id, 
        username,
        email
    }
}
export const logoutUser = (username)=>{
    return {
        type: types.LOGOUT_USER,
        username,
    }
}
export const RemoteWord = (isWord)=> {
    return {
        type: types.WORD,
        isWord
    }
}
export const RemoteAllWord = (isAll)=> {
    return {
        type: types.ALL_WORD,
        isAll
    }
}
export const RemoteHiraWord = (isHira)=> {
    return {
        type: types.ALL_HIRA,
        isHira
    }
}
export const RemoteKanjiWord = (isKanji)=> {
    return {
        type: types.ALL_KANJI,
        isKanji
    }
}
export const RemoteMeanWord = (isMean)=> {
    return {
        type: types.ALL_MEAN,
        isMean
    }
}
export const RemoteReverseWord = (isReverse)=> {
    return {
        type: types.ALL_REVERSE,
        isReverse
    }
}
export const RemoteMemerizeWord = (isMemerize)=> {
    return {
        type: types.ALL_MEMERIZE,
        isMemerize
    }
}
export const RemoteNotMemerizeWord = (isNotMemerize)=> {
    return {
        type: types.ALL_NOTMEMERIZE,
        isNotMemerize
    }
}
export const RemoteLikeWord = (isLike)=> {
    return {
        type: types.ALL_LIKE,
        isLike
    }
}
export const showCard = (cartwordAttr)=> {
    return {
        type: types.SHOW_CARD,
        cartwordAttr
    }
}
export const showLike = (likewordAttr) => {
    return {
        type: types.SHOW_LIKE,
        likewordAttr
    }
}
export const showNotMemerize = (memerizewordAttr) => {
    return {
        type: types.SHOW_NOT_MEMERIZE,
        memerizewordAttr
    }
}
export const showWordNotMemerize = (notmemerizewordAttr) => {
    return {
        type: types.SHOW_WORD_NOT_MEMERIZE,
        notmemerizewordAttr
    }
}
// show like+memerize
export const likeMem = (checkwordArr) => {
    return {
        type: types.SHOW_ALL_WORD,
        checkwordArr
    }
}
