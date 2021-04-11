let countrySelect = document.getElementById("country");
let dateFrom = document.getElementById("dateFrom");
let dateTo = document.getElementById("dateTo");
let submitButton = document.getElementById("submit");
let resultsDisplay = document.getElementById("resultDisplay");

let countryRequest = new XMLHttpRequest();
let dataFetchRequest = new XMLHttpRequest();

countryRequest.open("GET", "https://api.covid19api.com/countries");
countryRequest.addEventListener("load", function(event) {
	addCountries(JSON.parse(event.target.response));
});
countryRequest.send();

submitButton.addEventListener("click", function() {
	if(dateFrom.value === "" || dateTo.value === "") {
		alert("The fields can't be empty!");
		return;
	}
	else if(new Date(dateTo.value).getTime() - new Date(dateFrom.value).getTime() < 0) {
		alert("To date can't be less than from date!");
		return;
	}
	let fetchUrl = "https://api.covid19api.com/country/" + countrySelect.value + "?from=" + dateFrom.value + "T00:00:00Z&to=" + dateTo.value + "T00:00:00Z";
	dataFetchRequest.open("GET", fetchUrl);
	dataFetchRequest.send();
});

dataFetchRequest.addEventListener("load", function(event) {
	addResults(JSON.parse(event.target.response));
});

function addCountries(countries) {
	countries.forEach(country => {
		let option = document.createElement("option");
		option.value = country.Slug;
		option.innerHTML = country.Country;
		if(country.Country === "India") {
			option.defaultSelected = true;
		}
		countrySelect.appendChild(option);
	});
}

function addResults(fetchedData) {
	resultsDisplay.innerHTML = "";
	fetchedData.forEach(data => {
		let result = document.createElement("div");
		result.className = "result";
		let emptyDiv = document.createElement("div");
		emptyDiv.className = "emptyDiv";
		result.appendChild(emptyDiv.cloneNode(false));
		let date = document.createElement("p");
		date.innerHTML = "Date: " + data.Date.substring(0, 10);
		result.appendChild(date);
		result.appendChild(emptyDiv.cloneNode(false));
		let confirmed = document.createElement("p");
		confirmed.innerHTML = "Confirmed: " + data.Confirmed;
		result.appendChild(confirmed);
		result.appendChild(emptyDiv.cloneNode(false));
		let active = document.createElement("p");
		active.innerHTML = "Active: " + data.Active;
		result.appendChild(active);
		result.appendChild(emptyDiv.cloneNode(false));
		let deaths = document.createElement("p");
		deaths.innerHTML = "Death Toll: " + data.Deaths;
		result.appendChild(deaths);
		result.appendChild(emptyDiv.cloneNode(false));
		let recovered = document.createElement("p");
		recovered.innerHTML = "Recovered: " + data.Recovered;
		result.appendChild(recovered);
		result.appendChild(emptyDiv.cloneNode(false));
		resultsDisplay.appendChild(result);
	});
}