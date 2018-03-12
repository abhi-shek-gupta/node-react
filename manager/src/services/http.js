import axios from 'axios';
import Session from './session';

/*Setting up interceptors with axios*/
/*it supports add/remove interceptors - 2017dec*/
// Add a request interceptor
axios.interceptors.request.use( function(config) {
  	// Do something before request is sent
		const token = Session.getSession('token'); 
    if(token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
  	return config;
}, function (error) {
  	// Do something with request error
  	return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use( function(response) {
		// Do something with response data
  	return response;
},  function(error) {
	if(!error.response && error.message === 'Network Error'){
		alert("Couldn't connect to server");
		return Promise.reject();
	}
  	// Do something with response error
  	return Promise.reject(error.response.data);
});


export default class Http {
	static Request(method, url, data){
		return new Promise((resolve, reject) => {
			axios({
			  method:method,
			  url:url,
			  [method==='get'?"params":"data"] : data
			})
				.then(response => { resolve(response.data)})
				.catch(error => { reject(error);});
		});
	}
}


