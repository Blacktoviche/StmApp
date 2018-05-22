import {
    USER_INFO_UPDATE,
    START_SETUP_LOGIN,
    USER_INFO_UPDATE_FAIL,
    SWITCH_HOME_BODY,
    CURRENT_SCREEN_CHANGED
} from './types';

import { BODY_DEFAULT } from '../utils/Utils';
import * as backend from '../backend/Backend';

export const setupUserToken = () => {
    return dispatch => {
        dispatch({ type: START_SETUP_LOGIN });
        backend.setupLogin(dispatch);
    };
};

export const setupLogginPage = () => {
    return dispatch => {
        dispatch({ type: USER_INFO_UPDATE_FAIL });
    };
};

export const routeToDashboard = () => (dispatch) => {
    dispatch({
        type: SWITCH_HOME_BODY,
        payload: BODY_DEFAULT
    });
};

export const updateMyProgress = () => {
    return dispatch => {
        backend.updateMyProgress(dispatch);
    };
};

export const changeCurrentScreen = (currentScreen) => {
    return (dispatch) => {
        dispatch({
            type: CURRENT_SCREEN_CHANGED,
            payload: currentScreen
        });
    }
};