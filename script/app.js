const url = 'https://api.spoonacular.com/food/search?apiKey=d521a3c7bc97453ea62414c9d66eaf45';
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
    document.getElementById('loader').style.display = 'block';
    mealList.innerHTML = '';

    try {
        const response = await fetch(url + '&query=' + meal.value, options);
        const data = await response.json();

        const results = data.searchResults?.[0]?.results || [];

        results.forEach(meals => {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="meal-card">
              <a target='_blank' class="meal-card-content" href="${meals.link}">
                <p>${meals.name}</p>
                <img class="meal-image" src="${meals.image}" alt="${meals.name}" />
              </a>
            </div>`;
            mealList.appendChild(div);
        });

        if (!results.length) {
            mealList.innerHTML = "<p>No results found.</p>";
        }
    } catch (err) {
        console.error(err);
        mealList.innerHTML = "<p>Error fetching data.</p>";
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

searchbtn.addEventListener('click', getRecipe);
meal.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        getRecipe();
    }
});