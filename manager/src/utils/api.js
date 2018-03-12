(function(){
	window.admin = {

		login : window._env.adminPath+"login-admin",
		profile : window._env.adminPath+"my-profile",
		forgotPassword : window._env.adminPath+"forgot-password",
		resetPassword : window._env.adminPath+"reset-password",
		upadteAdminPassword: window._env.adminPath + "change-password",
		upadteAdminProfile: window._env.adminPath + "update-profile",

		// ROLE
		addEditRole: window._env.adminPath + "add-edit-role",
		getRoles: window._env.adminPath + "get-roles",
		getARole: window._env.adminPath + "get-a-role",
		
		// USER/ADMIN MANGMENT
		addEditUser: window._env.adminPath + "add-edit-admin",
		getUsers: window._env.adminPath + "get-admins",
		getAUser: window._env.adminPath + "get-a-admin",
		asyncCheck: window._env.adminPath + "async-check",
	};

	
})();