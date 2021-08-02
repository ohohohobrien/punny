window.onload = init;

function init() {

    const reviewButtonGood = document.getElementById('reviewButtonGood');
    const reviewButtonOk = document.getElementById('reviewButtonOk');
    const reviewButtonBad = document.getElementById('reviewButtonBad');

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
    loadListenersForExplanationText();
}

function stopAnimateClass(button) {
    const reviewButtonGood = document.getElementById('reviewButtonGood');
    const reviewButtonOk = document.getElementById('reviewButtonOk');
    const reviewButtonBad = document.getElementById('reviewButtonBad');

    reviewButtonGood.classList.remove('animate-spin'); 
    reviewButtonGood.classList.add('hover:scale-125');  
    reviewButtonGood.classList.add('transform');
    reviewButtonGood.classList.add('transition');
    reviewButtonGood.classList.add('duration-500');
    reviewButtonGood.classList.add('text-shadow-lg');

    reviewButtonOk.classList.remove('animate-spin');
    reviewButtonOk.classList.add('hover:scale-125');
    reviewButtonOk.classList.add('transform');
    reviewButtonOk.classList.add('transition');
    reviewButtonOk.classList.add('duration-500');
    reviewButtonOk.classList.add('text-shadow-lg');

    reviewButtonBad.classList.remove('animate-spin');
    reviewButtonBad.classList.add('hover:scale-125');
    reviewButtonBad.classList.add('transform');
    reviewButtonBad.classList.add('transition');
    reviewButtonBad.classList.add('duration-500');
    reviewButtonBad.classList.add('text-shadow-lg');

    button.classList.remove('hover:scale-125'); 
    button.classList.remove('transform');
    button.classList.remove('transition');
    button.classList.remove('duration-500');
    button.classList.remove('text-shadow-lg');
    button.classList.add('animate-spin');
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