// ----------------------
// GLOBAL VARIABLES
// ----------------------
let fileInput = document.querySelector("#file-selector");
let submitFilesBtn = document.querySelector("#submit-files-button");
let blockLists = document.querySelectorAll(".block-list");
let modalBody = document.querySelector(".modal-body");
let modalTitle = document.querySelector(".modal-title");
let downloadButton = document.querySelector("#download-button");
let blockSizeTextField = document.querySelector("#block-size-text");
let downloadUrl = '/download_block/';

// ----------------------
// EVENT LISTENERS
// ----------------------
submitFilesBtn.addEventListener('click', evt => {
    if (noFilesSelected()) {
        displayErrorMessage("Select at least one file")
        evt.preventDefault();
    }

    if (!validBlockSize(blockSizeTextField.value)) {
        displayErrorMessage("Block size must be a positive integer")
        evt.preventDefault();
    }
});

blockLists.forEach(blockList => {
    blockList.addEventListener('click', evt => {
        if (evt.target.tagName === 'LI') {
            let title = evt.target.textContent;
            let content = evt.target.getAttribute('data-content');
            modalTitle.textContent = title;
            modalBody.textContent = content;

            if (evt.target.className === 'log-li') {
                downloadButton.style.display = '';
                downloadButton.href = '/download_block/' + modalTitle.textContent + '/';
            } else {
                downloadButton.style.display = 'none';
            }

            $('#main-modal').modal('show');
        }
    });
});

downloadButton.addEventListener('click', () => {
    let blockID = modalTitle.textContent;
    downloadBlock(blockID);
});

// ----------------------
// HELPER FUNCTIONS
// ----------------------
function noFilesSelected() {
    return fileInput.files.length <= 0;
}

function validBlockSize(blockSize) {
    return /^[1-9]\d*$/.test(blockSize) || blockSize === '';
}

function displayErrorMessage(message) {
    let errorSpan = document.querySelector(".error-message");
    errorSpan.textContent = message;
    errorSpan.style.display = 'inline';
}
