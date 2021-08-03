window.onload = init;

let pun = {
    "content": "",
    "explanation": {},
};

let nextPageButtonEnabled = false;

function init() {


    const punTextarea = document.getElementById('punContent');

    punTextarea.addEventListener('input', () => {
        pun.content = punTextarea.value;

        if (pun.content.length > 3) {
            enableNextButton();
            removeHelperForPun();
        } else {
            disableNextButton();
        }
    })

    const nextButton = document.getElementById('nextButton');

    nextButton.addEventListener('click', () => {
        if (nextPageButtonEnabled) {
            alert('Next page!');
        } else {
            addHelperForPun();
        }
    })

    enableDarkMode();
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