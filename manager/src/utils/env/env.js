(function(){

	const PORT = window.location.port ? window.location.port:"8035";
	/*creating an env for application*/
	window._env = window._env || {};

	window._env = {
		app: "Athelte",
		prefix : "_DEV_",
		baseUrl : "http://158.85.76.204:"+PORT+"/",
	};
	

	if (PORT === "3000") { 
		window._env.baseUrl = "http://localhost:8000/"
	}

	window.limit = 10;
	window._env.appPath = window._env.baseUrl+"api/";
	window._env.adminPath = window._env.baseUrl+"admin_api/";

}());