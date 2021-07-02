let inputImage = document.getElementById('inputImage');
let image = document.getElementById('image');
let username = document.getElementById('name');
let slogan = document.getElementById('sologan');
let form = document.getElementById('form');

let validUsername = (username) => {
    if (username.trim().length < 6) return false;
    return true;
}
let validSlogan = (slogan) => {
    if (slogan.trim().length < 6) return false;
    return true;
}
let validImage = (image) => {
    if (image.trim().length === 0) return false;
    return true;
}

inputImage.onchange = (e) => {
    image.src = URL.createObjectURL(e.target.files[0]);
}

form.onsubmit = (e) => {
    let isCorrect = true;
    if (!validUsername(username.value)){
        isCorrect = false;
        username.nextElementSibling.classList.add('d-block');
    }else{
        username.nextElementSibling.classList.remove('d-block');
    }
    if (!validSlogan(slogan.value)){
        isCorrect = false;
        slogan.nextElementSibling.classList.add('d-block');
    }else{
        slogan.nextElementSibling.classList.remove('d-block');
    }
    if (!validImage(inputImage.value)){
        isCorrect = false;
        inputImage.parentElement.nextElementSibling.classList.add('d-block');
    }else{
        inputImage.parentElement.nextElementSibling.classList.remove('d-block');
    }
    if (!isCorrect) e.preventDefault();
}

