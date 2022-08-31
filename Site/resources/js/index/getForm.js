import { FormCollector } from "./FormCollector";
import { SendRequest } from "./AJAX";
import { Alert } from "./Alert";
import { load } from "./Load";

let form;
let formButton;

function getForms() {
    load(true);
    SendRequest('GET', 'http://localhost:82/api/getForms/')
        .then(data => buildFormsSelect(data))//Передаем сообщение от сервера
        .catch(err => console.log(err));
}


function getForm(form_uid) {
    load(true);
    SendRequest('GET', 'http://localhost:82/api/getForm/' + form_uid)
        .then(data => buildForm(data))//Передаем сообщение от сервера
        .catch(err => console.log(err));
}

window.onload = () => {
    getForms();
}

function buildFormsSelect(data) {
    let block = document.querySelector('#selectform')
    let select = document.createElement('select');
    select.setAttribute('class', 'form-select')
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.innerText = data[i].name;
        option.setAttribute('value', data[i].id);
        select.appendChild(option);
    }
    block.appendChild(select);
    select.addEventListener('change', function () {
        getForm(this.value);
    })
    
    load(false);
}

function buildForm(data) {
    if (typeof data['error'] != 'undefined') {
        Alert('Форма не найдена', 'error');
        return false;
    }
    let formMarkup = data;
    formMarkup.items = JSON.parse(data['items']);
    let Form = new FormCollector();
    Form.init('form', formMarkup);
    form = Form.build();
    formButton = Form.appendButton('Отправить', 'button', 'formbut', 'btn btn-primary');
    formButton.onclick = () => {
        saveData(form);
    }
    load(false);
}

function saveData(form) {
    let data = new FormData(form);
    console.log(data)
}



