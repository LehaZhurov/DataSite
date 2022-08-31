import { load } from '../Load';
import { SendRequest } from '../AJAX';
export function getForms() {
    load(true,'Загрузка списка форм');
    let request = SendRequest('GET', 'api/getForms/')
    return request;
}
export function buildFormsSelect(blockId,data) {
    let block = document.querySelector('#'+blockId);
    let select = document.createElement('select');
    select.setAttribute('class', 'form-select')
    let option = document.createElement('option');
    option.innerText = 'Выбирите форму';
    select.appendChild(option);
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.innerText = data[i].name;
        option.setAttribute('value', data[i].id);
        select.appendChild(option);
    }
    block.appendChild(select);
    load(false);
    return select;
}