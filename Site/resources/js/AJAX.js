export function SendRequest(method,url,body = null,debug = false){
	return new Promise ((resolve,reject)=>{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url,true)
		xhr.responseType = 'json';
		xhr.withCredentials = true;
		if(xhr.readyState == 1){
			if(debug){
				console.log('Отправка запроса ' + method + ' на ' + url);
			}
		}
		xhr.onload = () =>{
			if(xhr.status >= 400){
				reject(xhr.response);
			}else{
				resolve(xhr.response);
			}
		}
		xhr.onerror = () =>{
			reject(xhr.response);
		}
		xhr.send(body);
	});
}

