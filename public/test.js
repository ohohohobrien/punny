window.onload = init;

function init() {
    document.addEventListener('selectionchange', selectableTextAreaMouseUp);
    addStyling();
}

function selectableTextAreaMouseUp(event) {
    const getSelection = window.getSelection();
    const selectedText = getSelection.toString().trim();
    console.log(getSelection.anchorNode.parentNode.id);
    console.log(getSelection.toString().trim());
}

function addStyling() {
    const startingRange = 8;
    const endingRange = 14;

    const initialString = "Why did Adelle cross the road? \n\nTo say hello from the other side.";
    console.log(initialString);
    const spanFirstPart = `<span class="text-white dark:text-yellow-400 font-bold">`;
    const spanSecondPart = `</span>`;
    const initialposition = startingRange;
    const secondaryPosition = endingRange;
    const output = [initialString.slice(0, initialposition), spanFirstPart, initialString.slice(initialposition, secondaryPosition),  spanSecondPart,  initialString.slice(secondaryPosition)].join('');
    console.log(output);

    console.log(`New starting range: ${startingRange + spanFirstPart.length}.`);
    console.log(`New ending range: ${endingRange + spanFirstPart.length + spanSecondPart.length}.`);

    console.log("\\n".length);
}