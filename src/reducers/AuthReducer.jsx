import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_USER,
  START_SETUP_LOGIN,
  SETUP_LOGIN_SUCCESS,
  SETUP_LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  password: '',
  authenticated: false,
  loginError: '',
  loading: false,
  loggedinUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload, loginError: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, loginError: '' };
    case LOGIN_USER:
      return { ...state, loading: true, loginError: '', registerError: '' };
    case LOGIN_SUCCESS:
      return { ...state, loggedinUser: action.payload, authenticated: true, loginError: '', loading: false };
    case LOGIN_FAIL:
      return { ...state, loginError: 'Authentication Failed! ' + action.payload, authenticated: false, loading: false };
    case START_SETUP_LOGIN:
      return { ...state, authenticated: true, loadingData: true };
    case SETUP_LOGIN_SUCCESS:
      return { ...state, loadingData: false };
    case SETUP_LOGIN_FAIL:
      return { ...state, loadingData: false };
    default:
      return state;
  }
};
