window.onload = init;

let pun = {
    "content": "",
    "explanation": {},
    "currentSelectedText": "",
    "startingRange": "",
    "endingRange": "",
};

let nextPageButtonEnabled = false;
let nextPageButton2Enabled = false;
let explanationIncrementer = 0;

const mobileDeviceDetected = isMobile();
console.log(mobileDeviceDetected);

function init() {

    const punTextarea = document.getElementById('punContent');
    const punTextareaDisplay = document.getElementById('punContentDisplay');
    const explanationInsertContainer = document.getElementById("punExplanationInsertContainer");

    punTextarea.addEventListener('input', () => {
        pun.content = punTextarea.value;
        punTextareaDisplay.innerHTML = pun.content;

        if (pun.content.length > 3) {
            enableNextButton();
            removeHelperForPun();
        } else {
            disableNextButton();
        }
    })

    punTextareaDisplay.addEventListener('mouseup', selectableTextAreaMouseUp);

    const nextButton = document.getElementById('nextButton');

    nextButton.addEventListener('click', () => {
        if (nextPageButtonEnabled) {
            alert('Next page!');
            explanationIncrementer = 0;
        } else {
            addHelperForPun();
        }
    });

    const nextButton2 = document.getElementById('nextButton2');
    const quoteButton = document.getElementById('quoteButton');

    quoteButton.addEventListener('click', () => {
        // testing
        console.log("pun.currentSelectedText shows:");
        console.log(pun.currentSelectedText);
        
        if (pun.currentSelectedText.length > 0) {
            explanationIncrementer += 1;
            explanationInsertContainer.append(createExplanationContainer(pun.currentSelectedText)); // send selected text as string
        }

        removeErrorDisplayForZeroExplainers();
        nextButton2.classList.add("opacity-40");
    });

    document.addEventListener("mousedown", documentMouseDown);

    const addExplanationButton = document.getElementById("addExplanationButton");

    addExplanationButton.addEventListener('click', () => {
        explanationIncrementer += 1;
        explanationInsertContainer.append(createExplanationContainer("")); // send a blank "" string
        removeErrorDisplayForZeroExplainers();
        nextButton2.classList.add("opacity-40");
    });
    
    nextButton2.addEventListener('click', () => {
        checkExplanationsCompleted();
        if (nextPageButton2Enabled === true) {
            alert("next page baby")
        }
    })

    enableDarkMode();
}

function documentMouseDown(event) {
    const quoteButton = document.getElementById('quoteButton');
    if (getComputedStyle(quoteButton).display === "block" && event.target.id !== "quoteButton") {
        setTimeout(() => {
            quoteButton.style.display = "none";
        }, 500);
        window.getSelection().empty();
    }
}

function selectableTextAreaMouseUp(event) {
    const quoteButton = document.getElementById('quoteButton');
    const getSelection = window.getSelection();
    const selectedText = getSelection.toString().trim();
    pun.currentSelectedText = selectedText;
    pun.startingRange = getSelection.anchorOffset;
    pun.endingRange = getSelection.focusOffset;
    if (mobileDeviceDetected) {
        setTimeout(() => {
            if (selectedText.length > 0) {
                console.log("touchscreen highlighting detected");
                quoteButton.style.display = "block";
                quoteButton.style.position = "static";
            }
        }, 0);
    } else {
        setTimeout(() => {
            if (selectedText.length > 0) {
                console.log("PC highlighting detected");
                quoteButton.style.display = "block";
                quoteButton.style.position = "absolute";
                const x = event.pageX;
                const y = event.pageY;
                const quoteButtonWidth = Number(getComputedStyle(quoteButton).width.slice(0, -2)); //"40px" - slice off px
                const quoteButtonHeight = Number(getComputedStyle(quoteButton).height.slice(0, -2)); //convert to number to use in calculation
                quoteButton.style.left = `${x - quoteButtonWidth*0.5}px`;
                quoteButton.style.top = `${y - quoteButtonHeight*1.5}px`;
            }
        }, 0);
    }
}

function enableNextButton() {
    const nextButton = document.getElementById('nextButton');
    nextButton.classList.remove('opacity-40');
    nextPageButtonEnabled = true;
}

function disableNextButton() {
    const nextButton = document.getElementById('nextButton');
    nextButton.classList.add('opacity-40');
    nextPageButtonEnabled = false;
}

function addHelperForPun() {
    const punContentDiv = document.getElementById('punContentDiv');
    punContentDiv.classList.add('border-red-700');
    punContentDiv.classList.add('border-2');

    const punContentHelper = document.getElementById('punContentHelper');
    punContentHelper.style.display = "block";
}

function removeHelperForPun() {
    const punContentDiv = document.getElementById('punContentDiv');
    punContentDiv.classList.remove('border-red-700');
    punContentDiv.classList.remove('border-2');

    const punContentHelper = document.getElementById('punContentHelper');
    punContentHelper.style.display = "none";
}

function enableDarkMode() {
    const darkToggle = document.getElementById('toggleB');
    darkToggle.addEventListener('input', () => {
        if (darkToggle.checked === true) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            document.getElementsByTagName('meta')["theme-color"].content = "#1F2937";
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            document.getElementsByTagName('meta')["theme-color"].content = "#FBBF24";
        }
    })

    // recommended Tailwind JS to control dark and light themes
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        darkToggle.checked = true;
        document.getElementsByTagName('meta')["theme-color"].content = "#1F2937";
    } else {
        document.documentElement.classList.remove('dark');
        darkToggle.checked = false;
        document.getElementsByTagName('meta')["theme-color"].content = "#FBBF24";
    }
}

// HTML Element Creation for explanation container
function createExplanationContainer(explanationString) {

    pun.explanation[`${explanationIncrementer}`] = {};

    const punExplanationDiv = document.createElement('div');
    punExplanationDiv.classList.add("px-2", "py-2", "mt-5", "md:px-10", "lg:px-20");
    punExplanationDiv.id = `punExplanationDiv-${explanationIncrementer}`;

    // text container
    const punDivInner = document.createElement('div');
    punDivInner.classList.add("bg-yellow-300", "dark:bg-gray-800", "px-5", "py-10", "rounded-sm", "rounded-br-none", "shadow-2xl");
    punDivInner.id = `punDivInner-${explanationIncrementer}`;
    punExplanationDiv.append(punDivInner);

    const punDivInnerHeader = document.createElement('h3');
    punDivInnerHeader.classList.add("text-2xl", "text-shadow-md", "mb-4");
    if (explanationString.length > 0) punDivInnerHeader.innerHTML = `Explanation ${explanationIncrementer} - ${explanationString}`
    else punDivInnerHeader.innerHTML = `Explanation ${explanationIncrementer}`;
    punDivInner.append(punDivInnerHeader);

    const punTextArea = document.createElement('textarea');
    punTextArea.classList.add("text-2xl", "text-shadow-md", "w-full", "min-h-0", "p-5", "resize-y", "rounded-sm", "bg-yellow-100", "dark:bg-gray-600", "dark:text-yellow-300", "focus:bg-yellow-200", "dark:hover:border-yellow-400", "dark:focus:bg-black-700", "transform", "ease-in-out", "duration-500");
    punTextArea.name = "punExplanation";
    punTextArea.cols = "3";
    punTextArea.rows = "3";
    punTextArea.placeholder = "Write your explanation here!";
    // set values required for the JSON
    if (explanationString.length > 0) {
        punTextArea.value = `${explanationString} - `;
        // set details for linking
        pun.explanation[`${explanationIncrementer}`].link = true;
        pun.explanation[`${explanationIncrementer}`].stringStartPosition = pun.startingRange;
        pun.explanation[`${explanationIncrementer}`].stringEndPosition = pun.endingRange;
    } else {
        punTextArea.value = explanationString;
        // set details to false for linking
        pun.explanation[`${explanationIncrementer}`].link = false;
        pun.explanation[`${explanationIncrementer}`].stringStartPosition = false;
        pun.explanation[`${explanationIncrementer}`].stringEndPosition = false;
    }
    pun.explanation[`${explanationIncrementer}`].id = `${explanationIncrementer}`;
    pun.explanation[`${explanationIncrementer}`].explanationContent = "";
    punTextArea.id = `punExplanationTextarea-${explanationIncrementer}`;
    punDivInner.append(punTextArea);
    
    // error text
    const explanationHelperText = document.createElement('span');
    explanationHelperText.classList.add("text-xs", "font-bold", "text-red-700")
    explanationHelperText.style.display = "none";
    explanationHelperText.id = `punExplanationHelper-${explanationIncrementer}`;
    explanationHelperText.innerHTML = "Please enter an explanation with more than 10 characters.";
    punDivInner.append(explanationHelperText);

    // attach listener to text area
    punTextArea.addEventListener("input", () => {
        pun.explanation[`${explanationIncrementer}`].explanationContent = punTextArea.value;
        enableNextButton2();
        if (punTextArea.value.length > 10) {
            explanationHelperText.style.display = "none";
            punDivInner.classList.remove('border-red-700');
            punDivInner.classList.remove('border-2');
        }
    });

    // button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add("flex", "justify-end");
    punExplanationDiv.append(buttonContainer);

    const buttonClose = document.createElement('button');
    buttonClose.style.zIndex = "10";
    buttonClose.classList.add("bg-yellow-300", "hover:bg-yellow-400", "dark:bg-gray-800", "dark:text-yellow-400", "dark:hover:bg-gray-900", "rounded-sm", "rounded-t-none", "shadow-2xl", "h-8", "w-12", "md:h-14", "md:w-24", "lg:h-16", "lg:w-32", "transform", "ease-in-out", "duration-500");
    buttonClose.ariaLabel = "remove explanation";
    buttonClose.id = `punExplanationButtonClose-${explanationIncrementer}`;
    buttonContainer.append(buttonClose);

    const buttonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    buttonSVG.classList.add("w-6", "h-6", "mx-auto");
    buttonSVG.setAttribute("fill", "none");
    buttonSVG.setAttribute("stroke", "currentColor");
    buttonSVG.setAttribute("viewBox", "0 0 24 24");
    buttonSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    buttonClose.append(buttonSVG);

    const buttonSVGPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    buttonSVGPath.setAttribute("stroke-linecap", "round");
    buttonSVGPath.setAttribute("stroke-linejoin", "round");
    buttonSVGPath.setAttribute("stroke-width", "2");
    buttonSVGPath.setAttribute("d", "M6 18L18 6M6 6l12 12");
    buttonSVG.append(buttonSVGPath);

    buttonClose.addEventListener('click', () => {
        
        // delete object data
        delete pun.explanation[`${explanationIncrementer}`];

        //modify next page button to disabled if all explanation containers removed
        if (Object.keys(pun.explanation).length === 0) {
            document.getElementById('nextButton2').classList.add('opacity-40');
        }

        punExplanationDiv.remove();
    });

    return punExplanationDiv;

    /* create the below element

        // note that to create SVG / path elements, createElementNS('http://www.w3.org/2000/svg','X') is required
    
        <div id="punExplanationDiv" class="px-2 py-2 mt-5 md:px-10 lg:px-20">
            <div class="bg-yellow-300 dark:bg-gray-800 px-5 py-10 rounded-sm rounded-br-none shadow-2xl">
                <h3 class="text-2xl text-shadow-md mb-4">Explanation 1:</h3>
                <textarea id="punExplanationContent-0" class="text-2xl text-shadow-md w-full min-h-0 p-5 resize-y rounded-sm bg-yellow-100 dark:bg-gray-600 dark:text-yellow-300 focus:bg-yellow-200 dark:hover:border-yellow-400 dark:focus:bg-black-700 transform ease-in-out duration-500" name="punExplanation" id="" cols="3" rows="3" placeholder="Write your explanation here!"></textarea>
            </div>
            <div class="flex justify-end">
                <button id="nextButton2" class="bg-yellow-300 hover:bg-yellow-400 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-900 rounded-sm rounded-t-none shadow-2xl h-8 w-12 md:h-14 md:w-24 lg:h-16 lg:w-32 transform ease-in-out duration-500" aria-label="remove explanation">
                    <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    
    */
}

function enableNextButton2() {

    const nextButton = document.getElementById('nextButton2');
    let nextButton2Enabled = true;

    for (const object in pun.explanation) {
        if (pun.explanation[object].explanationContent.length < 10) {
            nextButton2Enabled = false;
        }
    }

    nextPageButton2Enabled = nextButton2Enabled; // set global to local value

    if (nextPageButton2Enabled) {
        nextButton.classList.remove('opacity-40');
    } else {
        nextButton.classList.add('opacity-40');
    }
    
}

function checkExplanationsCompleted() {

    const nextButton = document.getElementById('nextButton2');
    let nextButton2Enabled = true;
    let scrollToIndex = false;
    let explanationContainersMoreThanZero = true;

    if (Object.keys(pun.explanation).length < 1) {
        nextButton2Enabled = false;
        explanationContainersMoreThanZero = false;
    }

    for (const object in pun.explanation) {
        if (pun.explanation[object].explanationContent.length < 10) {
            nextButton2Enabled = false;
            if (scrollToIndex === false) scrollToIndex = pun.explanation[object].id;

            // add the styling for error
            const errorDiv = document.getElementById(`punDivInner-${pun.explanation[object].id}`);
            errorDiv.classList.add('border-red-700');
            errorDiv.classList.add('border-2');

            const punContentHelper = document.getElementById(`punExplanationHelper-${pun.explanation[object].id}`);
            punContentHelper.style.display = "block";
        } 
    }

    if (nextButton2Enabled === false) {

        if (explanationContainersMoreThanZero) {
            // scroll to top most error
            console.log(`scrollToIndex is ${scrollToIndex}`);
            scrollToTargetAdjusted(`punExplanationTextarea-${scrollToIndex}`);
        } else {
            // enable the error for no explanations
            const punContentDisplayDiv = document.getElementById('punContentDisplayDiv');
            const explanationContentHelper = document.getElementById('explanationContentHelper');

            punContentDisplayDiv.classList.add('border-red-700');
            punContentDisplayDiv.classList.add('border-2');

            explanationContentHelper.style.display = "block";

            scrollToTargetAdjusted('punContentDisplayDiv');
        }
    }
    
    nextPageButton2Enabled = nextButton2Enabled; // set global to local value

    if (nextPageButton2Enabled) {
        nextButton.classList.remove('opacity-40');
    } else {
        nextButton.classList.add('opacity-40');
    }
}

function scrollToTargetAdjusted(elementId){ 
    setTimeout(function() {
        const element = document.getElementById(`${elementId}`);
        const offset = 200;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
    
        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    }, 0); 
}

function removeErrorDisplayForZeroExplainers() {
    const punContentDisplayDiv = document.getElementById('punContentDisplayDiv');
    const explanationContentHelper = document.getElementById('explanationContentHelper');

    punContentDisplayDiv.classList.remove('border-red-700');
    punContentDisplayDiv.classList.remove('border-2');

    explanationContentHelper.style.display = "none";
}

function isMobile() { return ('ontouchstart' in document.documentElement); }