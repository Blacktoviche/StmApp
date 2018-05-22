import {
    LATEST_COMMENTS_UPDATE,
    LATEST_COMMENTS_UPDATE_FAIL,
    SWITCH_ADMIN_HOME_BODY,

    NEW_COMMENT,
    COMMENT_NEW,
    COMMENT_TEXT_CHANGED,
    COMMENT_PROGRESS_CHANGED,
    COMMENT_MODAL_CANCEL,
    COMMENT_SAVE_FAIL
} from './types';
import * as backend from '../backend/Backend';


export const updateLatestComments = (isAdmin) => {
    return dispatch => {
        if (isAdmin) {
            backend.updateLatestComments(dispatch);
        } else {
            backend.updateMyLatestComments(dispatch);
        }
    };
};

/*export const updateAllComments = () => {
    return dispatch => {
        backend.updateAllComments(dispatch);
    };
};*/

export const getAllProjects = () => {
    return dispatch => {
        backend.updateAllProjects(dispatch);
    };
};

export const getTasksByProject = (projectId) => {
    return dispatch => {
        if (projectId !== null) {
            backend.getTasksByProject(dispatch, projectId);
        }
    };
};

export const getCommentsByTask = (task) => {
    return dispatch => {
        if (task !== null && task.id !== null) {
            backend.getCommentsByTask(dispatch, task);
        }
    };
};

export const deleteComment = (id, task) => {
    return dispatch => {
        backend.deleteComment(dispatch, id, task);
    };
};

export const getMyCommentsByTask = (task) => {
    return dispatch => {
        if (task !== null) {
            backend.getMyCommentsByTask(dispatch, task);
        }
    };
};

export const commentTextChanged = (text) => (dispatch) => {
    dispatch({
        type: COMMENT_TEXT_CHANGED,
        payload: text
    });
};

export const commentProgressChanged = (progress) => {
    return {
        type: COMMENT_PROGRESS_CHANGED,
        payload: progress
    };
};

export const newComment = (taskProgress) => {
    return {
        type: COMMENT_NEW,
        payload: taskProgress
    };
};

export const cancelCommentModal = () => {
    return {
        type: COMMENT_MODAL_CANCEL
    };
};

export const saveComment = (comment, task) => {
    return dispatch => {
        if (comment.commentText == '') {
            dispatch({ type: COMMENT_SAVE_FAIL, payload: 'Comment text is empty!' });
        } else if (comment.progress <= task.progress) {
            dispatch({ type: COMMENT_SAVE_FAIL, payload: "Comment progress is less or equal task progress!" });
        } else {
            backend.saveComment(dispatch, comment, task);
        }
    };
};


