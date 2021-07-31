window.onload = init;

function init() {

    const darkToggle = document.getElementById('toggleB');
    darkToggle.addEventListener('input', () => {
        if (darkToggle.checked === true) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    })
    
}

