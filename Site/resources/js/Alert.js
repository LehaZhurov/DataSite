
export function Alert(text,type){
    let block = document.querySelector('#alertblock');
    let alert = document.createElement('div');
    if(type == 'error'){
        alert.setAttribute('class','alert alert-danger')
    }else if(type == 'success'){
        alert.setAttribute('class','alert alert-success')
    }else{
        alert.setAttribute('class','alert alert-warning')
    }
    alert.innerText = text;
    block.appendChild(alert);   
    setTimeout(function(){
        block.removeChild(alert);
    },6000)
}