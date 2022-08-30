import { FormBuilder } from "./FormBuilder";
import { SendRPCRequest, RPC } from "./rpc";

let form_uid = 1;


function getForm() {
    let data = RPC('data@getForm', { 'id': form_uid }, 1);
    console.log(data);
    SendRPCRequest('POST', 'http://localhost:81/api/v1/form', data)
        .then(data => console.log(data))//Передаем сообщение от сервера
        .catch(err => console.log(err));
}

window.onload = () => {
    getForm();
}
