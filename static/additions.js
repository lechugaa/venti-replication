// ----------------------
// GLOBAL VARIABLES
// ----------------------
let fileInput = document.querySelector("#file-selector");
let fileList = document.querySelector("#file-list");
let archiveForm = document.querySelector("#files-form");
let archiveButton = document.querySelector("#archive-button");
let archiveURL = 'http://127.0.0.1:5000/archive/';

// ----------------------
// EVENT LISTENERS
// ----------------------
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
    postForm(archiveURL);
});

// ----------------------
// FETCH FUNCTIONS
// ----------------------
function postForm(url) {
    return fetch(url, {
        method: 'POST',
        body: new FormData(archiveForm)
    })
        .then(checkStatus)
        .then(res => res.json())
        .then(processArchiveResponse)
        .catch(error => console.log('Looks like there was a problem', error));
}

// ----------------------
// HELPER FUNCTIONS
// ----------------------
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function processArchiveResponse(fingerprintData) {
    let files = Object.keys(fingerprintData);
    files.forEach(file => {
        fingerprintData[file].forEach(fingerprint => {
            console.log(fingerprint);
        });
    })
}
