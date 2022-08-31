
import {SendRequest} from '../AJAX';
import { Alert } from '../Alert';
export function saveData(form) {
    let formData = new FormData(form);
    SendRequest('POST', '/api/saveData',formData)
    .then(data => Alert('Данные сохранены','success'))
    .catch(err => Alert('ОЙ ОЙ что то пошло не так','error'))
}