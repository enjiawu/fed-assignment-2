document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65c221a140097ad343c8b65f";
  document.getElementById("add-update-msg").style.display = "none";

  document.getElementById("contact-submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    let contactName = document.getElementById("contact-name").value;
    let contactEmail = document.getElementById("contact-email").value;
    let contactSubject = document.getElementById("contact-subject").value;
    let contactMessage = document.getElementById("contact-msg").value;

    // Adapted from restdb API
    let jsondata = {
      "name": contactName,
      "email": contactEmail,
      "subject": contactSubject,
      "message": contactMessage
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
        document.getElementById("contact-submit").disabled = true;
        // Clear our form using the form ID and triggering its reset feature
        document.getElementById("add-contact-form").reset();
      }
    }

    // Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://greenrecycling-1c59.restdb.io/rest/contact", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;
        // update frontend UI 
        document.getElementById("add-update-msg").style.display = "block";
        setTimeout(function () {
          document.getElementById("add-update-msg").style.display = "none";
          document.getElementById("add-contact-form").reset();
        }, 3000);
      });
  });//end click 
});