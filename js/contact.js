// Execute code after the DOM content has loaded
document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65c221a140097ad343c8b65f"; // Replace APIKEY with your actual API key
  // Add event listener to the contact submit button
  document.getElementById("contact-submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    // Get values from the contact form inputs
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

    // AJAX request settings
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
        // Re-enable the contact submit button
        document.getElementById("contact-submit").disabled = false;
        // Display the contact update message
        document.getElementById("add-update-contact").style.display = "block";
        //Remove this code if you want the message to stay visible until the user interacts with it
        setTimeout(function () {
          document.getElementById("add-update-contact").style.display = "none";
          document.getElementById("add-contact-form").reset();
        }, 3000);
      });
  });//end click 
});