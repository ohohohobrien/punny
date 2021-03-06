window.onload = init;

function init() {

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

    // Get the input field
    const searchField = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");

    // Allow the input field to be used by pressing enter
    searchField.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (KeyboardEvent.keyCode === 13) {
            event.preventDefault();
            searchButton.click();
        } else if (event.keyCode === 13) {
            // keyCode is deprecated - therefore using both KeyboardEvent and event.keyCode
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            searchButton.click();
        }
    });

    searchButton.addEventListener('click', () => {
        const searchKeywords = searchField.value;
        alert(searchKeywords);
        window.location.href = './search.html';
    });
    
}