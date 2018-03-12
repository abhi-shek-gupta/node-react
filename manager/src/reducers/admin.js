

import Session from '../services/session';
import {ADMIN_LOGOUT} from "../components/common/actions";

const initState = {
    user: Session.getSession("user"),
    token: Session.getSession("token")
};

const _reducer = "_reducer";
export default function admin(state = initState, data) {

    switch (data.type) {
        case "Admin-login" + _reducer : {

            return { ...state, token: data.admin.data.token, user: data.admin.data.data };
        }

        case "Admin-Forgot-Password" + _reducer : {
            return { ...state, data:data};
        }

        case ADMIN_LOGOUT + _reducer: {
            return { ...state, token: null, user: null };
        }

        case "Admin-profile" + _reducer: {
            return { ...state };
        }

        default: {
            return state;
        }
    }
}