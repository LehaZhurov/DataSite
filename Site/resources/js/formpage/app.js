import '../bootstrap';
import { getForms, buildFormsSelect } from "../index/getForms";
import { load } from '../Load';
import { getFormData } from "./getDataForm";

window.onload = async () => {
    let formsList = await getForms();
    let select = buildFormsSelect('selectform', formsList);
    select.addEventListener('change', async function () {
        let result = await getFormData(this.value);
        if (result == false) {
            return false;
        }
        OutputData('table', result);
    })
}

function OutputData(blockId, data) {
    let block = document.querySelector('#' + blockId);
    block.innerHTML = ' ';
    OutputBody(block, data['data']);
    load(false);
}



function OutputBody(block, data) {
    if(data.length <= 0){
        block.innerText = 'Еще не кто не заполнял данную форму';
        return false;
    }
    for (let i = 0; i < data.length; i++) {
        let ul = document.createElement('ul');
        ul.setAttribute('class', 'list-group list-group-flush');
        let formData = JSON.parse(data[i]['data']);
        for (let j = 0; j < formData.length; j++) {
            let formDataItem = formData[j];
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item flex-fill');
            for(var key in formDataItem) {
                li.innerText = key + ':' + formDataItem[key];
            }
            ul.appendChild(li);
        }
        block.appendChild(ul);
    }
}