import {call, put} from 'redux-saga/effects';
import { loginCall, forgotPasswordCall, resetPasswordCall, profileCall} from "../api/admin";
import Session from "../services/session";
import {ADMIN_LOGOUT} from "../components/common/actions";


export function* login(action){

	console.log("in login saga")
	try{
		const adminData =  yield call(loginCall, action);

		console.log("adminDATA", adminData);
		yield put({
			type : "Admin-login_reducer",
			admin : adminData,
		});
		action.success(adminData);
	}
	catch(e){
		action.error(e);
	}
}

export function* logout(action){
	try{
		/*Clearing Sessions*/
		Session.clearSession("token");
		Session.clearSession("user");
		yield put({
			type: ADMIN_LOGOUT+"_reducer"
		});
		action.success(true);
	}
	catch(e){
		action.error(e);
	}
}

export function* forgotPassword(action) {
	try {
		const forgotData = yield call(forgotPasswordCall, action);
		yield put({
			type: "Admin-Forgot-Password_reducer",
			data: forgotData
		});
		action.success(forgotData);
	}
	catch (e) {
		action.error(e);
	}
}

export function* resetPassword(action) {
	try {
		const resetData = yield call(resetPasswordCall, action);
		action.success(resetData);
	}
	catch (e) {
		action.error(e);
	}
}

export function* profile(action){
	const profile = yield call(profileCall);
	try{
		yield put({
			type : "Admin-profile_reducer",
			data : profile
		});
		action.success(true);
	}
	catch(e){
		action.error(e);
	}
}