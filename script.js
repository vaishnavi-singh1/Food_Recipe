// lets grab our searchForm, searchResult, whole container
// and declare an empty searchQuery string

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "f01324d9";
const APP_KEY = "0e712f61dbaa44a1a8920851bf1e8b03";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    //console.log("Vaishnavi", searchQuery);
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    // dynamic javascript inside string

    // response to our fetch
    const response = await fetch(baseURL);

    // convert the response to json 
    const data = await response.json();

    // lets pass this data to another function to generate out HTML
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = "";
    results.map(result => {
        generatedHTML +=
            `<div class="item">
        <img src= "${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title"> ${result.recipe.label} </h1>
            <a href="${result.recipe.url}" target = "_blank" class="view-button">View Recipe </a>
        </div>
        <p class="item-data">
            Calories : ${result.recipe.calories}
        </p>
        <p class="item-data">
            Diet Label : ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data found"}
        </p>
       
    </div>
    `
    })

    // append these 20 items in our searchResultDiv
    searchResultDiv.innerHTML = generatedHTML;
}