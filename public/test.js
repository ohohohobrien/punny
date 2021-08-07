window.onload = init;

function init() {
    document.addEventListener('selectionchange', selectableTextAreaMouseUp);
}

function selectableTextAreaMouseUp(event) {
    const getSelection = window.getSelection();
    const selectedText = getSelection.toString().trim();
    console.log(getSelection.anchorNode.parentNode.id);
    console.log(getSelection.toString().trim());
}