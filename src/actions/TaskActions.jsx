import {
    TASK_SAVE_START,
    TASK_TITLE_CHANGED,
    TASK_DESC_CHANGED,
    TASK_NEW,
    TASK_EDIT,
    TASK_MODAL_CANCEL,
    SWITCH_HOME_BODY,
    TASK_USERS_CHANGED,
    TASK_SAVE_FAIL
} from './types';

import { BODY_MY_TASKS, BODY_TASKS, BODY_DEFAULT } from '../utils/Utils';


import * as backend from '../backend/Backend';


export const taskTitleChanged = (text) => (dispatch) => {
    dispatch({
        type: TASK_TITLE_CHANGED,
        payload: text
    });
};

export const taskDescChanged = (text) => {
    return {
        type: TASK_DESC_CHANGED,
        payload: text
    };
};

export const newTask = () => {
    return {
        type: TASK_NEW
    };
};

export const editTask = (task) => {
    return {
        type: TASK_EDIT,
        payload: task
    };
};

export const saveTask = (task, project) => {
    return dispatch => {
        if (task.title == '') {
            dispatch({ type: TASK_SAVE_FAIL, payload: 'Task title is empty!' });
        } else {
        dispatch({ type: TASK_SAVE_START });
        backend.saveTask(dispatch, task, project);
        }
    };
};

export const cancelTaskModal = () => {
    return {
        type: TASK_MODAL_CANCEL
    };
};

export const deleteTask = (id, project) => {
    return dispatch => {
        backend.deleteTask(dispatch, id, project);
    };
};

export const getTasksByProject = (project) => {
    return dispatch => {
        if(project !== null){
            backend.getTasksByProject(dispatch, project);
        }
        //else{
          //  backend.updateAllTasks(dispatch);
        //}
    };
};

export const getAllProjects = () => {
    return dispatch => {
        backend.updateAllProjects(dispatch);
    };
};

export const updateLatestTasks = (isAdmin) => {
    return dispatch => {
        if(isAdmin){
        backend.updateLatestTasks(dispatch);
        }else{
            backend.updateMyLatestTasks(dispatch);
        }
    };
};

/*export const updateAllTasks = (projectId) => {
    return dispatch => {
        backend.updateAllTasks(dispatch, projectId);
    };
};*/

/*export const routeToTasksTable = () => (dispatch) => {
    dispatch({
        type: SWITCH_HOME_BODY,
        payload: BODY_TASKS
    });
};

export const routeToMyTasksTable = () => (dispatch) => {
    dispatch({
        type: SWITCH_HOME_BODY,
        payload: BODY_MY_TASKS
    });
};*/

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

export const updateSelectedTaskUsers = (taskId) => {
    return dispatch => {
        backend.updateSelectedTaskUsers(dispatch, taskId);
    };
};

export const updateMyTasks = (userId) => {
    return dispatch => {
        backend.updateMyTasks(dispatch, userId);
    };
};

export const getMyTasksByProject = (project) => {
    return dispatch => {
        if(project !== null){
            backend.getMyTasksByProject(dispatch, project);
        }
    };
};
