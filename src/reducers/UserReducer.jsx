import {
    USER_INFO_UPDATE,
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    RE_PASSWORD_CHANGED,
    OLD_PASSWORD_CHANGED,
    EMAIL_CHANGED,
    FIRSTNAME_CHANGED,
    LASTNAME_CHANGED,
    ENABLED_CHANGED,
    USERROLE_CHANGED,
    USER_NEW,
    USER_EDIT,
    USER_MODAL_CANCEL,
    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL,
    ALL_USERS_UPDATE,
    ALL_USERS_UPDATE_FAIL,
    RESET_PWD,
    RESET_PWD_SUCCESS,
    CANCEL_RESET_PWD,
    RESET_PWD_FAIL,
    PROFILE_EDIT,
    CANCEL_PROFILE_EDIT,

    PROFILE_SAVE_SUCCESS,
    PROFILE_SAVE_FAIL

} from '../actions/types';


const INITIAL_STATE = {
    userId: null,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    rePassword: '',
    enabled: true,
    beautifyRoleName: 'User',
    users: [],
    userModalOpen: false,
    editMod: false,
    userSaveMsg: '',
    resetPwdSaveMsg: '',
    resetPwdModal: false,
    profileEditMod: false,
    userProfile: null,
    oldPassword: '',
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case USERNAME_CHANGED:
            return {
                ...state,
                username: action.payload,
                userSaveMsg: ''
            };
        case PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload,
                userSaveMsg: ''
            };
        case RE_PASSWORD_CHANGED:
            return {
                ...state,
                rePassword: action.payload,
                userSaveMsg: ''
            };
        case OLD_PASSWORD_CHANGED:
            return {
                ...state,
                oldPassword: action.payload,
                userSaveMsg: ''
            };
        case EMAIL_CHANGED:
            return {
                ...state,
                email: action.payload,
                userSaveMsg: ''
            };
        case FIRSTNAME_CHANGED:
            return {
                ...state,
                firstname: action.payload,
                userSaveMsg: ''
            };
        case LASTNAME_CHANGED:
            return {
                ...state,
                lastname: action.payload,
                userSaveMsg: ''
            };
        case ENABLED_CHANGED:
            return {
                ...state,
                enabled: action.payload,
                userSaveMsg: ''
            };
        case USERROLE_CHANGED:
            return {
                ...state,
                beautifyRoleName: action.payload,
                userSaveMsg: ''
            };
        case USER_NEW:
            return {
                ...state,
                userId: null,
                username: '',
                password: '',
                rePassword: '',
                firstname: '',
                lastname: '',
                email: '',
                enabled: true,
                beautifyRoleName: 'User',
                userModalOpen: true,
                userSaveMsg: '',
                editMod: false,
            };
        case USER_EDIT:
            return {
                ...state,
                userId: action.payload.id,
                username: action.payload.username,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                email: action.payload.email,
                enabled: action.payload.enabled,
                beautifyRoleName: action.payload.beautifyRoleName,
                userModalOpen: true,
                userSaveMsg: '',
                editMod: true,
            };
        case USER_MODAL_CANCEL:
            return {
                ...state,
                userId: null,
                username: '',
                password: '',
                rePassword: '',
                firstname: '',
                lastname: '',
                email: '',
                enabled: true,
                beautifyRoleName: 'User',
                userModalOpen: false,
                userSaveMsg: '',
            };
        case USER_SAVE_SUCCESS:
            return {
                ...state,
                userId: null,
                username: '',
                password: '',
                rePassword: '',
                firstname: '',
                lastname: '',
                email: '',
                enabled: true,
                beautifyRoleName: 'User',
                userModalOpen: false,
                userSaveMsg: '',
            };
        case USER_SAVE_FAIL:
            return {
                ...state,
                userSaveMsg: action.payload
            };
        case RESET_PWD:
            return {
                ...state,
                resetPwdModal: true,
                resetPwdSaveMsg: '',
                username: action.payload.username,
                userId: action.payload.userId,
                password: '',
                rePassword: '',
                oldPassword: '',
            };
        case RESET_PWD_SUCCESS:
            return {
                ...state,
                resetPwdModal: false,
                resetPwdSaveMsg: '',
                //username: '',
                //userId: null,
                password: '',
                rePassword: '',
                oldPassword: '',
            };
        case CANCEL_RESET_PWD:
            return {
                ...state,
                resetPwdModal: false,
                resetPwdSaveMsg: '',
                password: '',
                rePassword: '',
                oldPassword: '',
            };
        case RESET_PWD_FAIL:
            return {
                ...state,
                resetPwdModal: true,
                resetPwdSaveMsg: action.payload
            };
        case ALL_USERS_UPDATE:
            return {
                ...state,
                users: action.payload,
                userSaveMsg: ''
            };
        case ALL_USERS_UPDATE_FAIL:
            return {
                ...state,
                users: [],
                userSaveMsg: action.payload
            };
        case USER_INFO_UPDATE:
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                email: action.payload.email,
                enabled: action.payload.enabled,
                beautifyRoleName: action.payload.beautifyRoleName,
                userSaveMsg: '',
                userProfile: {
                    userId: action.payload.userId,
                    username: action.payload.username,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname,
                    email: action.payload.email,
                }
            };
        case PROFILE_EDIT:
            return {
                ...state,
                profileEditMod: true,
                userSaveMsg: '',
            };
        case CANCEL_PROFILE_EDIT:
            return {
                ...state,
                userId: action.payload.userId,
                username: action.payload.username,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                email: action.payload.email,
                profileEditMod: false,
                userSaveMsg: '',
            };
        case PROFILE_SAVE_SUCCESS:
            return {
                ...state,
                profileEditMod: false,
                userSaveMsg: '',
            };
        case PROFILE_SAVE_FAIL:
            return {
                ...state,
                userSaveMsg: action.payload,
            };
        default:
            return state;
    }
};
