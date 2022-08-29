export let FormBuilder = class {

    formData = { 'formId': '', 'items': [] };
    formName;
    formNameInputId = 'formname'
    constructorBlock;
    menuBlock;
    menuBlockId = 'menublock';
    formBlock;
    menuBlockFormId = 'fromblock';
    menuBlockForm;
    typeInput = ['input', 'select', 'textarea'];
    init(constructorBlockId) {
        this.constructorBlock = document.querySelector('#' + constructorBlockId);
        this.createInputnFormName();
        this.createBlocksControl();
    }

    createInputnFormName() {
        let formName = this.createInput(this.formNameInputId, 'Имя формы', this.formNameInputId, 'form-control');
        let label = this.createLabel('Название формы', this.formNameInputId);
        this.constructorBlock.appendChild(label);
        this.constructorBlock.appendChild(formName);
    }

    createBlocksControl() {
        //Добавление блока куда буду выводитс добавленые поля
        let head = this.createH('Ваша форма','head','h4')
        this.constructorBlock.appendChild(head);
        this.formBlock = document.createElement('div');
        this.formBlock.setAttribute('style', 'min-height:300px');
        this.formBlock.innerText = 'Выбирите внизу тип поля,введите имя и нажмите добавить'
        this.constructorBlock.appendChild(this.formBlock);
        this.generateCreatedMenu();
    }
    generateCreatedMenu(){
        if(typeof(this.menuBlock) != 'undefined'){
            this.menuBlock.innerHTML = ' ';
        }
        //Создание блока под меню
        this.menuBlock = document.createElement('div');
        this.menuBlock.setAttribute('id', this.menuBlockId);
        this.constructorBlock.appendChild(this.menuBlock);
        //Добаления загаловка меню
        let h = this.createH('Настройки поля', 'hsetings', 'h4');
        this.menuBlock.appendChild(h);
        //Создание формы под форму создания поля
        this.menuBlockForm = this.createForm(this.menuBlockFormId);
        this.menuBlock.appendChild(this.menuBlockForm);
        //Выбор типа поля
        let typeInput = this.createSelect('typeSelect', 'type', 'form-select');
        for (let i = 0; i < this.typeInput.length; i++) {
            let option = this.createOption(this.typeInput[i], this.typeInput[i]);
            typeInput.appendChild(option);

        }
        this.menuBlockForm.appendChild(typeInput);
        //Ввод названия поля
        let nameInput = this.createInput('itemFormName', 'Имя блока', 'ItemFromName', 'form-control');
        this.menuBlockForm.appendChild(nameInput);
        //Кнопка для добавления поля
        let but = this.createButton('Добавить', 'button', 'appendItemFrom', 'btn btn-info');
        but.onclick = () => {
            this.pushItemForm();
        }
        this.menuBlockForm.appendChild(but);
    }
    pushItemForm() {
        let form = this.menuBlockForm;
        form = new FormData(form);
        let type = form.get('type');
        let placeholder = form.get('itemFormName');
        if (placeholder.length <= 0) {
            return false;
        }
        let name = this.translitRuEn(placeholder);
        if (type == 'input' || type == 'textarea') {
            this.formData.items.push({
                'type': type, 'name': name,
                'placeholder': placeholder, 'num': this.formData.items.length
            });
        } else if (type == 'select') {
            this.formData.items.push({
                'type': type, 'name': name,
                'placeholder': placeholder, 'num': this.formData.items.length,
                'options': []
            });
        }
        this.build();
    }
    pushNewOption(form,selectNum) {
        form = new FormData(form);
        let optionValue = form.get('optionvalue');
        let optionText = form.get('optiontext');
        if(optionText.length == '' && optionValue.length == ''){
            return false;
        }
        for (let i = 0; i < this.formData.items.length; i++) {
            let item = this.formData.items[i];
            if (item.num == selectNum) {
                item.options.push({'value': optionValue,'text': optionText});
            }
        }
        this.build();
    }
    build() {
        this.formBlock.innerHTML = ' ';
        if (this.formData.items.length <= 0) {
            this.formBlock.innerText = 'Выбирите внизу тип поля,введите имя и нажмите добавить'
            return false;
        }
        for (let i = 0; i < this.formData.items.length; i++) {
            let item = this.formData.items[i];
            let block, label;
            let deleteBut = this.createA('Удалить','#','red');
            let editBut = this.createA('Редактировать','#','blue');
            label = this.createLabel(item.placeholder, item.name);
            label.setAttribute('title', 'Кликните чтоб отредактиовать,дважды чтоб удалить');
            label.appendChild(deleteBut)
            label.appendChild(editBut)
            deleteBut.ondblclick = () => {
                this.delete(item.num);
            }
            editBut.onclick = () => {
                this.edit(item.num);
            }
            this.formBlock.appendChild(label);
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
            if(item.type == 'select'){
                let optionForm = this.getFormCreateOption(item.num)
                this.formBlock.appendChild(optionForm);
            }
        }
    }
    delete(itemNum) {
        for (let i = 0; i < this.formData.items.length; i++) {
            let item = this.formData.items[i];
            if (item.num == itemNum) {
                delete this.formData.items[i];
                this.formData.items.length = this.formData.items.length - 1;
            }
        }
        console.log(this.formData);
        this.build();
    }
    edit(itemNum){
        let blockData;
        for (let i = 0; i < this.formData.items.length; i++) {
            let item = this.formData.items[i];
            if (item.num == itemNum) {
                blockData = item;
            }
        }
        this.generateEditMenu(blockData.placeholder,blockData.type,blockData.num)

    }
    saveEditItems(itemNum,form){
        form = new FormData(form);
        let type = form.get('type');
        let placeholder = form.get('itemFormName');
        let name = this.translitRuEn(placeholder);
        for (let i = 0; i < this.formData.items.length; i++) {
            let item = this.formData.items[i];
            if (item.num == itemNum) {
                if (type == 'input' || type == 'textarea') {
                    this.formData.items[i] = {
                        'type': type, 'name': name,
                        'placeholder': placeholder, 'num': this.formData.items.length
                    };
                } else if (type == 'select') {
                    this.formData.items[i] = {
                        'type': type, 'name': name,
                        'placeholder': placeholder, 'num': this.formData.items.length,
                        'options': []
                    };
                }
            }
        }
        this.generateCreatedMenu();
        this.build();
    }
    generateEditMenu(name,type,numItem){
        this.menuBlock.innerHTML = ' ';
        //Создание блока под меню
        this.menuBlock = document.createElement('div');
        this.menuBlock.setAttribute('id', this.menuBlockId);
        this.constructorBlock.appendChild(this.menuBlock);
        //Добаления загаловка меню
        let h = this.createH('Редактирование поля', 'hedit', 'h4');
        this.menuBlock.appendChild(h);
        //Создание формы под форму создания поля
        this.menuBlockForm = this.createForm(this.menuBlockFormId);
        this.menuBlock.appendChild(this.menuBlockForm);
        //Выбор типа поля
        let typeInput = this.createSelect('typeSelect', 'type', 'form-select');
        for (let i = 0; i < this.typeInput.length; i++) {
            let option = this.createOption(this.typeInput[i], this.typeInput[i]);
            if(type == this.typeInput[i]){
                option.setAttribute('selected', true);
            }
            typeInput.appendChild(option);
        }
        this.menuBlockForm.appendChild(typeInput);
        //Ввод названия поля
        let nameInput = this.createInput('itemFormName', 'Имя блока', 'ItemFromName', 'form-control');
        nameInput.setAttribute('value',name);
        this.menuBlockForm.appendChild(nameInput);
        //Кнопка для добавления поля
        let but = this.createButton('Сохранить', 'button', 'appendItemFrom', 'btn btn-info');
        this.menuBlockForm.appendChild(but);
        but.onclick = () =>{
            this.saveEditItems(numItem,this.menuBlockForm);
        }

    }

    getFormCreateOption(selectNum) {
        let div = document.createElement('div');
        let form = this.createForm('createdOption');
        form.setAttribute('style','width:70%');
        let optionText = this.createInput('optiontext', 'Текст option', 'optiontext', 'form-control form-control-sm');
        let optionValue = this.createInput('optionvalue', 'Value option', 'value', 'form-control form-control-sm');
        let button = this.createButton('Добавить', 'button', 'butCreatedOption','btn btn-info  btn-sm')
        form.appendChild(optionText);
        form.appendChild(optionValue);
        form.appendChild(button);
        button.onclick = () => {
            this.pushNewOption(form,selectNum);
        }
        div.appendChild(form);
        return div;
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

    translitRuEn(str) {
        var magic = function (lit) {
            var arrayLits = [
                ["а", "a"], ["б", "b"], ["в", "v"], ["г", "g"], ["д", "d"], ["е", "e"], ["ё", "yo"],
                ["ж", "zh"], ["з", "z"], ["и", "i"], ["й", "j"], ["к", "k"], ["л", "l"], ["м", "m"],
                ["н", "n"], ["о", "o"], ["п", "p"], ["р", "r"], ["с", "s"], ["т", "t"], ["у", "u"],
                ["ф", "f"], ["х", "h"], ["ц", "c"], ["ч", "ch"], ["ш", "w"], ["щ", "shh"], ["ъ", "''"],
                ["ы", "y"], ["ь", "'"], ["э", "e"], ["ю", "yu"], ["я", "ya"], ["А", "A"], ["Б", "B"],
                ["В", "V"], ["Г", "G"], ["Д", "D"], ["Е", "E"], ["Ё", "YO"], ["Ж", "ZH"], ["З", "Z"],
                ["И", "I"], ["Й", "J"], ["К", "K"], ["Л", "L"], ["М", "M"], ["Н", "N"], ["О", "O"],
                ["П", "P"], ["Р", "R"], ["С", "S"], ["Т", "T"], ["У", "U"], ["Ф", "F"], ["Х", "H"],
                ["Ц", "C"], ["Ч", "CH"], ["Ш", "W"], ["Щ", "SHH"], ["Ъ", ""], ["Ы", "Y"], ["Ь", ""],
                ["Э", "E"], ["Ю", "YU"], ["Я", "YA"], ["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"],
                ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["a", "a"],
                ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"], ["f", "f"], ["g", "g"], ["h", "h"],
                ["i", "i"], ["j", "j"], ["k", "k"], ["l", "l"], ["m", "m"], ["n", "n"], ["o", "o"],
                ["p", "p"], ["q", "q"], ["r", "r"], ["s", "s"], ["t", "t"], ["u", "u"], ["v", "v"],
                ["w", "w"], ["x", "x"], ["y", "y"], ["z", "z"], ["A", "A"], ["B", "B"], ["C", "C"],
                ["D", "D"], ["E", "E"], ["F", "F"], ["G", "G"], ["H", "H"], ["I", "I"], ["J", "J"],
                ["K", "K"], ["L", "L"], ["M", "M"], ["N", "N"], ["O", "O"], ["P", "P"], ["Q", "Q"],
                ["R", "R"], ["S", "S"], ["T", "T"], ["U", "U"], ["V", "V"], ["W", "W"], ["X", "X"],
                ["Y", "Y"], ["Z", "Z"]];
            var string = arrayLits.map(i => {
                if (i[0] === lit) {
                    return i[1]
                } else {
                    return undefined
                }
            }).filter(i => i != undefined);
            if (string.length > 0) {
                return string[0]
            }
            else {
                return "_"
            }
        };
        return Array.from(str).map(i => magic(i)).join("")
    }

}