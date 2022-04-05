import * as actions from '../redux/actionTypes';

const initialState = {token:""};

function reducer (state = initialState, action) {
    switch (action.type){
        case actions.UPDATE_TOKEN:
            return{token: action.payload};
        case actions.REMOVE_TOKEN:
            return{token: ""};
        default:
            return state;
    }
}

export default reducer;