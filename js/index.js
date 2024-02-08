// hero scroll effect
const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

sr.reveal('.hero-text', {delay:200, origin:'top'});
sr.reveal('.hero-img', {delay:450, origin:'top'});


document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c221a140097ad343c8b65f";
    document.getElementById("add-update-email").style.display = "none";
  
    document.getElementById("subscribe-submit").addEventListener("click", function (e) {
      // Prevent default action of the button
      e.preventDefault();
  
      let subscribeEmail = document.getElementById("subscribe-email").value;
  
      // Adapted from restdb API
      let jsondata = {
        "email": subscribeEmail
      };
  
      let settings = {
        method: "POST", // use post to send info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
          // Disable our button or show loading bar
          document.getElementById("subscribe-submit").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-subscribe-form").reset();
        }
      };
  
      // Send our AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://greenrecycling-1c59.restdb.io/rest/newsletter", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("subscribe-submit").disabled = false;
          // update frontend UI 
          document.getElementById("add-update-email").style.display = "block";
  
          // Remove this code if you want the message to stay visible until the user interacts with it
          setTimeout(function () {
            document.getElementById("add-update-email").style.display = "none";
            document.getElementById("add-subscribe-form").reset();
          }, 3000);
        });
    });
  });