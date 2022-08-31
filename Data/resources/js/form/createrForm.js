import { FormBuilder } from './FormBuilder';
import { SendRPCRequest, RPC } from '../rpc';
import { Alert } from '../alert';
import {load} from '../Load'
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
        Alert('Не указано имя формы', 'error');
        return false;
    }
    load(true,'Сохранение формы');
    let data = RPC('data@createForm', Builder.formData, 1);
    SendRPCRequest('POST', 'api/v1/form', data)
        .then(data => formSaved(data))//Передаем сообщение от сервера
        .catch(err => console.log(err));
}


function formSaved(data) {
    if (data['error']) {
        let errors = data['error']['data'];
        for (let key in errors) {
            Alert(errors[key], 'error')
        }
        return false;
    }else{
        Alert('Форма успешно сохранена','success')
    }
    Builder = new FormBuilder();
    Builder.init('constructor');
    load(false);
}


