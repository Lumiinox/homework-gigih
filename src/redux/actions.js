import * as actions from '../redux/actionTypes';

export function updateToken (tokenIn){
    return {
        type:actions.UPDATE_TOKEN,
        payload:"token-placeholder"
    }
}

export function removeToken(){
    return{
        type:actions.REMOVE_TOKEN
    }
}