const url = 'https://climate-news-api5.p.rapidapi.com/news';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ddea8bd29dmsha6f041eae877d1fp14180fjsnb3b308bf90b6',
		'X-RapidAPI-Host': 'climate-news-api5.p.rapidapi.com'
	}
};

try {
	//fetch data from the API
	const response = await fetch(url, options);
	const data = await response.json();
	console.log(data);
	console.log(data[1].title);

	let newsData = "";
for (let i = 0; i < data.length; i++) {
	newsData += "<div class='news-item'>";
	newsData += "<h2 class='news-title'>" + data[i].title + "</h2>";
	newsData += "<p class='news-source'>" + data[i].source + "</p>";
	newsData += "<a href='" + data[i].url + "' target='_blank' class='news-link'>Read more</a>";
	newsData += "</div>";
}
document.getElementById("news").innerHTML = newsData;
console.log(newsData);

} catch (error) {
	console.error(error);
}
