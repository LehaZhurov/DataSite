export function SendRPCRequest(method,url,body = null){
    body = JSON.stringify(body);
	return new Promise ((resolve,reject)=>{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url,true)
		xhr.responseType = 'json';
		// xhr.setRequestHeader("X-CSRF-TOKEN", document.head.querySelector("[name=csrf-token]").content )
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

export function RPC(method,data,id){
    let rpc = {"jsonrpc":"2.0","method":method,"params":data,'id':id};
    return rpc;
}