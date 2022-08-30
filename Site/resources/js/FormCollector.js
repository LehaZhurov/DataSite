export let FormCollector = class {

    block;
    formBlock;
    //formBlockId - судя будет выводится форма
    //form - массив с данными формы полученые с сервера
    init(formBlockId,formMarkup) {
        this.block = document.querySelector('#' + formBlockId);
        this.block.innerHTML = ' ';
        this.formMarkup = formMarkup;
    }
    
    

    
    build(action = '#') {
        this.formBlock = this.createForm(form.form_uid,action);
        let formName = this.createH(this.formMarkup.formName,'h3');
        this.formBlock.appendChild(formName);
        for (let i = 0; i < this.formMarkup.items.length; i++) {
            let item = this.formMarkup.items[i];
            let idInput = this.createInput('form_uid','id формы','form_uid','d-none');
            this.formBlock.appendChild(idInput);
            let label = this.createLabel(item.placeholder, item.name);
            this.formBlock.appendChild(label);
            let block;
            if (item.type == 'input') {
                block = this.createInput(item.name, item.placeholder, item.name, 'form-control');
            } else if (item.type == 'textarea') {
                block = this.createTextarea(item.name, item.placeholder, item.name, 'form-control');
            } else if (item.type == 'select') {
                block = this.createSelect(item.name, item.name, 'form-select');
                for (let i = 0; i < item.options.length; i++) {
                    let option = this.createOption(item.options[i].text, item.options[i].value);
                    block.appendChild(option);
                }
            }
            this.formBlock.appendChild(block);
            this.block.appendChild(this.formBlock);
        }
        return this.formBlock;
    }
    appendButton(text,type,id,classes = ''){
        let but = this.createButton(text,type,id,classes);
        this.formBlock.appendChild(but);
        return but;
    }
   
    createA(text,url,color){
        let a = document.createElement('a');
        a.setAttribute('href',url);
        color = 'color:'+color;
        a.setAttribute('style',color);
        a.innerText = text;
        return a;
    }
    createLabel(text, myfor) {
        let label = document.createElement('label');
        label.setAttribute('for', myfor);
        label.innerHTML = text;
        return label;
    }
    createButton(text, type, id, classes) {
        let but = document.createElement('button');
        but.setAttribute('id', id);
        but.setAttribute('class', classes)
        but.setAttribute('type', type);
        but.innerText = text;
        return but;
    }
    createTextarea(name, placeholder, id, classes) {
        let textarea = document.createElement('textarea');
        textarea.setAttribute('name', name);
        textarea.setAttribute('class', classes);
        textarea.setAttribute('id', id);
        textarea.setAttribute('placeholder', placeholder);
        return textarea;
    }
    createInput(name, placeholder, id, classes) {
        let input = document.createElement('input');
        input.setAttribute('name', name);
        input.setAttribute('class', classes);
        input.setAttribute('id', id);
        input.setAttribute('placeholder', placeholder);
        return input;
    }
    createOption(text, value, classes = '') {
        let option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = text;
        option.setAttribute('class', classes)
        return option;
    }
    createSelect(id, name, classes = '') {
        let select = document.createElement('select');
        select.setAttribute('id', id);
        select.setAttribute('name', name);
        select.setAttribute('class', classes);
        return select;
    }
    createForm(id, action = '#') {
        let form = document.createElement('form');
        form.setAttribute('id', id);
        form.setAttribute('action', action);
        return form;
    }
    createH(text, id, type = 'h1', classes = '') {
        let h = document.createElement(type);
        h.setAttribute('id', id);
        h.innerText = text;
        h.setAttribute('class', classes);
        return h;
    }

    
}