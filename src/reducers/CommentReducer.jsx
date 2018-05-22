import {
    LATEST_COMMENTS_UPDATE,
    LATEST_COMMENTS_UPDATE_FAIL,
    ALL_PROJECT_TASKS_UPDATE,
    ALL_PROJECTS_UPDATE,
    ALL_PROJECTS_UPDATE_FAIL,
    ALL_PROJECT_TASKS_UPDATE_FAIL,
    ALL_TASK_COMMENTS_UPDATE,
    ALL_TASK_COMMENTS_UPDATE_FAIL,

    MY_PROJECTS_UPDATE,
    MY_PROJECTS_UPDATE_FAIL,
    MY_TASKS_UPDATE,
    MY_TASKS_UPDATE_FAIL,

    COMMENT_NEW,
    COMMENT_TEXT_CHANGED,
    COMMENT_PROGRESS_CHANGED,
    COMMENT_MODAL_CANCEL,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_SUCCESS,
    COMMENT_SAVE_FAIL,
    COMMENT_SAVE_SUCCESS,
    SELECT_TASK_UPDATE,
    SELECT_PROJECT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    commentText: '',
    commentProgress: 0,
    minimumCommentProgress: 0,
    commentModalOpen: false,
    selectedProject: null,
    selectedTask: null,
    tasks: [],
    projects: [],
    comments: [],
    commentSaveError: '',
    errorMsg: '',
    latestComments: [{ name: 'Comment 1', progress: 30 }, { name: 'Comment 2', progress: 90 }],
    comments: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case COMMENT_TEXT_CHANGED:
            return {
                ...state,
                commentText: action.payload,
                commentSaveError: ''
            };
        case COMMENT_PROGRESS_CHANGED:
            return {
                ...state,
                commentProgress: action.payload,
                commentSaveError: ''
            };
        case COMMENT_NEW:
            return {
                ...state,
                commentText: '',
                commentProgress: 0,
                commentSaveError: '',
                commentModalOpen: true,
                commentProgress: action.payload,
                minimumCommentProgress: action.payload,
            };
        case COMMENT_MODAL_CANCEL:
            return {
                ...state,
                commentText: '',
                commentProgress: 0,
                commentModalOpen: false,
                commentSaveError: ''
            };
        case LATEST_COMMENTS_UPDATE:
            return {
                ...state, latestComments: action.payload, errorMsg: ''
            };
        case LATEST_COMMENTS_UPDATE_FAIL:
            return {
                ...state, latestComments: [], errorMsg: action.payload
            };
        case ALL_PROJECT_TASKS_UPDATE:
            return {
                ...state,
                selectedProject: action.payload.selectedProject,
                tasks: action.payload.tasks,
                selectedTask: null,
                comments: [],
                errorMsg: ''
            };
        case ALL_PROJECT_TASKS_UPDATE_FAIL:
            return {
                ...state,
                selectedProject: null,
                selectedTask: null,
                tasks: [],
                comments: [],
                errorMsg: action.payload
            };
        case ALL_PROJECTS_UPDATE:
            return {
                ...state,
                projects: action.payload,
                selectedProject: null,
                selectedTask: null,
                comments: [],
                errorMsg: ''
            };
        case ALL_PROJECTS_UPDATE_FAIL:
            return {
                ...state,
                projects: [],
                tsks: [],
                comments: [],
                selectedTask: null,
                errorMsg: action.payload
            };
        case ALL_TASK_COMMENTS_UPDATE:
            return {
                ...state,
                selectedTask: action.payload.selectedTask,
                comments: action.payload.comments,
                errorMsg: ''
            };
        case ALL_TASK_COMMENTS_UPDATE_FAIL:
            return {
                ...state,
                selectedTask: null,
                comments: [],
                commentProgress: 0,
                errorMsg: action.payload
            };
        case COMMENT_DELETE_FAIL:
            return {
                ...state,
                errorMsg: action.payload
            };
        case COMMENT_SAVE_SUCCESS:
            return {
                ...state,
                commentText: '',
                commentModalOpen: false,
                commentSaveError: '',
                //selectedTask: { ...selectedTask, progress: selectedTask.progress + commentProgress},
                commentProgress: 0,
            };
        case COMMENT_SAVE_FAIL:
            return {
                ...state,
                commentSaveError: action.payload,
            };
        case SELECT_TASK_UPDATE:
            return {
                ...state,
                selectedTask: action.payload,
            };
        case SELECT_PROJECT_UPDATE:
            return {
                ...state,
                selectedProject: action.payload,
            };
        case MY_PROJECTS_UPDATE:
            return {
                ...state,
                projects: action.payload,
                selectedProject: null,
                selectedTask: null,
                tasks: [],
                comments: [],
            };
        case MY_PROJECTS_UPDATE_FAIL:
            return {
                ...state,
                selectedProject: null,
                selectedTask: null,
                projects: [],
                tasks: [],
                comments: [],
                errorMsg: action.payload
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
                comments: [],
                errorMsg: action.payload
            };
        default:
            return state;
    }
};
