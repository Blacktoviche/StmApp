import {
    USER_INFO_UPDATE,
    USER_INFO_UPDATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    email: '',
    isAdmin: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_INFO_UPDATE:
            return {
                ...state, username: action.payload.username,
                email: action.payload.email, isAdmin: action.payload.isAdmin
            };
        case USER_INFO_UPDATE_FAIL:
            return {
                ...state, username: '', email: '', isAdmin: false
            };
        default:
            return state;
    }
};
