import * as actions from '../redux/actionTypes';

export const updateProfileData = (nameIn, picUrlIn, tokenIn, followersIn, userIdIn) => (
    {
        type:actions.UPDATE_ACC_DATA,
        payload:{
            userName: nameIn,
            userId: userIdIn,
            profilePic: picUrlIn,
            token: tokenIn,
            followers: followersIn
    }
})

export function removeProfileData(){
    return{
        type:actions.REMOVE_ACC_DATA
    }
}