// ----------------------
// GLOBAL VARIABLES
// ----------------------
let fileInput = document.querySelector("#file-selector");
let submitFilesBtn = document.querySelector("#submit-files-button");
let blockLists = document.querySelectorAll(".block-list");

// ----------------------
// EVENT LISTENERS
// ----------------------
submitFilesBtn.addEventListener('click', evt => {
    if (noFilesSelected()) {
        evt.preventDefault();
    }
});

blockLists.forEach(blockList => {
    blockList.addEventListener('click', evt => {
        if (evt.target.tagName === 'LI') {
            console.log(evt.target.getAttribute('data-content'));
        }
    });
});

// ----------------------
// FETCH FUNCTIONS
// ----------------------

// ----------------------
// HELPER FUNCTIONS
// ----------------------
function noFilesSelected() {
    return fileInput.files.length <= 0;
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
