// Page user interaction

let fileInput = document.querySelector("#file-selector");
let fileList = document.querySelector("#file-list");
let archiveForm = document.querySelector("#files-form");
let archiveButton = document.querySelector("#archive-button");
let archiveURL = 'http://127.0.0.1:5000/archive/';

// Event listeners
fileInput.addEventListener('change', evt => {

    fileList.innerHTML = "";
    let files = evt.target.files;

    for(let i = 0; i < files.length; i++) {
        let file = files[i];
        let item = document.createElement("li");
        item.textContent = file.name;
        fileList.appendChild(item);
    }
});

archiveButton.addEventListener('click', () => {
    fetch(archiveURL, {
        method: 'POST',
        body: new FormData(archiveForm)
    }).then(response => {
        console.log(response);
    });
});
