let image = document.querySelector('#image');
let inputImage = document.querySelector('#inputImage');
let title = document.querySelector('#title');
let content = document.querySelector('#content');
let submitBtn = document.querySelector('#submit-btn');
let fakeTag = document.querySelector('#fakeTag');
let inputTag = document.querySelector('#tag');
let tags = document.querySelectorAll('.tag');
let form = document.querySelector('form');

let addContentImg = document.querySelector('#content-image');
let uil = document.querySelector('#url');
let btnAddImg = document.querySelector('#add-image');

let addParagraph = document.querySelector('#content-p');
let paragraph = document.querySelector('#paragraph');
let btnAddParagraph = document.querySelector('#add-paragraph');

let editor = document.querySelector('#editor');
addParagraph.onclick = (e) => {
	if (paragraph.classList.value.includes('d-block')){
		paragraph.classList.remove('d-block');
		btnAddParagraph.classList.remove('d-block');
	}else{
		paragraph.classList.add('d-block');
		btnAddParagraph.classList.add('d-block');
		uil.classList.remove('d-block');
		btnAddImg.classList.remove('d-block');
	}
}
addContentImg.onclick = (e) => {
	if (uil.classList.value.includes('d-block')){
		uil.classList.remove('d-block');
		btnAddImg.classList.remove('d-block');
	}else{
		uil.classList.add('d-block');
		btnAddImg.classList.add('d-block');
		
		paragraph.classList.remove('d-block');
		btnAddParagraph.classList.remove('d-block');
	}
}
btnAddImg.onclick = () => {
	content.value += `<p><img src="${uil.value}" class="img-fluid"></p>`;
	editor.innerHTML += `<p><img src="${uil.value}"></p>`;
	uil.value = '';
}
btnAddParagraph.onclick = () => {
	content.value += `<p>${paragraph.value}</p>`;
	editor.innerHTML += `<p>${paragraph.value}</p>`;
	paragraph.value = '';
}
inputImage.onchange = (e) => {
    let src = URL.createObjectURL(e.target.files[0]);
    image.src = src;
}

function getTag(e) {
    fakeTag.value += e.innerText + ', ';
    inputTag.value = fakeTag.value.split(', ').slice(0, fakeTag.value.split(', ').length - 1);
}

function validImage(image) {
    if (image.trim().length == 0) return false;
    return true;
}

function validTitle(title) {
    if (title.trim().length < 20) return false;
    return true;
}

function validContent(content) {
    if (content.trim().length < 100) return false;
    return true;
}

function validTag(tag) {
    if (tag.split(',').length < 1) return false;
    return true;
}
submitBtn.onclick = (e) => {
    if (!validImage(inputImage.value)) {
        inputImage.parentElement.nextElementSibling.classList.add('d-block');
        inputImage.parentElement.nextElementSibling.classList.remove('d-none');
        e.preventDefault();
    } else {
        inputImage.parentElement.nextElementSibling.classList.add('d-none');
        inputImage.parentElement.nextElementSibling.classList.remove('d-block');
    }
    if (!validTitle(title.value)) {
        title.nextElementSibling.classList.add('d-block');
        title.nextElementSibling.classList.remove('d-none');
        e.preventDefault();
    } else {
        title.nextElementSibling.classList.add('d-none');
        title.nextElementSibling.classList.remove('d-block');
    }
    if (!validContent(content.value)) {
        content.nextElementSibling.classList.add('d-block');
        content.nextElementSibling.classList.remove('d-none');
        e.preventDefault();
    } else {
        content.nextElementSibling.classList.add('d-none');
        content.nextElementSibling.classList.remove('d-block');
    }
    if (!validTag(inputTag.value)) {
        inputTag.nextElementSibling.classList.add('d-block');
        inputTag.nextElementSibling.classList.remove('d-none');
        e.preventDefault();
    } else {
        inputTag.nextElementSibling.classList.add('d-none');
        inputTag.nextElementSibling.classList.remove('d-block');
    }
}