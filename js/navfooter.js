// Navigation Menu
const body = document.querySelector("body")
const navbar = document.querySelector(".navbar")
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
    this.scrollY > 20
    ? navbar.classList.add("sticky")
    : navbar.classList.remove("sticky");
}