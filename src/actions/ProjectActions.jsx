import {
    PROJECT_SAVE_START,
    PROJECT_NAME_CHANGED,
    PROJECT_DESC_CHANGED,
    PROJECT_NEW,
    PROJECT_EDIT,
    PROJECT_MODAL_CANCEL,
    SWITCH_ADMIN_HOME_BODY,
    PROJECT_SAVE_FAIL,
    PROJECT_DETAIL_START,
    PROJECT_DETAIL_MODAL_CLOSE,

    TASK_TITLE_CHANGED,
    TASK_DESC_CHANGED,
    PROJEC_TASK_ADDED,
    PROJEC_TASK_ADDED_FAIL,
    PROJEC_TASK_REMOVED,
    PROJEC_TASK_CANCELED,
    TASK_USERS_CHANGED,
} from './types';

import * as backend from '../backend/Backend';


export const projectNameChanged = (text) => {
    return {
        type: PROJECT_NAME_CHANGED,
        payload: text
    };
};

export const projectDescChanged = (text) => {
    return {
        type: PROJECT_DESC_CHANGED,
        payload: text
    };
};

export const newProject = () => {
    return {
        type: PROJECT_NEW
    };
};

export const editProject = (project) => {
    return dispatch => {
        dispatch({
            type: PROJECT_EDIT,
            payload: project
        })
        //backend.getProjectDetail(dispatch, project);
    };
};

export const cancelNewProject = () => {
    return {
        type: PROJECT_MODAL_CANCEL
    };
};

export const saveProject = (project) => {
    return dispatch => {
        if (project.name == '') {
            dispatch({ type: PROJECT_SAVE_FAIL, payload: 'Project name is empty!' });
        } else {
            project.tasks = [];
            dispatch({ type: PROJECT_SAVE_START });
            backend.saveProject(dispatch, project);
        }
    };
};

export const deleteProject = (id) => {
    return dispatch => {
        backend.deleteProject(dispatch, id);
    };
};

export const updateLatestProject = (isAdmin) => {
    return dispatch => {
        if(isAdmin){
            backend.updateLatestProject(dispatch);
        }else{
            backend.updateMyLatestProject(dispatch);
        }
    };
};

export const openProjectStatisticsModal = (project) => {
    return dispatch => {
        dispatch({
            type: PROJECT_DETAIL_START,
        });
        backend.getProjectStatistics(dispatch, project);
    };
};

export const closeProjectDetailModal = () => {
    return {
        type: PROJECT_DETAIL_MODAL_CLOSE
    };
};


export const updateAllProjects = () => {
    return dispatch => {
        backend.updateAllProjects(dispatch);
    };
};

export const taskTitleChanged = (text) => {
    return {
        type: TASK_TITLE_CHANGED,
        payload: text
    };
};

export const taskDescChanged = (text) => {
    return {
        type: TASK_DESC_CHANGED,
        payload: text
    };
};


export const taskAddedFail = (message) => {
    return {
        type: PROJEC_TASK_ADDED_FAIL,
        payload: message
    };
};

export const taskAdded = (tasks) => {
    return {
        type: PROJEC_TASK_ADDED,
        payload: { tasksList: tasks }
    };
};

export const taskRemoved = (tasks) => {
    return {
        type: PROJEC_TASK_REMOVED,
        payload: { tasksList: tasks }
    };
};

export const taskCanceled = () => {
    return {
        type: PROJEC_TASK_CANCELED
    };
};

export const usersListChanged = (taskUsers, selectedUsers) => {
    return {
        type: TASK_USERS_CHANGED,
        payload: { taskUsers: taskUsers, selectedUsers: selectedUsers }
    };
};

export const updateAllUsers = () => {
    return dispatch => {
        backend.updateUsersEnabled(dispatch);
    };
};

export const updateMyProjects = () => {
    return dispatch => {
        backend.updateMyProjects(dispatch);
    };
};