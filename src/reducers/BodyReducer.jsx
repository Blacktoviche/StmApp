import {
    USER_INFO_UPDATE,
    USER_INFO_UPDATE_FAIL,
    SWITCH_HOME_BODY,
    MY_PROGRESS_UPDATE,
    MY_PROGRESS_UPDATE_FAIL
} from '../actions/types';

import { BODY_DEFAULT } from '../utils/Utils';

const INITIAL_STATE = {
    username: '',
    email: '',
    isAdmin: false,
    homeBody: BODY_DEFAULT,
    myProgress: [],

};

export default (state = INITIAL_STATE, action) => {

    //console.log('actionType::', action.type);
    //console.log('actionPayload:',action.payload);
    switch (action.type) {
        case SWITCH_HOME_BODY:
            return {
                ...state, homeBody: action.payload
            };
        case USER_INFO_UPDATE:
            return {
                ...state, username: action.payload.username,
                email: action.payload.email, isAdmin: action.payload.isAdmin
            };
        case USER_INFO_UPDATE_FAIL:
            return {
                ...state, username: '', email: '', isAdmin: false
            };
        case MY_PROGRESS_UPDATE:
            return {
                ...state, myProgress: action.payload
            };
        case MY_PROGRESS_UPDATE_FAIL:
            return {
                ...state, myProgress: []
            };
        default:
            return state;
    }
};
