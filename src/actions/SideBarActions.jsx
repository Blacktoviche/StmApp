import {
    SWITCH_ADMIN_HOME_BODY,

} from './types';

import * as backend from '../backend/Backend';
import { SWITCH_HOME_BODY } from '../actions/types';

export const routeTo = (component) => (dispatch) => {
    dispatch({
        type: SWITCH_HOME_BODY,
        payload: component
    });
};