// hero scroll effect
const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

sr.reveal('.hero-text', {delay:200, origin:'top'});
sr.reveal('.hero-img', {delay:450, origin:'top'});

function lottieLoading(){
    document.getElementById("loading-screen").style.display = "flex"; //Showing the lottie animation
    document.getElementsByTagName("body")[0].style.backgroundColor = "#061f37"; //Changing the background color 
    document.getElementsByTagName("main")[0].style.display = "none"; //Hiding the quiz content

    setTimeout(() => { //Change back after 3 seconds
        document.getElementById("loading-screen").style.display = "none"; //Hiding the lottie animation
        document.getElementsByTagName("body")[0].style.backgroundColor = "white"; //Changing background back to white
        document.getElementsByTagName("main")[0].style.display = "flex"; //Showing the quiz content
    }, 3000);
}
