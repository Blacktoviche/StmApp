import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER,
    START_SETUP_LOGIN
} from './types';

import * as backend from '../backend/Backend';

export const usernameChanged = (text) => (dispatch) => {
    dispatch({
        type: USERNAME_CHANGED,
        payload: text
    });
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const setupLogin = () => {
    return dispatch => {
        dispatch({ type: START_SETUP_LOGIN });
        backend.setupLogin(dispatch);
    };
};

export const login = (username, password) => {

    return dispatch => {
        if (username === '' || password === '') {
            dispatch({ type: LOGIN_FAIL, payload: 'Username & password are required!' });
        } else if (username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 ) {
            dispatch({ type: LOGIN_FAIL, payload: 'Username & password are required!' });
        } else {
            dispatch({ type: LOGIN_USER });
            return backend.signin(dispatch, username, password);
        }
    };
};
