export function SendRequest(method,url,body = null){
	return new Promise ((resolve,reject)=>{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url,true)
		xhr.responseType = 'json';
        xhr.setRequestHeader("Content-Type", "application/json");
		xhr.withCredentials = true;
		if(xhr.readyState == 1){
			console.log('Отправка запроса');
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

