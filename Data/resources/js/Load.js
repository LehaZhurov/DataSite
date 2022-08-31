export function load(start,text = 'Ожидайте') {
    let block = document.querySelector('body');
    if(start == true){
        let loadblock = document.createElement('div');
        loadblock.setAttribute('style',`
            position: absolute;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            background-color: white;
            flex-direction:column;
            height: `+window.innerHeight+`px;
            align-items: center;
        `);
    loadblock.setAttribute('id', 'loadblock');
    let spiner = document.createElement('div');
    spiner.setAttribute('class', 'spinner-border text-primary');
    loadblock.appendChild(spiner);
    let p = document.createElement('p');
    p.innerText = text;
    loadblock.appendChild(p);
    block.appendChild(loadblock);
    }else{
        let loadblock = document.querySelector('#loadblock');
        block.removeChild(loadblock);
    }
}