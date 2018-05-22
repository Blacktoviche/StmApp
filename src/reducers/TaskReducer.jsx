import {
    LATEST_TASKS_UPDATE,
    LATEST_TASKS_UPDATE_FAIL,
    ALL_TASKS_UPDATE,
    ALL_TASKS_UPDATE_FAIL,
    ALL_PROJECT_TASKS_UPDATE,
    ALL_PROJECTS_UPDATE,
    ALL_PROJECTS_UPDATE_FAIL,
    ALL_PROJECT_TASKS_UPDATE_FAIL,

    TASK_NEW,
    TASK_EDIT,
    TASK_TITLE_CHANGED,
    TASK_DESC_CHANGED,
    TASK_SAVE_SUCCESS,
    TASK_SAVE_FAIL,
    TASK_MODAL_CANCEL,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
    TASK_USERS_CHANGED,

    ALL_USERS_UPDATE,
    ALL_USERS_UPDATE_FAIL,
    SELECTED_TASK_USERS_UPDATE,
    SELECTED_TASK_USERS_UPDATE_FAIL,
    USER_INFO_UPDATE,

    MY_TASKS_UPDATE,
    MY_TASKS_UPDATE_FAIL,
    MY_PROJECTS_UPDATE,
    MY_PROJECTS_UPDATE_FAIL,

    SELECT_PROJECT_UPDATE
} from '../actions/types';

import * as messages from '../utils/Messages';

const INITIAL_STATE = {
    selectedProject: null,
    taskId: null,
    taskTitle: '',
    taskDesc: '',
    taskModalOpen: false,
    taskSaveError: '',
    errorMessage: null,
    infoMessage: null,
    errorMsg: '',
    allUsersList: [],
    taskUsersList: [],
    selectedUsersList: [],
    tasks: [],
    projects: [],
    latestTasks: [],
    userId: null,
};

export default (state = INITIAL_STATE, action) => {

    //console.log('task reducer action type::', action.type);
    //console.log('payload::', action.payload);

    switch (action.type) {
        case TASK_TITLE_CHANGED:
            return {
                ...state,
                taskTitle: action.payload,
                taskSaveError: ''
            };
        case TASK_DESC_CHANGED:
            return {
                ...state,
                taskDesc: action.payload,
                taskSaveError: ''
            };
        case TASK_NEW:
            return {
                ...state,
                taskTitle: '',
                taskDesc: '',
                taskSaveError: '',
                taskModalOpen: true
            };
        case TASK_EDIT:
            return {
                ...state,
                taskId: action.payload.id,
                taskTitle: action.payload.title,
                taskDesc: action.payload.description,
                taskSaveError: '',
                taskModalOpen: true
            };
        case TASK_SAVE_SUCCESS:
            return {
                ...state,
                taskId: null,
                taskTitle: '',
                taskDesc: '',
                taskModalOpen: false,
                taskSaveError: ''
            };
        case TASK_MODAL_CANCEL:
            return {
                ...state,
                taskId: null,
                taskTitle: '',
                taskDesc: '',
                taskModalOpen: false,
                taskSaveError: ''
            };
        case TASK_SAVE_FAIL:
            return {
                ...state,
                taskSaveError: action.payload
            };
        case LATEST_TASKS_UPDATE:
            return {
                ...state,
                latestTasks: action.payload
            };
        case LATEST_TASKS_UPDATE_FAIL:
            return {
                ...state,
                latestTasks: [],
                errorMsg: action.payload
            };
        case ALL_PROJECT_TASKS_UPDATE:
            return {
                ...state,
                selectedProject: action.payload.selectedProject,
                tasks: action.payload.tasks,
                errorMsg: ''
            };
        case ALL_PROJECT_TASKS_UPDATE_FAIL:
            return {
                ...state,
                selectedProject: null,
                tasks: [],
                errorMsg: action.payload
            };
        case ALL_TASKS_UPDATE:
            return {
                ...state,
                tasks: action.payload,
                errorMsg: ''
            };
        case ALL_TASKS_UPDATE_FAIL:
            return {
                ...state,
                tasks: [],
                errorMsg: action.payload
            };
        case ALL_PROJECTS_UPDATE:
            return {
                ...state,
                projects: action.payload,
                selectedProject:null,// action.payload.length > 0 ? action.payload[0] : null,
                errorMsg: ''
            };
        case ALL_PROJECTS_UPDATE_FAIL:
            return {
                ...state,
                projects: [],
                tasks: [],
                selectedProject: null,
                errorMsg: action.payload
            };

        case SELECT_PROJECT_UPDATE:
            return {
                ...state,
                selectedProject: action.payload,
            };
        case TASK_DELETE_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            };
        case TASK_USERS_CHANGED:
            return {
                ...state,
                taskUsersList: action.payload.taskUsers,
                selectedUsersList: action.payload.selectedUsers,
                taskSaveError: ''
            };
        case ALL_USERS_UPDATE:
            return {
                ...state,
                allUsersList: action.payload,
                taskUsersList: action.payload,
                selectedUsersList: [],
                taskSaveError: ''
            };
        case ALL_USERS_UPDATE_FAIL:
            return {
                ...state,
                allUsersList: [],
                taskSaveError: action.payload
            };
        case SELECTED_TASK_USERS_UPDATE:
            return {
                ...state,
                allUsersList: action.payload.allUsers,
                taskUsersList: action.payload.notSelectedTaskUsers,
                selectedUsersList: action.payload.selectedTaskUsers,
                taskSaveError: ''
            };
        case SELECTED_TASK_USERS_UPDATE_FAIL:
            return {
                ...state,
                allUsersList: [],
                taskUsersList: [],
                selectedUsersList: [],
                taskSaveError: action.payload
            };
        case MY_TASKS_UPDATE:
            return {
                ...state,
                tasks: action.payload,
            };
        case MY_TASKS_UPDATE_FAIL:
            return {
                ...state,
                tasks: [],
                errorMsg: action.payload
            };
        case USER_INFO_UPDATE:
            return {
                ...state, userId: action.payload.id
            };
        case MY_PROJECTS_UPDATE:
            return {
                ...state,
                projects: action.payload,
                tasks: [],
                selectedProject: null,
            };
        case MY_PROJECTS_UPDATE_FAIL:
            return {
                ...state,
                projects: [],
                tasks: [],
                errorMsg: action.payload
            };
        default:
            return state;
    }
};
