import { FormCollector } from "./FormCollector";
import { SendRequest } from "../AJAX";
import { Alert } from "../Alert";
import { load } from "../Load";
let form;
let formButton;




export function getForm(form_uid) {
    if (!Number(form_uid)) {
        return false;
    }
    load(true, 'Загрузка формы');
    let request = SendRequest('GET', 'api/getForm/' + form_uid)
    return request;
}

export function buildForm(data) {
    if (typeof data['error'] != 'undefined') {
        Alert('Форма не найдена', 'error');
        return false;
    }
    let formMarkup = data;
    formMarkup.items = JSON.parse(data['items']);
    let Form = new FormCollector();
    Form.init('form', formMarkup);
    Form.build();
    load(false);
    return Form;
}





