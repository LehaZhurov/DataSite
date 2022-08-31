import '../bootstrap';
import { getForms , buildFormsSelect} from "./getForms";
import {getForm,buildForm} from "./getForm";
import {saveData} from './SaveData';
window.onload = async () => {
    let formsList = await getForms();  
    let select = buildFormsSelect('selectform',formsList);
    let formMap;
    select.addEventListener('change', async function () {
        formMap = await getForm(this.value);
        if(formMap == false){
            return false;
        }
        let form = buildForm(formMap);
        let formButton = form.appendButton('Отправить', 'button', 'formbut', 'btn btn-primary');
        formButton.onclick = () => {
            saveData(form.formBlock);
        }
    }) 
    
}