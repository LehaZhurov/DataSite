import { FormBuilder } from './FormBuilder';
import { SendRPCRequest, RPC } from '../rpc';
import { Alert } from '../alert';
let Builder;
function createContstructor() {
    Builder = new FormBuilder();
    Builder.init('constructor');
}

window.onload = () => {
    createContstructor();
};


document.querySelector('#saveform').onclick = () => {
    if (!Builder.save()) {
        Alert('Не указано имя формы','error');
    }
    let data = RPC('data@createForm', Builder.formData, 1);
    console.log(data);
    SendRPCRequest('POST', 'api/v1/form', data)
        .then(data => formSaved(data))//Передаем сообщение от сервера
        .catch(err => console.log(err));
}


function formSaved(data) {
    if(data['error']){
        let errors = data['error']['data'];
        for (let key in errors) {
              Alert(errors[key],'error')
        }
        return false;
    }
    Builder = new FormBuilder();
    Builder.init('constructor');
}


