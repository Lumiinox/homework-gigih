import * as actions from '../redux/actionTypes';

const initialState = {
    token:"",
    userName:"",
    userId:"",
    picUrl:"",
    follower:"",
    loginStatus: false,
};

function reducer (state = initialState, action) {
    switch (action.type){
        case actions.UPDATE_ACC_DATA:
            return{
                userName: action.payload.userName,
                userId: action.payload.userId,
                picUrl: action.payload.profilePic,
                token: action.payload.token,
                followers: action.payload.followers,
                loginStatus: true,
            };
        case actions.REMOVE_ACC_DATA:
            return{
                userName: "",
                picUrl: "",
                token: "",
                loginStatus: false,
            }
        default:
            return state;
    }
}

export default reducer;