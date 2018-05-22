import {
    USER_INFO_UPDATE,
    USER_INFO_UPDATE_FAIL,
    LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    email: '',
    isAdmin: false,
    authenticated: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_INFO_UPDATE:
            return {
                ...state, username: action.payload.username,
                email: action.payload.email, isAdmin: action.payload.isAdmin,
                authenticated: true
            };
        case USER_INFO_UPDATE_FAIL:
            return {
                ...state, username: '', email: '', isAdmin: false, authenticated: false
            };
        case LOGOUT_USER:
            return {
                ...state, username: '', email: '', isAdmin: false, authenticated: false
            };
        default:
            return state;
    }
};
