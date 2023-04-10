// Load Meal DB API First 
const loadMeal = ( search ) =>{
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${ search }`;
  fetch( url )
    .then( res => res.json() )
    .then( meals => displayMeal( meals.meals ) )
}

// Display the the loaded api to UI 
const displayMeal = meals =>{
  // console.log( meals );
  const mealContainer = document.getElementById( 'meal-container' );
  mealContainer.innerHTML = '';
  meals.forEach( meal => {
    // console.log( meal );
    const mealDiv = document.createElement( 'div' );
    mealDiv.classList.add( 'col' );
    mealDiv.innerHTML = `
    <div onclick="loadDetails( ${meal.idMeal} )" class="card">
    <img src="${ meal.strMealThumb }" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${ meal.strMeal }</h5>
      <p class="card-text">${ meal.strInstructions.slice( 0, 100 ) }...</p>
    </div>
  </div>
    
    `
    mealContainer.appendChild( mealDiv );
  } )
}

// Search Meals
const searchMeals = () =>{
  const inputField = document.getElementById( 'input-field' );
  const inputText = inputField.value;
  inputField.value = '';
  loadMeal( inputText );
}

// Load Meal Details on click 
const loadDetails = mealId =>{
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`;
  // console.log( url );
  fetch( url )
    .then( res => res.json() )
    .then( meals => displayDetails( meals.meals[0] ) )

}

// Display meal details at the top 
const displayDetails = meals =>{
  const detailContainer = document.getElementById( 'detail-container' );
  detailContainer.innerHTML = '';
  const detailDiv = document.createElement( 'div' );
  detailDiv.classList.add( 'detail-div' )
  detailDiv.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img src="${ meals.strMealThumb }" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${ meals.strMeal }</h5>
    <p class="card-text">${ meals.strInstructions.slice( 0, 100 ) } ...</p>
    

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      See Full Details
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${ meals.strMeal }</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${ meals.strInstructions }
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->


  </div>
</div>
  `;
  detailContainer.appendChild( detailDiv );
// console.log( meals )
}

// loadMeal( 'pizza' );