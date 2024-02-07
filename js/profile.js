//Function for lottie
function lottieLoading(){ //Function for loading lottie for 3 seconds
  document.getElementById("loading-screen").style.display = "flex"; //Showing the lottie animation
  document.getElementsByTagName("body")[0].style.backgroundColor = "#061f37"; //Changing the background color 
  document.getElementsByTagName("main")[0].style.display = "none"; //Hiding the community content

  setTimeout(() => { //Change back after 3 seconds
      document.getElementById("loading-screen").style.display = "none"; //Hiding the lottie animation
      document.getElementsByTagName("body")[0].style.backgroundColor = "white"; //Changing background back to white
      document.getElementsByTagName("main")[0].style.display = "block"; //Showing the community content
  }, 5000);
}

//API keys and links 
const profileUrl = 'https://greenrecycling-9fab.restdb.io/rest/profile';
const historyUrl = 'https://greenrecycling-9fab.restdb.io/rest/history';
const userdataUrl = 'https://greenrecycling-9fab.restdb.io/rest/userdata';
const APIKEY = "65c2b0394405e18685db039c";
var profileID = "";
var userID = '65c2bffe249f9627000044b3';
var userData = {};

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("index.html")) {
    getUsers();
    document.getElementById("add-update-msg").style.display = "none";

    document.getElementById("register-submit").addEventListener("click", function (e) {

      let registerName = document.getElementById("register-name").value;
      let registerEmail = document.getElementById("register-email").value;
      let registerPassword = document.getElementById("register-password").value;
 
      if (registerName === "" || registerEmail === "" || registerPassword === "") { //Making sure all the fields are filled up
        alert("Please fill in all the fields");
        return;
      }

      // Prevent default action of the button 
      e.preventDefault();

      // Adapted from restdb API
      let jsondata = {
        "name": registerName,
        "email": registerEmail,
        "password": registerPassword
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
          document.getElementById("register-submit").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-register-form").reset();
        }
      }

      // Send our AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://greenrecycling-9fab.restdb.io/rest/userdata", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("register-submit").disabled = false;
          // update frontend UI 
          document.getElementById("add-update-msg").style.display = "block";
          setTimeout(function () {
            document.getElementById("add-update-msg").style.display = "none";
            document.getElementById("add-register-form").reset();
          }, 3000);
          // Update our table 
          getUsers();
        });
    });//end click 
  
  
    // function to allow to retrieve all the information in your contacts
    function getUsers(limit = 10, all = true) {

      // Create AJAX settings
      let settings = {
        method: "GET", // use GET to retrieve info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }
    }

    function loginUser(event) {
      // Get user input (assuming you have input elements with IDs)
      const loginEmail = document.getElementById('login-email').value;
      const loginPassword = document.getElementById('login-password').value;

      
      if (loginEmail === "" || loginPassword === "") { //Making sure all the fields are filled up
        alert("Please fill in all the fields");
        return;
      }
      event.preventDefault(); // Prevent default form submission

      // Send data to server using HTTPS
      fetch(userdataUrl, {
        methods: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
            "email": loginEmail,
            "password": loginPassword
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success){
            const successPopup = document.getElementById('login-success');
            successPopup.style.display = 'block';
        }
        else{
            const successPopup = document.getElementById('login-success');
            successPopup.style.display = 'block';
        }
      })
      .catch(error => {
        document.getElementById("login-success").style.display = "block";
          setTimeout(function () {
            document.getElementById("login-success").style.display = "none";
          }, 3000);
        console.error('Error:', error);

        // Handle errors, e.g., display an error message to the user
      });
    }

    // Use an event listener for the button click instead of onclick attribute
    document.getElementById("login-button").addEventListener("click", loginUser);

    function loginUser(event) {
      event.preventDefault();

      const loginEmail = document.getElementById('login-email').value;
      const loginPassword = document.getElementById('login-password').value;


      // Send hashed password to server using HTTPS
      fetch('https://greenrecycling-9fab.restdb.io/rest/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          // Handle successful login (store token, redirect, etc.)
          handleSuccessfulLogin(data);
        } else {
          // Handle failed login (display specific error message)
          handleError(data.error || 'Login failed.');
        }
      })
      .catch(error => {
        handleError('An error occurred. Please try again later.');
        console.error('Error:', error);
      });
    }

    function handleSuccessfulLogin(data) {
      // Store token securely, redirect, display success message
      storeToken(data.token); // Replace with secure storage
      // Show the success message or any other logic you want to perform
      document.getElementById("login-success").style.display = "block";
    }

    function handleError(message) {
      // Display informative error message based on error code/message
      displayError(message);
    }

    function displayError(message) {
      // Implement user-friendly error display (e.g., inline messages, alerts)
      console.error(message);
      // Show the error message in a popup or other UI element
      alert(message);
    }

    function storeToken(token) {
      // Implement secure token storage using HttpOnly cookies or other techniques
      localStorage.setItem('token', token); // Not recommended for production!
    }
  }

  //For profile page
  if (window.location.pathname.includes("profile.html")) {

    var username = document.getElementById("username"); //Getting the username from html
    var description = document.getElementById("description"); //Getting the description from html
    var level = document.getElementById("player-level"); //Getting the level from html
    var currentXp = document.getElementById("current-xp"); //Getting the current xp from html
    var maxXp = document.getElementById("max-xp"); //Getting the max xp from html
    var xpTrackerInner = document.getElementById("xp-tracker-inner"); //Getting the xp tracker inner from html

    lottieLoading(); //Showing the lottie animation while the page loads

    document.getElementById("cancel-button").addEventListener("click", function (e) { //Function to check if user clicked on cancel button
      if (confirm("Are you sure you want to cancel?")) {
        e.preventDefault();

        document.getElementById("description-container").style.display = "flex"; //Showing the description container
        document.getElementById("edit-description-container").style.display = "none"; //Hiding the edit description container
      } 
    });
    
    
    const settings = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    };
    
    getInfo(); //Calling the getInfo function to get the user data
    
    function getInfo(){
      //fetching of data for the profile page
      fetch(userdataUrl, settings)
      .then(response => response.json())
      .then(response => {
        console.log(response);
    
        fetch(profileUrl, settings)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
              if (response[i].user[0]._id == userID) {
                profileID = response[i]._id;
                username.innerHTML = response[i].user[0].name;
                description.innerHTML = response[i].description;
                level.innerHTML = response[i].level;
                currentXp.innerHTML = response[i].xp;
                maxXp.innerHTML = level.innerHTML * 1000;

                userData = {
                  "id": response[i].user[0]._id,
                  "name": response[i].user[0].name,
                  "password": response[i].user[0].password,
                  "email": response[i].user[0].email,
                }
    
                xpTrackerInner.style.width = (currentXp.innerHTML/maxXp.innerHTML)*100 + "%";
              }
            }
        });

        fetch(historyUrl, settings)
        .then(response => response.json())
        .then(response => {
          let content = "";
    
          for (var i = 0; i < response.length; i++) {
            if (response[i].user[0]._id == userID) {
              content = `${content}
              <div id = ${response[i]._id}>
              <div id = "history-data">
                <div id = "history-container" class = "d-flex flex-row">
                  <div id = "quiz-details">
                    <h3 id = "title">${response[i].title}</h3>
                    <p id = "details">${response[i].description}</p>
                  </div>
                  <p id = "xp-earned">+ ${response[i].xp} xp</p>
                </div>
              </div>
            </div>`;
            }
          }

          document.getElementById("history-containers").innerHTML = content;
        });
      });
    }
    
    document.getElementById("edit-description-button").addEventListener("click", function (e) { //Function to check if user clicked on edit description button
      document.getElementById("description-container").style.display = "none"; //Hiding the description container
      document.getElementById("edit-description-container").style.display = "flex"; //Showing the edit description container
    
      document.getElementById("edit-description").value = document.getElementById("description").innerHTML; //Setting the value of the edit description to the description value
    });
    
    document.getElementById("save-description-button").addEventListener("click", function (e) { //Function to check if user clicked on save button
      let desc = document.getElementById("edit-description").value; //Setting the value of the description to the edited description value

      e.preventDefault(); //Prevent default action

      updateDesc(desc); //Calling the updateDesc function to update the description in the database
    });
    
    function updateDesc(desc) {
      var jsondata = { "description": desc };
      var settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata)
      }
    
      fetch(`${profileUrl}/${profileID}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(document.getElementById("edit-description").value);
          description.innerHTML = document.getElementById("edit-description").value;

          //Updating display
          document.getElementById("description-container").style.display = "flex"; //Showing the description container
          document.getElementById("edit-description-container").style.display = "none"; //Hiding the edit description container

          getInfo(); //Calling the getInfo function to get the user data
      });
    }
  }


  if (window.location.pathname.includes("quiz.html")) {
    var level = document.getElementById("player-level"); //Getting the level from html
    var currentXp = document.getElementById("current-xp"); //Getting the current xp from html
    var maxXp = document.getElementById("max-xp"); //Getting the max xp from html
    var xpTrackerInner = document.getElementById("xp-tracker-inner"); //Getting the xp tracker inner from html

    const settings = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    };
    
    //fetching of data for the profile page
    fetch(userdataUrl, settings)
    .then(response => response.json())
    .then(response => {
      console.log(response);
  
      fetch(profileUrl, settings)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          for (let i = 0; i < response.length; i++) {
            if (response[i].user[0]._id == userID ) {
              profileID = response[i]._id;
              level.innerHTML = response[i].level;
              currentXp.innerHTML = response[i].xp + 1000;
              maxXp.innerHTML = level.innerHTML * 1000;
              
              if (parseInt(currentXp.innerHTML) >= maxXp.innerHTML){ //checking if they can level up
                level.innerHTML = response[i].level + 1;
                currentXp.innerHTML = 0;
                maxXp.innerHTML = level.innerHTML * 1000;
                updateLevel(0, parseInt(level.innerHTML) + 1); //calling function to update level details
              }
              else{
                updateLevel(parseInt(currentXp.innerHTML), parseInt(level.innerHTML)); //calling function to update xp details
              }

              xpTrackerInner.style.width = (currentXp.innerHTML/maxXp.innerHTML)*100 + "%";
              updateHistory("Quiz", "You completed a quiz!" + 1000); //calling function to update history details
            }
          }
          
      });

      //Function to update history
      function updateHistory(title, desc, xp) {
        var jsondata = {
          "title" : title, 
          "description": desc, 
          "xp": xp, 
          "user": userData
          };
          
        var settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(jsondata)
        }

        //Send the AJAX request to update the history
        fetch(historyUrl, settings)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          });
      }

      //Function to update level
      function updateLevel(xp, level) {
        var jsondata = { "xp": xp , "level": level};
        var settings = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(jsondata)
        }

        //Send the AJAX request to update the history
        fetch(`${profileUrl}/${profileID}`, settings)
          .then(response => response.json())
          .then(data => {
            console.log(data);
          });
      }
  });
  }
});
