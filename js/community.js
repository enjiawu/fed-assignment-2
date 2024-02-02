const addPostButton = document.getElementById("add-post-button"); //To get add post button
const addPostContainer = document.getElementById("add-post-container"); //To get add post container

addPostButton.addEventListener("click", function() { //To make the add new post form appear when the add new post button is clicked
    addPostButton.style.display = "none"; //Hide the add post button 
    addPostContainer.style.display = "flex"; //Display the add post form
});

document.getElementById("close-add-new-post").addEventListener("click", function(){
    addPostButton.style.display = "block"; //Dispaly the add post button
    addPostContainer.style.display = "none"; //Hide the add post form
    document.body.style.overflow = "auto"; // Set the overflow property of the body element to auto to restore scrolling
});

const postLikes = {}; // Store the likes count for each post
const likeButtons = document.querySelectorAll(".likes"); //Getting all the like buttons

likeButtons.forEach((button, index) => { 
    const postId = index + 1; //Use the index as the postId
    postLikes[postId] = 0; //Set the initial likes count for the post

    button.addEventListener("click", function() { //To see if the likes button has been clicked
        postLikes[postId]++; //Adding to the number of likes
        button.querySelector("span").textContent = postLikes[postId]; //Updating the number displayed
    });
});

//Allowing user to add posts
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65bcaa26383507023123fbae"; //Our api key
    getPost();
  
    document.getElementById("submit-post").addEventListener("click", function (e) { //hen user submits the form to add new post
        e.preventDefault(); //Prevent default action of the button 

        //Retrieving the form data
        let postTitle = document.getElementById("post-title").value;
        let postDescription = document.getElementById("post-description").value;
        let postLocation = document.getElementById("post-location").value;
        let postContact = document.getElementById("post-contact").value;
        let postStartDate = document.getElementById("post-start-date").value;
        let postEndDate = document.getElementById("post-end-date").value;
        let postImage = document.getElementById("post-image").value;
        let postLink = document.getElementById("join-now-link").value;
  
      //Getting form values
      let jsondata = {
        "title": postTitle,
        "description": postDescription,
        "location": postLocation,
        "email": postContact,
        "start-date": postStartDate,
        "end-date": postEndDate,
        "link": postLink,
        "image": postImage
      };
  
      //Creating ajax settings
      let settings = {
        method: "POST", //Use post to send info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
          // Disable our button or show loading bar
          document.getElementById("submit-button").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-new-post-form").reset();
        }
      }
  
      //Send AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://greenrecycling-8b3e.restdb.io/rest/post", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("submit-button").disabled = true;
          //document.getElementById("update-msg").style.display = "block";
          //setTimeout(function () {
          //  document.getElementById("add-update-msg").style.display = "none";
         // }, 3000);
          // Update our table 
          getPost();
        });
    });
  
    // Retrieving information of all posts
    function getContacts(all = true) {
  
      //Creating AJAX settings
      let settings = {
        method: "GET", //Used to get info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }
  
      //[STEP 8]: Make our AJAX calls
      // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
      // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
      fetch("https://greenrecycling-8b3e.restdb.io/rest/post", settings)
        .then(response => response.json())
        .then(response => {
          let content = "";
  
          for (var i = 0; i < response.length && i < limit; i++) {
            //console.log(response[i]);
            //[METHOD 1]
            // Let's run our loop and slowly append content
            // We can use the normal string append += method
            /*
            content += "<tr><td>" + response[i].name + "</td>" +
              "<td>" + response[i].email + "</td>" +
              "<td>" + response[i].message + "</td>
              "<td>Del</td><td>Update</td</tr>";
            */
  
            //[METHOD 2]
            // Using our template literal method using backticks
            // Take note that we can't use += for template literal strings
            // We use ${content} because -> content += content 
            // We want to add on previous content at the same time
            content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
            <td>${response[i].email}</td>
            <td>${response[i].message}</td>
            <td>${response[i].student_ID}</td>
            <td>${response[i].student_mentor}</td>
            <td>${response[i].student_class}</td>
            <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}'data-studentid='${response[i].student_ID}' data-studentmentor='${response[i].student_mentor}' data-studentclass='${response[i].student_class}'>Update</a></td></tr>`;
  
          }
  
          //[STEP 9]: Update our HTML content
          // Let's dump the content into our table body
          document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;
  
          document.getElementById("total-contacts").innerHTML = response.length;
        });
    }
  
    //[STEP 10]: Create our update listener
    // Here we tap onto our previous table when we click on update
    // This is a delegation feature of jQuery
    // Because our content is dynamic in nature, we listen in on the main container which is "#contact-list". For each row, we have a class .update to help us
    document.getElementById("contact-list").addEventListener("click", function (e) {
      if (e.target.classList.contains("update")) {
        e.preventDefault();
        // Update our update form values
        let contactName = e.target.getAttribute("data-name");
        let contactEmail = e.target.getAttribute("data-email");
        let contactMsg = e.target.getAttribute("data-msg");
        let contactId = e.target.getAttribute("data-id");
        let contactStudentid = e.target.getAttribute("data-studentid");
        let contactStudentMentor = e.target.getAttribute("data-studentmentor");
        let contactStudentClass = e.target.getAttribute("data-studentclass");
        console.log(e.target.getAttribute("data-msg"));
  
        //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
        document.getElementById("update-contact-name").value = contactName;
        document.getElementById("update-contact-email").value = contactEmail;
        document.getElementById("update-contact-msg").value = contactMsg;
        document.getElementById("update-contact-id").value = contactId;
        document.getElementById("update-contact-studentid").value = contactStudentid;
        document.getElementById("update-contact-studentmentor").value = contactStudentMentor;
        document.getElementById("update-contact-studentclass").value = contactStudentClass;
        document.getElementById("update-contact-container").style.display = "block";
      }
    });//end contact-list listener for update function
  
    //[STEP 12]: Here we load in our contact form data
    // Update form listener
    document.getElementById("update-contact-submit").addEventListener("click", function (e) {
      e.preventDefault();
      // Retrieve all my update form values
      let contactName = document.getElementById("update-contact-name").value;
      let contactEmail = document.getElementById("update-contact-email").value;
      let contactMsg = document.getElementById("update-contact-msg").value;
      let contactId = document.getElementById("update-contact-id").value;
      let contactStudentid = document.getElementById("update-contact-studentid").value;
      let contactStudentMentor = document.getElementById("update-contact-studentmentor").value;
      let contactStudentClass = document.getElementById("update-contact-studentclass").value;
  
      //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
      updateForm(contactId, contactName, contactEmail, contactMsg,contactStudentid,contactStudentMentor,contactStudentClass);
    });//end updatecontactform listener
  
    //[STEP 13]: Function that makes an AJAX call and processes it 
    // UPDATE Based on the ID chosen
    function updateForm(id, contactName, contactEmail, contactMsg,contactStudentid,contactStudentMentor,contactStudentClass) {
      //@TODO create validation methods for id etc. 
  
      var jsondata = { "name": contactName, "email": contactEmail, "message": contactMsg, "student_ID": contactStudentid, "student_mentor": contactStudentMentor, "student_class": contactStudentClass};
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
      fetch(`https://interactivedev-57dd.restdb.io/rest/contact/${id}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("update-contact-container").style.display = "none";
          // Update our contacts table
          getContacts();
        });
    }//end updateform function
  
  });
  
  
  const APIKEY = "6593ab1f3ea4be6084eb6ce2";
  
    document
      .getElementById("contact-list")
      .addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
          e.preventDefault();
          let contactId = e.target.getAttribute("data-id");
  
          // Show a confirmation dialog
          if (confirm("Are you sure you want to delete this contact?")) {
            // Call the delete function
            deleteContact(contactId);
          }
        }
      });
  
    function deleteContact(contactId) {
      console.log("Deleting contact with ID:", contactId);
      // Make an AJAX request to delete the contact
      fetch(`https://interactivedev-57dd.restdb.io/rest/contact/${contactId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      })
      .then(response => {
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return response.json();
      })
      .then(data => {
        console.log("Response data:", data);
        console.log(`Contact with ID ${contactId} deleted`);
        removeContactFromUI(contactId);
        getContacts();
      })
      .catch(error => {
        console.error("Error deleting contact:", error);
      });
    }
  
    function removeContactFromUI(contactId) {
      // Find the contact row and remove it from the UI
      let contactRow = document.getElementById(contactId);
      if (contactRow) {
        contactRow.remove();
      }
    }
  
