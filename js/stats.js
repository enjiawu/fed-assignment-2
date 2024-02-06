    // Get the elements by their ID
    var popupLink = document.getElementById("popup-link");
    var popupWindow = document.getElementById("popup-window");
    var closeButton = document.getElementById("close-button");
    // Show the pop-up window when the link is clicked
    popupLink.addEventListener("click", function(event) {
      event.preventDefault();
      popupWindow.style.display = "block";
    });
    // Hide the pop-up window when the close button is clicked
    closeButton.addEventListener("click", function() {
      popupWindow.style.display = "none";
    });

	const url = 'https://live-world-data.p.rapidapi.com/category/Environment';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ddea8bd29dmsha6f041eae877d1fp14180fjsnb3b308bf90b6',
		'X-RapidAPI-Host': 'live-world-data.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const data = await response.json();
	console.log(data);

	let statsData = "";
for (let i = 0; i < data.length; i++) {
	statsData += "<div class='stats-item'>";
	statsData += "<p class='stats-item'>" + data[i].item + ": " + data[i].counter + "</p>";
	statsData += "</div>";
}
document.getElementById("stats").innerHTML = statsData;
console.log(statsData);
} catch (error) {
	console.error(error);
}