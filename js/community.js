const addPostButton = document.getElementById("add-post-button"); //To get add post button
const addPostContainer = document.getElementById("add-post-container"); //To get add post container

addPostButton.addEventListener("click", function() { //To make the add new post form appear when the add new post button is clicked
    addPostButton.style.display = "none"; //Hide the add post button 
    addPostContainer.style.display = "flex"; //Display the add post form
});

document.getElementById("close-add-new-post").addEventListener("click", function(){
    addPostButton.style.display = "block"; //Dispaly the add post button
    addPostContainer.style.display = "none"; //Hide the add post form
});

function lottieLoading(){ //Function for loading lottie for 3 seconds
    document.getElementById("loading-screen").style.display = "flex"; //Showing the lottie animation
    document.getElementsByTagName("body")[0].style.backgroundColor = "#061f37"; //Changing the background color 
    document.getElementsByTagName("main")[0].style.display = "none"; //Hiding the community content
    document.getElementsByTagName("footer")[0].style.display = "none"; //Hiding the footer
    document.getElementsByTagName("nav")[0].style.display = "none"; //Hiding the footer

    setTimeout(() => { //Change back after 3 seconds
        document.getElementById("loading-screen").style.display = "none"; //Hiding the lottie animation
        document.getElementsByTagName("body")[0].style.backgroundColor = "white"; //Changing background back to white
        document.getElementsByTagName("main")[0].style.display = "block"; //Showing the community content
        document.getElementsByTagName("footer")[0].style.display = "block"; //Showing the footer
        document.getElementsByTagName("nav")[0].style.display = "block"; //Showing the nav
    }, 3000);
}

//Allowing user to add posts
document.addEventListener("DOMContentLoaded", function () { //Make sure that the document is okay
    lottieLoading(); //Loading lottie animation

    const APIKEY = "65c2b0394405e18685db039c"; //Our api key
    getPosts();  //Call get posts function

    document.getElementById("submit-post").addEventListener("click", function (e) { //When user submits the form to add new post
      //Retrieving the form data
      let postTitle = document.getElementById("post-title").value;
      let postDescription = document.getElementById("post-description").value;
      let postLocation = document.getElementById("post-location").value;
      let postContact = document.getElementById("post-contact").value;
      let postStartDate = document.getElementById("post-start-date").value;
      let postEndDate = document.getElementById("post-end-date").value;
      let postLink = document.getElementById("join-now-link").value;
      let postUser = document.getElementById("post-organisation").value;

      if (postTitle === "" || postDescription === "" || postLocation === "" || postContact === "" || postStartDate === "" || postEndDate === "" || postLink === "" || postUser === "" || postDescription.length < 50) { //Make sure that every input is properly validated first
        alert("Please fill in all the fields"); //If not alert them 
        return; //Return so that it doesn't go to the rest of the function
      } 

      e.preventDefault(); //Prevent default action of the button 
      //Getting form values
      let jsondata = {
        "title": postTitle,
        "description": postDescription,
        "location": postLocation,
        "email": postContact,
        "startDate": postStartDate,
        "endDate": postEndDate,
        "link": postLink,
        "organisation": postUser
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
      }
  
      //Send AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://greenrecycling-9fab.restdb.io/rest/post", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          lottieLoading(); //Show lottie animation

          document.getElementById("add-new-post-form").reset(); //Resetting the form

          //Updating the UI
          addPostButton.style.display = "block"; //Dispaly the add post button
          addPostContainer.style.display = "none"; //Hide the add post form
          document.getElementById("add-post-msg").style.display = "block";  //Show the alert messsage that the post has been added


          setTimeout(function () {  //Hide alert message after 10 seconds
            document.getElementById("add-post-msg").style.display = "none";
          }, 10000);
          
          getPosts(); //Call get posts function
        });
    });
  
    // Retrieving information of all posts
    function getPosts(all = true) {
  
      //Creating AJAX settings
      let settings = {
        method: "GET", //Used to get info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }

      //Making AJAX calls to modify post content by creating the content internally and running the loop to continously add on data
      fetch("https://greenrecycling-9fab.restdb.io/rest/post", settings)
        .then(response => response.json())
        .then(response => {
            let content = "";
  
            for (var i = 0; i < response.length; i++) { //Iteraating through all the data fetched
                console.log(response[i]);
                
                // Convert the date to "yyyy-mm-dd" format
                const startDate = new Date(response[i].startDate).toDateString();
                const endDate = new Date(response[i].endDate).toDateString();

                //Adding all the post content into the content variable
                content = `${content} 
                <article class="card mb-3" id='${response[i]._id}'>
                    <div class="post-content">
                        <div class="post-body card-body">
                            <div class = "post-header d-flex flex-row">
                                <h2 class="post-title card-title">${response[i].title}</h2>
                                <div class="post-options dropdown">
                                    <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    &hellip;</button>
                                    <ul class="dropdown-menu">
                                        <li><a class="update dropdown-item" href="#update-post-container" data-id='${response[i]._id}' data-title='${response[i].title}' data-name = '${response[i].organisation}' data-description='${response[i].description}' data-location='${response[i].location}' data-email='${response[i].email}' data-start-date='${startDate}' data-end-date='${endDate}' data-link='${response[i].link}'>Edit</a></li>
                                        <li><a class="delete dropdown-item" data-id='${response[i]._id}' href="#">Delete</a></li>
                                    </ul>
                                </div> 
                            </div>

                            <div id = "user-info-container" class="d-flex flex-column">
                                <p class="user-name">${response[i].organisation}</p>
                                <p class="post-date"></p>
                            </div>

                            <p class="post-text card-text">${response[i].description}</p>

                            <div class = "post-details d-flex flex-column">
                                <p class = "location">Location: <span class = "post-location">${response[i].location}</span></p>
                                <p class = "dates">Dates: <span class = "post-dates">${startDate} - ${endDate}</span></p>
                                <p class = "contact">Contact: <span class = "post-contact">${response[i].email}</span></p>
                            </div>

                            <div class = "post-buttons d-flex flex-row ">
                                <a target=”_blank” href="${response[i].link}" class="join-button btn btn-primary">Join now</a>
                            </div>
                        </div>
                    </div>
                </article>`;
            }
                                    
            document.getElementById("post-container").innerHTML = content; //Dumping all the content into the post container so that it gets displayed neatly
        });
    }

    //Update listener
    document.getElementById("close-update-post").addEventListener("click", function (e) { //Function to check if user wants to close the update form
      e.preventDefault();
      // Hide the update form
      document.getElementById("update-post-container").style.display = "none";
    });

    document.getElementById("post-container").addEventListener("click", function (e) {
      if (e.target.classList.contains("update")) { //Check if user clicked on update button
        e.preventDefault(); //Prevent default action

        // Update our update form values
        let postTitle = e.target.getAttribute("data-title");
        let postDescription = e.target.getAttribute("data-description");
        let postLocation = e.target.getAttribute("data-location");
        let postContact = e.target.getAttribute("data-email");
        let postStartDate = e.target.getAttribute("data-start-date");
        let postEndDate = e.target.getAttribute("data-end-date");
        let postLink = e.target.getAttribute("data-link");
        let postUser = e.target.getAttribute("data-name");
        let postId = e.target.getAttribute("data-id");

        const startDate =  new Date(postStartDate).toISOString().split('T')[0];
        const endDate = new Date(postEndDate).toISOString().split('T')[0];

        console.log(e.target.getAttribute("data-id"));
  
        //Load post data into the update form
        document.getElementById("update-post-title").value = postTitle;
        document.getElementById("update-post-description").value = postDescription;
        document.getElementById("update-post-location").value = postLocation;
        document.getElementById("update-post-contact").value = postContact;
        document.getElementById("update-post-start-date").value = startDate;
        document.getElementById("update-post-end-date").value = endDate;
        document.getElementById("update-join-now-link").value = postLink;
        document.getElementById("update-post-organisation").value = postUser;
        document.getElementById("update-post-id").value = postId;
        document.getElementById("update-post-container").style.display = "block";
      }
    });
  
    //Loading in our update form data
    document.getElementById("update-post").addEventListener("click", function (e) {
        // Retrieve all my update form values
        let postTitle = document.getElementById("update-post-title").value;
        let postDescription = document.getElementById("update-post-description").value;
        let postLocation = document.getElementById("update-post-location").value;
        let postContact = document.getElementById("update-post-contact").value;
        let postStartDate = document.getElementById("update-post-start-date").value;
        let postEndDate = document.getElementById("update-post-end-date").value;
        let postLink = document.getElementById("update-join-now-link").value;
        let postUser = document.getElementById("update-post-organisation").value;
        let postId = document.getElementById("update-post-id").value;

        if (postTitle === "" || postDescription === "" || postLocation === "" || postContact === "" || postStartDate === "" || postEndDate === "" || postLink === "" || postUser === "") { //Making sure all the fields are filled up
          alert("Please fill in all the fields");
          return;
        }

        e.preventDefault(); //Prevent default action
        
        postStartDate = new Date(postStartDate).toISOString(); //Changing the date format to required one 
        postEndDate = new Date(postEndDate).toISOString();
        
        //Callling update form function which makes an AJAX call to our RESTDB to update the selected information
        updateForm(postId, postTitle, postUser, postDescription, postLocation, postContact, postStartDate, postEndDate, postLink);
    });
  
    //Updating based on the ID chosen
    function updateForm(postId, postTitle, postUser, postDescription, postLocation, postContact, postStartDate, postEndDate, postLink){

        var jsondata = { 
          "title": postTitle,
          "description": postDescription,
          "location": postLocation,
          "email": postContact,
          "startDate": postStartDate,
          "endDate": postEndDate,
          "link": postLink,
          "organisation": postUser
        };

        console.log(jsondata);

        var settings = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        }
  
      //Sending AJAX request and hide the update contact form
      fetch(`https://greenrecycling-9fab.restdb.io/rest/post/${postId}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          // Updating posts
          getPosts();

          document.getElementById("update-post-button").addEventListener("click", function (e) { //When update post button is clicked
            document.getElementById("update-post-container").style.display = "none"; //Hiding the post container
            lottieLoading(); //Loading lottie animation
            document.getElementById("update-msg").style.display = "block"; //Showing update alert

            setTimeout(function () { //Hiding alert after 10 seconds
              document.getElementById("update-msg").style.display = "none";
            }, 10000);
          });
        });
    }
  
  });
  
  
  //Deleting a post
  const APIKEY = "65c2b0394405e18685db039c";
  
    document.getElementById("post-container").addEventListener("click", function (e) { //Checking if post container delete button has been selected
        if (e.target.classList.contains("delete")) {
          e.preventDefault();
          let postId = e.target.getAttribute("data-id"); //Getting the post id
  
          // Show a confirmation dialog
          if (confirm("Are you sure you want to delete this contact?")) { //Confirmating message to ask if they really want to delete
            // Call the delete function
            deleteContact(postId); //If yes call deleteContact function
          }
        }
      });
  
    function deleteContact(postId) { //Function to delete post
      console.log("Deleting post with ID:", postId); 

      // Make an AJAX request to delete the contact
      fetch(`https://greenrecycling-9fab.restdb.io/rest/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      })
      .then(response => {
        console.log("Response status:", response.status);
  
        if (!response.ok) { //Throw error if got any problems
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return response.json();
      })

      .then(data => {
        console.log("Response data:", data);
        console.log(`Post with ID ${postId} deleted`);
        removePostFromUI(postId); //Remove the post from the UI
        getPosts(); //load all the posts again
      })
      .catch(error => {
        console.error("Error deleting post:", error);
      });
    }
  
    function removePostFromUI(postId) { //Function to remove post from UI
      let post = document.getElementById(postId); //Getting the post from the UI
      if (post) { //If post exists
        post.remove(); //Remove post
      }

      document.getElementById("delete-msg").style.display = "block"; //Show alert for successful deletion of post

      setTimeout(function () { //Hide alert after 5 seconds
        document.getElementById("delete-msg").style.display = "none";
      }, 5000);
    }
  
