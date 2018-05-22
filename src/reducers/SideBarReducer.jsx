import {
    LATEST_TASKS_UPDATE,
    USER_INFO_UPDATE,
    TOGGLE_SIDEBAR
} from '../actions/types';

import * as messages from '../utils/Messages';

const INITIAL_STATE = {
    isAdmin: false,
    isSidebarToggled: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_INFO_UPDATE:
            return { ...state,
                isAdmin: action.payload.isAdmin
            };
        case TOGGLE_SIDEBAR:
            return { ...state,
                isSidebarToggled: !state.isSidebarToggled
            };

        default:
            return state;
    }
};
