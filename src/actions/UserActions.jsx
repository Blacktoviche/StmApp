import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    RE_PASSWORD_CHANGED,
    OLD_PASSWORD_CHANGED,
    FIRSTNAME_CHANGED,
    LASTNAME_CHANGED,
    EMAIL_CHANGED,
    ENABLED_CHANGED,
    USERROLE_CHANGED,
    USER_EDIT,
    USER_NEW,
    USER_MODAL_CANCEL,
    USER_SAVE_FAIL,
    RESET_PWD,
    CANCEL_RESET_PWD,
    RESET_PWD_SUCCESS,
    RESET_PWD_FAIL,
    PROFILE_EDIT,
    CANCEL_PROFILE_EDIT,

    PROFILE_SAVE_FAIL
} from './types';

import * as backend from '../backend/Backend';


export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const rePasswordChanged = (text) => {
    return {
        type: RE_PASSWORD_CHANGED,
        payload: text
    };
};

export const oldPasswordChanged = (text) => {
    return {
        type: OLD_PASSWORD_CHANGED,
        payload: text
    };
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const enabledChanged = (value) => {
    return {
        type: ENABLED_CHANGED,
        payload: value
    };
};

export const firstnameChanged = (text) => {
    return {
        type: FIRSTNAME_CHANGED,
        payload: text
    };
};

export const lastnameChanged = (text) => {
    return {
        type: LASTNAME_CHANGED,
        payload: text
    };
};

export const userRoleChanged = (role) => {
    return {
        type: USERROLE_CHANGED,
        payload: role
    };
};

export const newUser = () => {
    return {
        type: USER_NEW
    };
};

export const editUser = (user) => {
    return dispatch => {
        dispatch({
            type: USER_EDIT,
            payload: user
        })
    };
};

export const cancelNewUser = () => {
    return {
        type: USER_MODAL_CANCEL
    };
};

export const saveUser = (user, editMod, rePassword) => {
    return dispatch => {
        if (editMod) {
            if (user.username === '' || user.email === '') {
                dispatch({ type: USER_SAVE_FAIL, payload: 'User info is not completed!' });
            } else if (user.username.indexOf(' ') >= 0 || user.email.indexOf(' ') >= 0) {
                dispatch({ type: USER_SAVE_FAIL, payload: 'Username & Email must not include spaces!' });
            } else {
                backend.saveEditedUser(dispatch, user);
            }
        } else {
            console.log('pasword check', user.userPassword, rePassword);
            if (user.userPassword !== rePassword) {
                dispatch({ type: USER_SAVE_FAIL, payload: 'Paswwords not match!' });
            } else
                if (user.username === '' || user.userPassword === '' || user.email === '') {
                    console.log('username check');
                    dispatch({ type: USER_SAVE_FAIL, payload: 'User info is not completed!' });
                } else if (user.username.indexOf(' ') >= 0 || user.email.indexOf(' ') >= 0 ||
                    user.userPassword.indexOf(' ') >= 0) {
                    dispatch({ type: USER_SAVE_FAIL, payload: 'Username, Email & Password must not include spaces!' });
                } else {
                    backend.saveNewUser(dispatch, user);
                }
        }
    };
};

export const deleteUser = (id) => {
    return dispatch => {
        backend.deleteUser(dispatch, id);
    };
};

export const updateAllUsers = () => {
    return dispatch => {
        backend.updateUsers(dispatch);
    };
};


export const resetPassword = (user) => {
    return {
        type: RESET_PWD,
        payload: {
            username: user.username,
            userId: user.id
        }
    };
};

export const saveNewPwd = (userId, password, rePassword) => {
    return dispatch => {
        console.log('password: ', password, rePassword);
        if (password !== rePassword) {
            dispatch({ type: RESET_PWD_FAIL, payload: 'Paswwords not match!' });
        } else
            if (password === '') {
                dispatch({ type: RESET_PWD_FAIL, payload: 'Password is empty!!' });
            } else if (password.indexOf(' ') >= 0) {
                dispatch({ type: RESET_PWD_FAIL, payload: 'Password must not include spaces!' });
            } else {
                backend.resetPwd(dispatch, userId, password);
            }
    };
};

export const saveMyNewPwd = (oldPassword, password, rePassword) => {
    return dispatch => {

        if (password !== rePassword) {
            dispatch({ type: RESET_PWD_FAIL, payload: 'Paswwords not match!' });
        } else
            if (password === '') {
                dispatch({ type: RESET_PWD_FAIL, payload: 'Password is empty!!' });
            } else if (password.indexOf(' ') >= 0) {
                dispatch({ type: RESET_PWD_FAIL, payload: 'Password must not include spaces!' });
            } if (oldPassword === '') {
                dispatch({ type: RESET_PWD_FAIL, payload: 'Old password is empty!!' });
            } else if (oldPassword.indexOf(' ') >= 0) {
                dispatch({ type: RESET_PWD_FAIL, payload: 'old Password must not include spaces!' });
            } else {
            backend.resetMyPwd(dispatch, oldPassword, password);
        }
    };
};

export const cancelNewPwd = () => {
    return {
        type: CANCEL_RESET_PWD,
    };
};

export const editProfile = () => {
    return {
        type: PROFILE_EDIT,
    }
};

export const defaultProfile = (userProfile) => {
    return {
        type: CANCEL_PROFILE_EDIT,
        payload: userProfile
    }
};

export const saveProfile = (user) => {
    return dispatch => {
        if (user.email === '') {
            dispatch({ type: PROFILE_SAVE_FAIL, payload: 'Email is empty!' });
        } else if (user.email.indexOf(' ') >= 0) {
            dispatch({ type: PROFILE_SAVE_FAIL, payload: 'Email must not include spaces!' });
        } else {
            backend.saveProfile(dispatch, user);
        }
    };
};