// Navigation Menu
const body = document.querySelector("body")
const navbar = document.querySelector(".navigationbar")
const menuBtn = document.querySelector(".menu-btn")
const cancelBtn = document.querySelector(".cancel-btn")

// Show menu on button click
menuBtn.onclick = () => {
    navbar.classList.add("show");
    menuBtn.classList.add("hide");
    body.classList.add("disabled");
};

// Hide menu on cancel button click
cancelBtn.onclick = () => {
    body.classList.remove("disabled");
    navbar.classList.remove("show");
    menuBtn.classList.remove("hide");
}

// Change navbar style on scroll
window.onscroll = () => {
    // Check if the page has been scrolled more than 20 pixels
    this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
}

// login pop
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link')
const registerLink = document.querySelector('.register-link');
const popupBtn = document.querySelector('.login-btn-pop')
const iconClose = document.querySelector('.icon-close')

// Event listener for clicking on the Register link
registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('link-active');
})

// Event listener for clicking on the Login link
loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('link-active');
})

// Event listener for clicking on the Login button to show the popup
popupBtn.addEventListener('click', ()=> {
    wrapper.classList.add('pop-active');
})

// Event listener for clicking on the close icon to hide the popup
iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('pop-active');
})
