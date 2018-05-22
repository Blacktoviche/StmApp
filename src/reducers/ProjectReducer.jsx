import {
    USER_INFO_UPDATE,

    LATEST_PROJECTS_UPDATE,
    LATEST_PROJECTS_UPDATE_FAIL,
    PROJECT_NEW,
    PROJECT_EDIT,
    PROJECT_MODAL_CANCEL,
    PROJECT_SAVE_SUCCESS,
    PROJECT_SAVE_FAIL,
    ALL_PROJECTS_UPDATE_FAIL,
    ALL_PROJECTS_UPDATE,
    SWITCH_HOME_BODY,
    PROJECT_NAME_CHANGED,
    PROJECT_DESC_CHANGED,

    PROJECT_DETAIL_START,
    PROJECT_DETAIL_MODAL_CLOSE,
    PROJECT_DETAIL_SUCCESS,
    PROJECT_DETAIL_FAIL,
    ALL_PROJECT_TASKS_UPDATE,
    ALL_PROJECT_TASKS_UPDATE_FAIL,

    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAIL,

    TASK_TITLE_CHANGED,
    TASK_DESC_CHANGED,
    PROJEC_TASK_ADDED,
    PROJEC_TASK_ADDED_FAIL,
    PROJEC_TASK_REMOVED,
    PROJEC_TASK_CANCELED,
    TASK_USERS_CHANGED,
    ALL_USERS_UPDATE,
    ALL_USERS_UPDATE_FAIL,

    MY_PROJECTS_UPDATE,
    MY_PROJECTS_UPDATE_FAIL,
} from '../actions/types';

import { getEmptyProject, PROJECTS_BODY_TABLE, PROJECTS_BODY_ADD_EDIT } from '../utils/Utils';
const INITIAL_STATE = {
    projectId: null,
    projectName: '',
    projectDesc: '',
    projectModalOpen: false,
    projectSaveError: '',
    projects: [],
    selectedProject: getEmptyProject(),
    projectTasks: [],
    projectDetailOpen: false,
    projectsBody: PROJECTS_BODY_TABLE,
    addTaskError: '',

    taskTitle: '',
    taskDesc: '',
    tasksList: [],
    allUsersList: [],
    taskUsersList: [],
    selectedUsersList: [],

    latestProjects: [
        {
            name: 'Project first',
            progress: 40
        }, {
            name: 'project Second',
            progress: 80
        }
    ],
    myProjects: [],
    userId: null,
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case PROJECT_NAME_CHANGED:
            return {
                ...state,
                projectName: action.payload,
                projectSaveError: ''
            };
        case PROJECT_DESC_CHANGED:
            return {
                ...state,
                projectDesc: action.payload,
                projectSaveError: ''
            };
        case ALL_PROJECTS_UPDATE:
            return {
                ...state,
                projects: action.payload,
                errorMsg: ''
            };
        case ALL_PROJECTS_UPDATE_FAIL:
            return {
                ...state,
                projects: [],
                errorMsg: action.payload
            };
        case PROJECT_NEW:
            return {
                ...state,
                projectId: null,
                projectName: '',
                projectDesc: '',
                projectsBody: PROJECTS_BODY_ADD_EDIT,
                taskTitle: '',
                taskDesc: '',
                tasksList: [],
                selectedUsersList: [],
                projectSaveError: '',
                projectModalOpen: true
            };
        case PROJECT_EDIT:
            return {
                ...state,
                projectId: action.payload.id,
                projectName: action.payload.name,
                projectDesc: action.payload.description,
                //projectsBody: PROJECTS_BODY_ADD_EDIT,
                //taskTitle: '',
                //taskDesc: '',
                //tasksList: action.payload.tasksList,
                //selectedUsersList: [],
                projectModalOpen: true,
                projectSaveError: ''
            };
        case PROJECT_MODAL_CANCEL:
            return {
                ...state,
                projectSaveError: '',
                projectModalOpen: false,
                projectsBody: PROJECTS_BODY_TABLE
            };
        case PROJECT_SAVE_SUCCESS:
            return {
                ...state,
                projectName: '',
                projectDesc: '',
                projectModalOpen: false,
                projectSaveError: '',
                projectsBody: PROJECTS_BODY_TABLE
            };
        case PROJECT_SAVE_FAIL:
            return {
                ...state,
                projectSaveError: action.payload
            };
        case LATEST_PROJECTS_UPDATE:
            return {
                ...state,
                latestProjects: action.payload
            };
        case PROJECT_DETAIL_SUCCESS:
            return {
                ...state,
                selectedProject: action.payload,
                projectTasksprojectTasks: action.payload.tasks,
                projectDetailOpen: true,
                errorMsg: ''
            };
        case PROJECT_DETAIL_FAIL:
            return {
                ...state,
                selectedProject: getEmptyProject(),
                projectDetailOpen: false,
                errorMsg: action.payload
            };
        case PROJECT_DETAIL_MODAL_CLOSE:
            return {
                ...state,
                selectedProject: getEmptyProject(),
                projectDetailOpen: false
            };
        case ALL_PROJECT_TASKS_UPDATE:
            return {
                ...state,
                projectTasks: action.payload,
                errorMsg: ''
            };
        case ALL_PROJECT_TASKS_UPDATE_FAIL:
            return {
                ...state,
                projectTasks: [],
                errorMsg: action.payload
            };
        case TASK_TITLE_CHANGED:
            return {
                ...state,
                taskTitle: action.payload,
                addTaskError: ''
            };
        case TASK_DESC_CHANGED:
            return {
                ...state,
                taskDesc: action.payload
            };
        case PROJEC_TASK_ADDED:
            return {
                ...state,
                taskTitle: '',
                taskDesc: '',
                tasksList: action.payload.tasksList,
                selectedUsersList: [],
                taskUsersList: state.allUsersList,
                addTaskError: ''
            };
        case PROJEC_TASK_ADDED_FAIL:
            return {
                ...state,
                addTaskError: action.payload
            };
        case PROJEC_TASK_REMOVED:
            return {
                ...state,
                tasksList: action.payload.tasksList
            };
        case PROJEC_TASK_CANCELED:
            return {
                ...state,
                taskTitle: '',
                taskDesc: '',
                selectedUsersList: [],
                taskUsersList: state.allUsersList,
                addTaskError: ''
            };
        case TASK_USERS_CHANGED:
            return {
                ...state,
                taskUsersList: action.payload.taskUsers,
                selectedUsersList: action.payload.selectedUsers,
                addTaskError: ''
            };
        case ALL_USERS_UPDATE:
            return {
                ...state,
                allUsersList: action.payload,
                taskUsersList: action.payload
            };
        case ALL_USERS_UPDATE_FAIL:
            return {
                ...state,
                allUsersList: [],
                errorMsg: action.payload
            };
        case MY_PROJECTS_UPDATE:
            return {
                ...state,
                myProjects: action.payload,
            };
        case MY_PROJECTS_UPDATE_FAIL:
            return {
                ...state,
                myProjects: [],
                errorMsg: action.payload
            };
        case USER_INFO_UPDATE:
            return {
                ...state, userId: action.payload.id
            };
        default:
            return state;
    }
};
