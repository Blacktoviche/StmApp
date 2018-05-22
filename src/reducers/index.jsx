import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';
import TopBarReducer from './TopBarReducer';
import BodyReducer from './BodyReducer';

import ProjectReducer from './ProjectReducer';
import TaskReducer from './TaskReducer';
import CommentReducer from './CommentReducer';
import UserReducer from './UserReducer';

import SideBarReducer from './SideBarReducer';


export default combineReducers({
    authReducer: AuthReducer,
    homeReducer: HomeReducer,
    topBarReducer: TopBarReducer,
    bodyReducer: BodyReducer,
    projectReducer: ProjectReducer,
    taskReducer: TaskReducer,
    commentReducer: CommentReducer,
    sideBarReducer: SideBarReducer,
    userReducer: UserReducer,

});