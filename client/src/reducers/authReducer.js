import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/authActions';

const initialState = {
    user: {},
    error: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                isAuthenticated: true,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                user: {},
                error: action.payload,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}

export default authReducer;