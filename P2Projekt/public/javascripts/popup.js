
if (sessionStorage.getItem('loadPopup') !== 'false') {
    document.addEventListener("DOMContentLoaded", () => {
    
        const popup = document.querySelector('.popup');
        const x = document.querySelector('.popup-content h1')

        window.addEventListener('load', () => {
            popup.classList.add('showPopup');
            popup.childNodes[1].classList.add('showPopup');
        })
        x.addEventListener('click', () => {
            popup.classList.remove('showPopup');
            popup.childNodes[1].classList.remove('showPopup');
        })
        sessionStorage.setItem('loadPopup', 'false');
    })
}

    
    
