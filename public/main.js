window.onload = init;

const urlOfPage = window.location.href;

function init() {

    const reviewButtonGood = document.getElementById('reviewButtonGood');
    const reviewButtonOk = document.getElementById('reviewButtonOk');
    const reviewButtonBad = document.getElementById('reviewButtonBad');

    const reviewButtonGoodValue = document.getElementById('reviewButtonGood-value');
    const reviewButtonOkValue = document.getElementById('reviewButtonOk-value');
    const reviewButtonBadValue = document.getElementById('reviewButtonBad-value');

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
    
    reviewButtonGood.addEventListener('click', () => {stopAnimateClass(reviewButtonGood)});
    reviewButtonOk.addEventListener('click', () => {stopAnimateClass(reviewButtonOk)});
    reviewButtonBad.addEventListener('click', () => {stopAnimateClass(reviewButtonBad)});
    
    reviewButtonGoodValue.addEventListener('animationend', (e) => {
        handleAnimationStateNumberChange(e.target);
    });

    reviewButtonOkValue.addEventListener('animationend', (e) => {
        handleAnimationStateNumberChange(e.target);
    });

    reviewButtonBadValue.addEventListener('animationend', (e) => {
        handleAnimationStateNumberChange(e.target);
    });
    
    loadListenersForExplanationText();

    setInitialNumberStyle();
}

function stopAnimateClass(button) {
    const reviewButtonGood = document.getElementById('reviewButtonGood');
    const reviewButtonOk = document.getElementById('reviewButtonOk');
    const reviewButtonBad = document.getElementById('reviewButtonBad');
    const reviewButtonGoodValue = document.getElementById('reviewButtonGood-value');
    const reviewButtonOkValue = document.getElementById('reviewButtonOk-value');
    const reviewButtonBadValue = document.getElementById('reviewButtonBad-value');

    const valueToUpdate = document.getElementById(`${button.id}-value`);
    const alreadyAnimating = button.classList.contains("animate-spin");

    // remove number if animating - GOOD BUTTON
    //if (reviewButtonGood.classList.contains('animate-spin')) reviewButtonGoodValue.innerHTML = (parseInt(reviewButtonGoodValue.innerHTML.toString()) - 1).toString();

    reviewButtonGood.classList.remove('animate-spin'); 
    reviewButtonGood.classList.add('hover:scale-125');  
    reviewButtonGood.classList.add('transform');
    reviewButtonGood.classList.add('transition');
    reviewButtonGood.classList.add('duration-500');
    reviewButtonGood.classList.add('text-shadow-lg');

    if (reviewButtonGoodValue.dataset.animationState === "3") reviewButtonGoodValue.classList.add('numberTextGoUpReverse');

    // remove number if animating
    //if (reviewButtonOk.classList.contains('animate-spin')) reviewButtonOkValue.innerHTML = (parseInt(reviewButtonOkValue.innerHTML.toString()) - 1).toString();

    reviewButtonOk.classList.remove('animate-spin');
    reviewButtonOk.classList.add('hover:scale-125');
    reviewButtonOk.classList.add('transform');
    reviewButtonOk.classList.add('transition');
    reviewButtonOk.classList.add('duration-500');
    reviewButtonOk.classList.add('text-shadow-lg');

    if (reviewButtonOkValue.dataset.animationState === "3") reviewButtonOkValue.classList.add('numberTextGoUpReverse');

    // remove number if animating
    //if (reviewButtonBad.classList.contains('animate-spin')) reviewButtonBadValue.innerHTML = (parseInt(reviewButtonBadValue.innerHTML.toString()) - 1).toString();

    reviewButtonBad.classList.remove('animate-spin');
    reviewButtonBad.classList.add('hover:scale-125');
    reviewButtonBad.classList.add('transform');
    reviewButtonBad.classList.add('transition');
    reviewButtonBad.classList.add('duration-500');
    reviewButtonBad.classList.add('text-shadow-lg');

    if (reviewButtonBadValue.dataset.animationState === "3") reviewButtonBadValue.classList.add('numberTextGoUpReverse');

    if (alreadyAnimating) {
        //console.log("does contain - stop animation");
        button.classList.remove('animate-spin'); 
        button.classList.add('hover:scale-125');  
        button.classList.add('transform');
        button.classList.add('transition');
        button.classList.add('duration-500');
        button.classList.add('text-shadow-lg');

        
        
    } else {
        //console.log("does not contain");
        button.classList.remove('hover:scale-125'); 
        button.classList.remove('transform');
        button.classList.remove('transition');
        button.classList.remove('duration-500');
        button.classList.remove('text-shadow-lg');
        button.classList.add('animate-spin');

        // animate the number increase

        valueToUpdate.dataset.animationState = "1";
        valueToUpdate.classList.add('numberTextGoDown');
        //console.log("commence animation");
    }

    
    if (reviewButtonGoodValue.dataset.animationState === "3") reviewButtonGoodValue.classList.add('numberTextGoUpReverse');
    if (reviewButtonOkValue.dataset.animationState === "3") reviewButtonOkValue.classList.add('numberTextGoUpReverse');
    if (reviewButtonBadValue.dataset.animationState === "3") reviewButtonBadValue.classList.add('numberTextGoUpReverse');
}

function handleAnimationStateNumberChange(element) {

    const animationState = element.dataset.animationState;

    if (animationState === "4") {
        //if (element.classList.contains('numberTextGoUp')) {
            element.classList.remove('numberTextGoDownReverse');
            //console.log("animationState4 finished");
            delete element.dataset.animationState;
            if (window.localStorage.getItem(urlOfPage) === element.id) {
                window.localStorage.removeItem(urlOfPage);
            }
        //}
    }

    if (animationState === "3") {
        element.innerHTML = (parseInt(element.innerHTML.toString()) - 1).toString();
        element.classList.add('numberTextGoDownReverse');
        element.dataset.animationState = "4";
        element.classList.remove('numberTextGoUpReverse');
        //console.log("animationState3 finished");
        element.classList.remove("text-blue-400", "font-bold");
    }

    if (animationState === "2") {
        //if (element.classList.contains('numberTextGoUp')) {
            element.classList.remove('numberTextGoUp');
            //console.log("animationState2 finished");
            element.dataset.animationState = "3";
            //delete element.dataset.animationState;
        //}
    }

    if (animationState === "1") {
        //if (element.classList.contains('numberTextGoDown')) {
            element.innerHTML = (parseInt(element.innerHTML.toString()) + 1).toString();
            element.classList.add('numberTextGoUp');
            element.dataset.animationState = "2";
            element.classList.remove('numberTextGoDown');
            //console.log("animationState1 finished");
            element.classList.add("text-blue-400", "font-bold");
            window.localStorage.setItem(urlOfPage, element.id);
        //}
    }

    //console.log("one animation ended");
}

function setInitialNumberStyle() {
    const buttonId = window.localStorage.getItem(urlOfPage);
    if (buttonId) {
        const buttonNumber = document.getElementById(buttonId);
        buttonNumber.classList.add("text-blue-400", "font-bold");
        buttonNumber.dataset.animationState = "3";
        const buttonString = buttonId.split("-");
        const buttonElement = document.getElementById(buttonString[0]);
        buttonElement.classList.remove('hover:scale-125'); 
        buttonElement.classList.remove('transform');
        buttonElement.classList.remove('transition');
        buttonElement.classList.remove('duration-500');
        buttonElement.classList.remove('text-shadow-lg');
        buttonElement.classList.add('animate-spin');
    }
}

// not finalised
function loadListenersForExplanationText() {

    // need some way to loop through explanation text

    document.getElementById('explanation-0-link').addEventListener('click', () => {
        scrollToTargetAdjusted('explanation-0')
    })

    document.getElementById('explanation-1-link').addEventListener('click', () => {
        scrollToTargetAdjusted('explanation-1')
    })

}

function scrollToTargetAdjusted(elementId){ 
    setTimeout(function() {
        const element = document.getElementById(`${elementId}`);
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;
    
        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    }, 300); 
}