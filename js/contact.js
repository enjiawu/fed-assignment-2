document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65c221a140097ad343c8b65f";
  getContacts();
  document.getElementById("update-contact-container").style.display = "none";
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
        // Update our table 
        getContacts();
      });
  });//end click 


  // function to allow to retrieve all the information in your contacts
  function getContacts(limit = 10, all = true) {

    // Create AJAX settings
    let settings = {
      method: "GET", //[cher] we will use GET to retrieve info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    // Make AJAX calls
    fetch("https://greenrecycling-1c59.restdb.io/rest/contact", settings)
      .then(response => response.json())
      .then(response => {
        let content = "";

        for (var i = 0; i < response.length && i < limit; i++) {

          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].email}</td>
          <td>${response[i].subject}</td>
          <td>${response[i].message}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}' data-subject='${response[i].subject}'>Update</a></td></tr>`;

        }

        // Update HTML content
        document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;

        document.getElementById("total-contacts").innerHTML = response.length;
      });
  }

  // Create update listener
  document.getElementById("contact-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("update")) {
      e.preventDefault();
      // update form values
      let contactName = e.target.getAttribute("data-name");
      let contactEmail = e.target.getAttribute("data-email");
      let contactMsg = e.target.getAttribute("data-msg");
      let contactId = e.target.getAttribute("data-id");
      console.log(e.target.getAttribute("data-msg"));

      //Load in our data from the selected row and add it to our update contact form 
      document.getElementById("update-contact-name").value = contactName;
      document.getElementById("update-contact-email").value = contactEmail;
      document.getElementById("update-contact-msg").value = contactMsg;
      document.getElementById("update-contact-id").value = contactId;
      document.getElementById("update-contact-container").style.display = "block";
    }
  });//end contact-list listener for update function

  // load in our contact form data
  // Update form listener
  document.getElementById("update-contact-submit").addEventListener("click", function (e) {
    e.preventDefault();
    // Retrieve all my update form values
    let contactName = document.getElementById("update-contact-name").value;
    let contactEmail = document.getElementById("update-contact-email").value;
    let contactMsg = document.getElementById("update-contact-msg").value;
    let contactId = document.getElementById("update-contact-id").value;

    console.log(document.getElementById("update-contact-msg").value);
    console.log(contactMsg);

    //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
    updateForm(contactId, contactName, contactEmail, contactMsg);
  });//end updatecontactform listener

  //[STEP 13]: Function that makes an AJAX call and processes it 
  // UPDATE Based on the ID chosen
  function updateForm(id, contactName, contactEmail, contactMsg) {
    //@TODO create validation methods for id etc. 

    var jsondata = { "name": contactName, "email": contactEmail, "message": contactMsg };
    var settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata)
    }

    //[STEP 13a]: Send our AJAX request and hide the update contact form
    fetch(`https://greenrecycling-1c59.restdb.io/rest/contact/${id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("update-contact-container").style.display = "none";
        // Update our contacts table
        getContacts();
      });
  }//end updateform function

});