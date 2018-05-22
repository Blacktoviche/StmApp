import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER,
    SETUP_LOGIN_SUCCESS,
    SETUP_LOGIN_FAIL,
    USER_INFO_UPDATE,
    USER_INFO_UPDATE_FAIL,

    LATEST_PROJECTS_UPDATE,
    LATEST_PROJECTS_UPDATE_FAIL,
    ALL_PROJECTS_UPDATE,
    ALL_PROJECTS_UPDATE_FAIL,
    PROJECT_SAVE_SUCCESS,
    PROJECT_SAVE_FAIL,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAIL,
    PROJECT_DETAIL_SUCCESS,
    PROJECT_DETAIL_FAIL,

    LATEST_TASKS_UPDATE,
    LATEST_TASKS_UPDATE_FAIL,
    ALL_TASKS_UPDATE,
    ALL_TASKS_UPDATE_FAIL,
    TASK_SAVE_SUCCESS,
    TASK_SAVE_FAIL,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
    ALL_PROJECT_TASKS_UPDATE,
    ALL_PROJECT_TASKS_UPDATE_FAIL,
    LATEST_COMMENTS_UPDATE,
    LATEST_COMMENTS_UPDATE_FAIL,

    ALL_USERS_UPDATE,
    ALL_USERS_UPDATE_FAIL,

    SELECTED_TASK_USERS_UPDATE,
    SELECTED_TASK_USERS_UPDATE_FAIL,

    ALL_TASK_COMMENTS_UPDATE,
    ALL_TASK_COMMENTS_UPDATE_FAIL,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,

    MY_PROJECTS_UPDATE,
    MY_PROJECTS_UPDATE_FAIL,

    MY_TASKS_UPDATE,
    MY_TASKS_UPDATE_FAIL,

    COMMENT_SAVE_SUCCESS,
    COMMENT_SAVE_FAIL,

    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    SELECT_PROJECT_UPDATE,
    SELECT_PROJECT_UPDATE_FAIL,
    SELECT_TASK_UPDATE,
    SELECT_TASK_UPDATE_FAIL,

    RESET_PWD,
    RESET_PWD_SUCCESS,
    RESET_PWD_FAIL,

    PROFILE_SAVE_SUCCESS,
    PROFILE_SAVE_FAIL,

    MY_PROGRESS_UPDATE,
    MY_PROGRESS_UPDATE_FAIL,

    LOGOUT_USER
} from '../actions/types';
import { JWT_TOKEN, isAdmin } from '../utils/Utils';
import * as Storage from '../utils/Storage';
import * as Utils from '../utils/Utils';
//import fetch from 'node-fetch';

export const signin = (dispatch, username, password) => {
    //console.log('user::', username, password);
    fetch(Utils.API_DOMAIN_AUTH_LOGOUT('auth'), {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ username: username, password: password })
    }).then((response) => {
        response
            .json()
            .then((data) => {
                console.log('token:: ' + data.token);
                console.log('status:: ' + response.status);
                console.log('statusok:: ' + response.ok);
                if (response.status === 200 && data.token !== '') {
                    Storage.saveEntry(JWT_TOKEN, data.token);
                    Storage.saveEntry('username', username);
                    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
                    getUserInfo(dispatch);

                } else {
                    dispatch({ type: LOGIN_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('errorwwww' + error);
        dispatch({ type: LOGIN_FAIL, payload: error });
    });

};

const getUserInfo = (dispatch) => {
    //console.log('token:: ', Storage.getEntry(JWT_TOKEN));
    fetch(Utils.API_DOMAIN('user'), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: USER_INFO_UPDATE,
                        payload: {
                            userId: data.id,
                            username: data.username,
                            email: data.email,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            enabled: data.enabled,
                            beautifyRoleName: data.beautifyRoleName,
                            isAdmin: Utils.isAdmin(data.beautifyRoleName),
                        }
                    });
                } else if (response.status === 401) {
                    unauthorizedError(dispatch, data);
                } else {
                    dispatch({ type: USER_INFO_UPDATE_FAIL, payload: data.message });
                }

            })
    }).catch((error) => {
        console.log('XXerror' + error);
        dispatch({ type: USER_INFO_UPDATE_FAIL, payload: error });
    });
}

export const updateUsers = (dispatch) => {
    fetch(Utils.API_DOMAIN('users'), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('users:::', data);
                    dispatch({ type: ALL_USERS_UPDATE, payload: data });
                } else if (response.status === 401) {
                    unauthorizedError();
                } else {
                    dispatch({ type: ALL_USERS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_USERS_UPDATE_FAIL, payload: error });
    });
}

export const updateUsersEnabled = (dispatch) => {
    fetch(Utils.API_DOMAIN('enabledusers'), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('users:::', data);
                    dispatch({ type: ALL_USERS_UPDATE, payload: data });
                } else {
                    dispatch({ type: ALL_USERS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_USERS_UPDATE_FAIL, payload: error });
    });
}

export const updateSelectedTaskUsers = (dispatch, taskId) => {
    fetch(Utils.API_DOMAIN(`task/${taskId}/users`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('users:::', data);
                    dispatch({ type: SELECTED_TASK_USERS_UPDATE, payload: data });
                } else {
                    dispatch({ type: SELECTED_TASK_USERS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: SELECTED_TASK_USERS_UPDATE_FAIL, payload: error });
    });
}

export const updateLatestProject = (dispatch) => {
    fetch(Utils.API_DOMAIN(`projects/${Utils.LATEST_PROJECTS_COUNT}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({ type: LATEST_PROJECTS_UPDATE, payload: data });
                } else {
                    dispatch({ type: LATEST_PROJECTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: LATEST_PROJECTS_UPDATE_FAIL, payload: error });
    });
}



export const updateMyLatestProject = (dispatch) => {
    fetch(Utils.API_DOMAIN(`mylatestprojects/${Utils.LATEST_PROJECTS_COUNT}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({ type: LATEST_PROJECTS_UPDATE, payload: data });
                } else {
                    dispatch({ type: LATEST_PROJECTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: LATEST_PROJECTS_UPDATE_FAIL, payload: error });
    });
}


export const updateAllProjects = (dispatch) => {
    fetch(Utils.API_DOMAIN('projects/0'), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({ type: ALL_PROJECTS_UPDATE, payload: data });
                } else {
                    dispatch({ type: ALL_PROJECTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_PROJECTS_UPDATE_FAIL, payload: error });
    });
}

export const getProjectStatistics = (dispatch, project) => {
    fetch(Utils.API_DOMAIN(`projectstatistics/${project.id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                console.log('project::: ', data);
                //getTasksByProject(dispatch, project);
                if (response.status === 200) {
                    dispatch({ type: PROJECT_DETAIL_SUCCESS, payload: data });
                } else {
                    dispatch({ type: PROJECT_DETAIL_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: PROJECT_DETAIL_FAIL, payload: error });
    });
}

export const getProjectDetail = (dispatch, project) => {
    console.log('projectDETAIL::', project);
    fetch(Utils.API_DOMAIN(`projectdetail/${project.id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                //console.log('project::: ', data);
                getTasksByProject(dispatch, project);
                if (response.status === 200) {
                    dispatch({ type: PROJECT_DETAIL_SUCCESS, payload: data });
                } else {
                    dispatch({ type: PROJECT_DETAIL_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: PROJECT_DETAIL_FAIL, payload: error });
    });
}

export const saveProject = (dispatch, project) => {
    if (project.id == null) {
        saveNewProject(dispatch, project);
    } else {
        saveUpdatedProject(dispatch, project);
    }
}

const saveNewProject = (dispatch, project) => {

    fetch(Utils.API_DOMAIN('project'), {
        method: 'POST',
        headers: getTokenHeader(),
        body: JSON.stringify(project)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: PROJECT_SAVE_SUCCESS });
            updateAllProjects(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: PROJECT_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('errorFAIL' + error);
        dispatch({ type: PROJECT_SAVE_FAIL, payload: error });
    });
}

const saveUpdatedProject = (dispatch, project) => {

    fetch(Utils.API_DOMAIN(`project/${project.id}`), {
        method: 'PUT',
        headers: getTokenHeader(),
        body: JSON.stringify(project)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: PROJECT_SAVE_SUCCESS });
            updateAllProjects(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: PROJECT_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('errorFAIL' + error);
        dispatch({ type: PROJECT_SAVE_FAIL, payload: error });
    });
}

export const deleteProject = (dispatch, id) => {

    fetch(Utils.API_DOMAIN(`project/${id}`), {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: PROJECT_DELETE_SUCCESS });
            updateAllProjects(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: PROJECT_DELETE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('errorDel' + error);
        dispatch({ type: PROJECT_DELETE_FAIL, payload: error });
    });
}

export const saveTask = (dispatch, task, project) => {
    if (task.id == null) {
        saveNewTask(dispatch, task, project);
    } else {
        saveUpdatedTask(dispatch, task, project);
    }
}

export const saveNewTask = (dispatch, task, project) => {
    fetch(Utils.API_DOMAIN(`task/${project.id}`), {
        method: 'POST',
        headers: getTokenHeader(),
        body: JSON.stringify(task)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: TASK_SAVE_SUCCESS });
            updateProject(dispatch, project.id);
            getTasksByProject(dispatch, project);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: TASK_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: TASK_SAVE_FAIL, payload: error });
    });
}

export const saveUpdatedTask = (dispatch, task, project) => {
    fetch(Utils.API_DOMAIN(`task/${project.id}`), {
        method: 'PUT',
        headers: getTokenHeader(),
        body: JSON.stringify(task)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: TASK_SAVE_SUCCESS });
            updateProject(dispatch, project.id);
            getTasksByProject(dispatch, project);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: TASK_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: TASK_SAVE_FAIL, payload: error });
    });
}

export const deleteTask = (dispatch, id, project) => {

    fetch(Utils.API_DOMAIN(`task/${id}`), {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: TASK_DELETE_SUCCESS });
            updateProject(dispatch, project.id);
            getTasksByProject(dispatch, project);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({
                        type: TASK_DELETE_FAIL,
                        payload: data.message
                    });
                })
        }
    }).catch((error) => {
        console.log('errorDel' + error);
        dispatch({ type: TASK_DELETE_FAIL, payload: error });
    });
}

/*export const updateAllTasks = (dispatch) => {
    fetch(Utils.API_DOMAIN('tasks/0'), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({type: ALL_TASKS_UPDATE, payload: data});
                } else {
                    dispatch({type: ALL_TASKS_UPDATE_FAIL, payload: data.message});
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({type: ALL_TASKS_UPDATE_FAIL, payload: error});
    });
}*/

export const updateLatestTasks = (dispatch) => {
    fetch(Utils.API_DOMAIN(`tasks/${Utils.LATEST_TASKS_COUNT}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('tasks::', data)
                    dispatch({ type: LATEST_TASKS_UPDATE, payload: data });
                } else {
                    dispatch({ type: LATEST_TASKS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: LATEST_TASKS_UPDATE_FAIL, payload: error });
    });
}


export const updateMyLatestTasks = (dispatch) => {
    fetch(Utils.API_DOMAIN(`mylatesttasks/${Utils.LATEST_TASKS_COUNT}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('tasks::', data)
                    dispatch({ type: LATEST_TASKS_UPDATE, payload: data });
                } else {
                    dispatch({ type: LATEST_TASKS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: LATEST_TASKS_UPDATE_FAIL, payload: error });
    });
}


export const getTasksByProject = (dispatch, project) => {
    fetch(Utils.API_DOMAIN(`tasks/project/${project.id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: ALL_PROJECT_TASKS_UPDATE,
                        payload: {
                            tasks: data,
                            selectedProject: project
                        }
                    });
                } else {
                    dispatch({ type: ALL_PROJECT_TASKS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_PROJECT_TASKS_UPDATE_FAIL, payload: error });
    });
}

//Comment
export const updateLatestComments = (dispatch) => {
    fetch(Utils.API_DOMAIN(`comments/${Utils.LATEST_COMMENTS_COUNT}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('comments::', data)
                    dispatch({ type: LATEST_COMMENTS_UPDATE, payload: data });
                } else {
                    dispatch({ type: LATEST_COMMENTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: LATEST_COMMENTS_UPDATE_FAIL, payload: error });
    });
}

//in case the loggedin user is not admin
export const updateMyLatestComments = (dispatch) => {
    fetch(Utils.API_DOMAIN(`mylatestcomments/${Utils.LATEST_COMMENTS_COUNT}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('MYcomments::', data)
                    dispatch({ type: LATEST_COMMENTS_UPDATE, payload: data });
                } else {
                    dispatch({ type: LATEST_COMMENTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: LATEST_COMMENTS_UPDATE_FAIL, payload: error });
    });
}

export const getCommentsByTask = (dispatch, task) => {
    fetch(Utils.API_DOMAIN(`comments/task/${task.id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('getCommentsByTask::: ', data);
                    dispatch({
                        type: ALL_TASK_COMMENTS_UPDATE,
                        payload: {
                            comments: data,
                            selectedTask: task
                        }
                    });
                    //updateTask(dispatch, task.id);
                    //updateProject(dispatch, task.project.id);
                } else {
                    dispatch({ type: ALL_TASK_COMMENTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_TASK_COMMENTS_UPDATE_FAIL, payload: error });
    });
}

export const deleteComment = (dispatch, id, task) => {
    fetch(Utils.API_DOMAIN(`comment/${id}`), {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: COMMENT_DELETE_SUCCESS });
            getCommentsByTask(dispatch, task);
        } else {
            response
                .json()
                .then((data) => {
                    //console.log('delete comment', data.message);
                    dispatch({
                        type: COMMENT_DELETE_FAIL,
                        payload: data.message
                    });
                })
        }
    }).catch((error) => {
        console.log('errorDel' + error);
        dispatch({ type: COMMENT_DELETE_FAIL, payload: error });
    });
}

export const updateMyProjects = (dispatch) => {
    //console.log('myproject:::::');
    fetch(Utils.API_DOMAIN("myprojects"), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    //console.log('myprojects:: ', data);
                    dispatch({ type: MY_PROJECTS_UPDATE, payload: data });
                } else {
                    dispatch({ type: MY_PROJECTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: MY_PROJECTS_UPDATE_FAIL, payload: error });
    });
}

export const updateMyTasks = (dispatch) => {
    fetch(Utils.API_DOMAIN("mytasks"), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({ type: MY_TASKS_UPDATE, payload: data });
                } else {
                    dispatch({ type: MY_TASKS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: MY_TASKS_UPDATE_FAIL, payload: error });
    });
}


export const getMyTasksByProject = (dispatch, project) => {
    fetch(Utils.API_DOMAIN(`mytasks/project/${project.id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: ALL_PROJECT_TASKS_UPDATE,
                        payload: {
                            tasks: data,
                            selectedProject: project
                        }
                    });
                } else {
                    dispatch({ type: ALL_PROJECT_TASKS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_PROJECT_TASKS_UPDATE_FAIL, payload: error });
    });
}



export const getMyCommentsByTask = (dispatch, task) => {
    fetch(Utils.API_DOMAIN(`mycomments/task/${task.id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: ALL_TASK_COMMENTS_UPDATE,
                        payload: {
                            comments: data,
                            selectedTask: task
                        }
                    });
                    //updateMyTasks(dispatch);
                    //updateMyProjects(dispatch);
                } else {
                    dispatch({ type: ALL_TASK_COMMENTS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: ALL_TASK_COMMENTS_UPDATE_FAIL, payload: error });
    });
}


export const saveComment = (dispatch, comment, task) => {
    fetch(Utils.API_DOMAIN(`comment/${task.id}`), {
        method: 'POST',
        headers: getTokenHeader(),
        body: JSON.stringify(comment)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: COMMENT_SAVE_SUCCESS, payload: comment.progress });
            //Testing update the whole que
            getCommentsByTask(dispatch, task);
            //updateMyProjects(dispatch);
            //updateMyTasks(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: COMMENT_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error', error);
        dispatch({ type: COMMENT_SAVE_FAIL, payload: error });
    });
}


//
export const saveNewUser = (dispatch, user) => {
    console.log('to be saved user', user);
    fetch(Utils.API_DOMAIN(`user`), {
        method: 'POST',
        headers: getTokenHeader(),
        body: JSON.stringify(user)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: USER_SAVE_SUCCESS });
            updateUsers(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: USER_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error', error);
        dispatch({ type: USER_SAVE_FAIL, payload: error });
    });
}

export const saveEditedUser = (dispatch, user) => {
    fetch(Utils.API_DOMAIN(`user`), {
        method: 'PUT',
        headers: getTokenHeader(),
        body: JSON.stringify(user)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: USER_SAVE_SUCCESS });
            updateUsers(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: USER_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error::', error);
        dispatch({ type: USER_SAVE_FAIL, payload: error });
    });
}

export const deleteUser = (dispatch, id) => {

    fetch(Utils.API_DOMAIN(`user/${id}`), {
        method: 'DELETE',
        headers: getTokenHeader()
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: USER_DELETE_SUCCESS });
            updateUsers(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({
                        type: USER_DELETE_FAIL,
                        payload: data.message
                    });
                })
        }
    }).catch((error) => {
        console.log('errorDel' + error);
        dispatch({ type: USER_DELETE_FAIL, payload: error });
    });
}

export const updateTask = (dispatch, id) => {
    fetch(Utils.API_DOMAIN(`task/${id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: SELECT_TASK_UPDATE,
                        payload: data
                    });
                } else {
                    dispatch({ type: SELECT_TASK_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: SELECT_TASK_UPDATE_FAIL, payload: error });
    });
}

export const updateProject = (dispatch, id) => {
    fetch(Utils.API_DOMAIN(`project/${id}`), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: SELECT_PROJECT_UPDATE,
                        payload: data
                    });
                } else {
                    dispatch({ type: SELECT_PROJECT_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: SELECT_PROJECT_UPDATE_FAIL, payload: error });
    });
}

export const resetPwd = (dispatch, userId, password) => {
    fetch(Utils.API_DOMAIN(`user/resetpwd/${userId}`), {
        method: 'POST',
        headers: getTokenHeader(),
        body: password
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: RESET_PWD_SUCCESS });
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: RESET_PWD_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: RESET_PWD_FAIL, payload: error });
    });
}

export const resetMyPwd = (dispatch, oldPassword, password) => {
    fetch(Utils.API_DOMAIN('user/resetmypwd'), {
        method: 'POST',
        headers: getTokenHeader(),
        body: `${oldPassword},${password}`
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: RESET_PWD_SUCCESS });
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: RESET_PWD_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: RESET_PWD_FAIL, payload: error });
    });
}


export const saveProfile = (dispatch, user) => {
    fetch(Utils.API_DOMAIN(`myuser`), {
        method: 'PUT',
        headers: getTokenHeader(),
        body: JSON.stringify(user)
    }).then((response) => {
        if (response.status === 200) {
            dispatch({ type: PROFILE_SAVE_SUCCESS });
            getUserInfo(dispatch);
        } else {
            response
                .json()
                .then((data) => {
                    dispatch({ type: PROFILE_SAVE_FAIL, payload: data.message });
                })
        }
    }).catch((error) => {
        console.log('error', error);
        dispatch({ type: PROFILE_SAVE_FAIL, payload: error });
    });
}


export const updateMyProgress = (dispatch) => {
    fetch(Utils.API_DOMAIN('myprogress'), {
        method: 'GET',
        headers: getTokenHeader()
    }).then((response) => {
        response
            .json()
            .then((data) => {
                if (response.status === 200) {
                    dispatch({
                        type: MY_PROGRESS_UPDATE,
                        payload: data
                    });
                } else {
                    dispatch({ type: MY_PROGRESS_UPDATE_FAIL, payload: data.message });
                }
            })
    }).catch((error) => {
        console.log('error' + error);
        dispatch({ type: MY_PROGRESS_UPDATE_FAIL, payload: error });
    });
}


export const setupLogin = (dispatch) => {
    getUserInfo(dispatch);
}

const getTokenHeader = () => {
    var token = Storage.getEntry(JWT_TOKEN);
    if (token) {
        return {
            'Authorization': 'Bearer ' + Storage.getEntry(JWT_TOKEN),
            'Content-Type': 'application/json'
        };

    } else {
        return {};
    }
}

export const logout = (dispatch) => {
    Storage.saveEntry(JWT_TOKEN, null);

    fetch(Utils.API_DOMAIN_AUTH_LOGOUT('logout'), {
        method: 'DELETE',
        headers: getTokenHeader(),
    }).then((response) => {
        dispatch({ type: LOGOUT_USER });
    }).catch((error) => {
        console.log('error', error);
        dispatch({ type: LOGOUT_USER });
    });
}

const unauthorizedError = (dispatch, data) => {
    console.log('unauthorizedError:: ');
    Storage.saveEntry(JWT_TOKEN, null);
    dispatch({ type: USER_INFO_UPDATE_FAIL, payload: data });
}