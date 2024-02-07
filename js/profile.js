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
var userID = '';
var userData = {};

document.addEventListener("DOMContentLoaded", function () { //Make sure that the document is okay
  if (window.location.pathname.includes("index.html")) { //For log in and registration
    document.getElementById("add-update-msg").style.display = "none";

    document.getElementById("register-submit").addEventListener("click", function (e) { //Check if register button has been clicked
      e.preventDefault();
      validateRegistration(); //Call validate registration function
    });

    function validateRegistration() {
      let registerName = document.getElementById("register-name").value; //Get the values from the form
      let registerEmail = document.getElementById("register-email").value;
      let registerPassword = document.getElementById("register-password").value;

      if (registerName === "" || registerEmail === "" || registerPassword === "") { //Check if the form has empty fields
        alert("Please fill in all fields."); //If it is then ask them to fill in again
        return;
      }

      fetch(userdataUrl, { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      })
        .then((response) => response.json())
        .then((data) => { //Fetching the data
          const existingUser = data.find((user) => user.email === registerEmail); //Check if the user already exists in the data
          if (existingUser) {
            alert("User already exists"); //If it does then alert that user already exists
          } else {
            registerUser(registerName, registerEmail, registerPassword); //If it doesnt then register new user
          }
        });
    }

    function registerUser(name, email, password) { //Function to register new user
      let jsondata = {
        name: name,
        email: email,
        password: password,
      };

      let settings = {
        method: "POST", // use post to send info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
          // Disable our button or show loading bar
          document.getElementById("register-submit").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-register-form").reset();
        },
      };

      fetch(userdataUrl, settings)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          document.getElementById("register-submit").disabled = false;
          // update frontend UI
          document.getElementById("add-update-msg").style.display = "block";
          setTimeout(function () {
            document.getElementById("add-update-msg").style.display = "none";
          }, 3000);
        });
    }
  
    document.getElementById("login-button").addEventListener("click", function (e) { //When log in button is clicked

      // Get user input (assuming you have input elements with IDs)
      const loginEmail = document.getElementById('login-email').value;
      const loginPassword = document.getElementById('login-password').value;
      
      if (loginEmail === "" || loginPassword === "") { //Making sure all the fields are filled up
        alert("Please fill in all the fields");
        return;
      }

      e.preventDefault(); // Prevent default form submission

      let successfulLogin = false; //To check if log in has been successful
      let emailFound = false; //To check if email has been found
      fetch(userdataUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) { //Iterating through all the users to find matching details
            if (data[i].email === loginEmail && data[i].password === loginPassword) { //If the email and password match then log in
              console.log(data[i]);
              const successPopup = document.getElementById('login-success');
              successPopup.style.display = 'block';
              document.getElementById("login-container").style.display = "none";
              emailFound = true;
              successfulLogin = true;
              userID = data[i]._id;
              break;
            }
            else if(data[i].email === loginEmail && data[i].password!== loginPassword){ //If the email exists but the password is wrong then alert
              alert("Incorrect password");
              emailFound = true;
              break;
            }
          }

          if (emailFound === false) { //If the email is not found then alert
            alert("User does not exist. Please sign up first!");
          }
        });

        console.log(successfulLogin);
        setTimeout(function () {
          document.getElementById("login-success").style.display = "none"; //Hiding the success popup after 3 seconds
        }, 3000);
    });
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
              updateHistory("Quiz", "You completed a quiz!" , 1000); //calling function to update history details
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
