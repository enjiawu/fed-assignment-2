//Function for lottie
function lottieLoading(){ //Function for loading lottie for 3 seconds
  document.getElementById("loading-screen").style.display = "flex"; //Showing the lottie animation
  document.getElementsByTagName("body")[0].style.backgroundColor = "#061f37"; //Changing the background color 
  document.getElementsByTagName("main")[0].style.display = "none"; //Hiding the community content

  setTimeout(() => { //Change back after 3 seconds
      document.getElementById("loading-screen").style.display = "none"; //Hiding the lottie animation
      document.getElementsByTagName("body")[0].style.backgroundColor = "white"; //Changing background back to white
      document.getElementsByTagName("main")[0].style.display = "block"; //Showing the community content
  }, 4000);
}

var username = document.getElementById("username"); //Getting the username from html
var description = document.getElementById("description"); //Getting the description from html
var level = document.getElementById("player-level"); //Getting the level from html
var currentXp = document.getElementById("current-xp"); //Getting the current xp from html
var maxXp = document.getElementById("max-xp"); //Getting the max xp from html
var xpTrackerInner = document.getElementById("xp-tracker-inner"); //Getting the xp tracker inner from html

//API keys and links 
const profileUrl = 'https://greenrecycling-8b3e.restdb.io/rest/profile';
const historyUrl = 'https://greenrecycling-8b3e.restdb.io/rest/history';
const userdataUrl = 'https://greenrecycling-8b3e.restdb.io/rest/userdata';
const APIKEY = "65bcaa26383507023123fbae";
var profileID = "";
var userID = '65c24849d4a556290000c093';

//For profile page
if (window.location.pathname.includes("profile.html")) {
  lottieLoading(); //Showing the lottie animation while the page loads

  document.getElementById("cancel-button").addEventListener("click", function (e) { //Function to check if user clicked on cancel button
    if (confirm("Are you sure you want to cancel?")) {
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
        description.innerHTML = document.getElementById("edit-description").value; //Updating display
        getInfo(); //Calling the getInfo function to get the user data
    });
  }
}
