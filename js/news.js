const url = 'https://climate-news-api5.p.rapidapi.com/news';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ddea8bd29dmsha6f041eae877d1fp14180fjsnb3b308bf90b6',
		'X-RapidAPI-Host': 'climate-news-api5.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
	console.log(result[1].title);
	//console.log(response)

} catch (error) {
	console.error(error);
}