// hero scroll effect
const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

sr.reveal('.hero-text', {delay:200, origin:'top'});
sr.reveal('.hero-img', {delay:450, origin:'top'});


/*
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c2b0394405e18685db039c";
    getUsers();
    document.getElementById("add-update-msg").style.display = "none";
  
    document.getElementById("register-submit").addEventListener("click", function (e) {
      // Prevent default action of the button 
      e.preventDefault();
  
      let registerName = document.getElementById("register-name").value;
      let registerEmail = document.getElementById("register-email").value;
      let registerPassword = document.getElementById("register-password").value;
  
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
  
    });


    /*
function loginUser(event) {
  event.preventDefault(); // Prevent default form submission

  // Get user input (assuming you have input elements with IDs)
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;


  // Send data to server using HTTPS
  fetch("https://greenrecycling-9fab.restdb.io/rest/userdata", {
    methods: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-apikey": "65c2b0394405e18685db039c",
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


document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c2b0394405e18685db039c";
  
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
  });*/