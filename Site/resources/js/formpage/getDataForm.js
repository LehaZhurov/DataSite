import { SendRequest } from "../AJAX";
import { load } from "../Load";

export function getFormData(form_uid) {
    load(true, 'Загрузка данных формы');
    let request = SendRequest('GET', 'api/getFormData/' + form_uid)
    return request;
}
