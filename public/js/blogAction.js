const buttonAction = document.getElementsByClassName('action');
for (let i = 0;i < buttonAction.length;i++){
    buttonAction[i].onclick = (e) => {
        e.stopPropagation();
    }
}