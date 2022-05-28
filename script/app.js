const url = 'https://api.spoonacular.com/food/search?apiKey=d521a3c7bc97453ea62414c9d66eaf45';
// const apiKey = 'd521a3c7bc97453ea62414c9d66eaf45'
const options = { 
    method: 'GET',  
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
let searchbtn = document.getElementById('search-btn');
let meal = document.getElementById('meal')
let mealList = document.getElementById('mealList')
async function getRecipe() {
    const response = await fetch(url + '&query=' + meal.value, options);
    const data = await response.json();
    console.log(data.searchResults[0].results);

    if(mealList.children) {
        mealList.innerHTML = '';
    }
    data.searchResults[0].results.forEach(meals => {
        let li = document.createElement('li');
        li.innerHTML = `<a target='_blank' href="${meals.link}">
        <p>${meals.name}<p></a>
        <a target='_blank' href="${meals.link}"><img src="${meals.image}" alt="${meals.name}"></a>`;
        mealList.appendChild(li);
    })
}
searchbtn.addEventListener('click', getRecipe);
meal.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        getRecipe();
    }
});