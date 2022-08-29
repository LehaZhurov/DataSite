import {FormBuilder} from './FormBuilder';
let Builder = new FormBuilder();
function createContstructor(){
    Builder.init('constructor');
}

window.onload = () => {
    createContstructor();
};