import {takeLatest} from 'redux-saga/effects'
import { login, forgotPassword, resetPassword, logout } from "./admin"; 
import {ADMIN_LOGOUT} from "../components/common/actions";


export default function* Sagas(){

	/*Admin User Actions*/
	yield takeLatest("Admin-login", login);
	yield takeLatest("Admin-Forgot-Password", forgotPassword)
	yield takeLatest("ADMIN_RESET_PASSWORD", resetPassword);
	yield takeLatest(ADMIN_LOGOUT, logout);
	// yield takeLatest("Admin-profile", profile);


}