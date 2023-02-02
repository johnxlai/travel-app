// // selectors
const userInputForm = document.getElementById('user-input-vacation-form');
const userOriginForm = document.getElementById('user-input-origin-form');
const fromCountry = $('#from-country');
const goingToCountry = $('#going-to-country');
const descriptionEl = document.getElementById('wiki-disc');
const flagElem = document.getElementById('flag');
const currencyEl = document.getElementById('currency');
const errorElem = document.getElementById('modal-error');
const historyUl = document.getElementById('history-list');
let vacationDetails = {};

//Grab user input
function grabUserVisitingInput(e) {
  e.preventDefault();
  let toWhere = goingToCountry.find(':selected').text();
  let toWhereCurrency = goingToCountry.find(':selected').val();

  //Fetch from API
  if (toWhere != 'Select a country ...') {
    fetchDescription(toWhere);
    fetchFlag(toWhere);
    fetchUnsplash(toWhere);
    vacationDetails = { toWhere, toWhereCurrency };
    addToLocalStorage(toWhere);
    clickLocaList();

    currencyEl.innerHTML = ``;
  } else {
    // add error massage
  }
}

function grabUserOriginInput(e) {
  e.preventDefault();
  let homeCurrency = fromCountry.find(':selected').val();
  console.log(vacationDetails);
  fetchCurrency(homeCurrency, vacationDetails.toWhereCurrency);
}

////////// ERROR Handlers ///////////////
//Error Modal
function errorModalClose() {
  errorElem.classList.remove('display-none-error');

  console.log('errorModalClose - DONE');
  const errorElemBtn = errorElem.querySelector('#modal-error button');

  errorElemBtn.addEventListener('click', () => {
    errorElem.classList.add('display-none-error');
  });
}

////////// FETCH APIS ///////////////
// // Fetch country description using WIKI API
function fetchDescription(fromCountryName) {
  if (fromCountryName) {
    // add description
    const apiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&redirects=1&titles=${fromCountryName}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data = data.query.pages;
        displayDescription(data);
      });
  }
}

// Fetch country flag
function fetchFlag(fromCountryName) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${fromCountryName}&origin=*`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data = data.query.pages;
      displayFlag(data);
    });
}

//Fetch unsplash data
function fetchUnsplash(fromCountryName) {
  const unsplashApiKey = `dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk&`;

  let apiUrl = `https://api.unsplash.com/search/photos?page1&per_page=5&query=${fromCountryName}&orientation=landscape&client_id=${unsplashApiKey}/`;

  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data);
        displayImages(data);
      });
    } else {
      errorModalClose();
      console.error('something is not right');
    }
  });
}

//fetch currency api
function fetchCurrency(homeCurrency, vacatCurrency) {
  const currencyApiKey = '8e233f62d86910e2c75ea2bb';
  currencyApiUrl = `https://v6.exchangerate-api.com/v6/${currencyApiKey}/pair/${homeCurrency}/${vacatCurrency}`;
  fetch(currencyApiUrl).then((response) => {
    //console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        displayExchange(data);
      });
    } else {
      errorModalClose();
      console.error('something is not right');
    }
  });
}

//////////////////  DISPLAY FUNCTIONS   ////////

//Display Country Description
function displayDescription(country) {
  let pageid = Object.keys(country)[0];
  let extract = country[pageid].extract;

  descriptionEl.innerHTML = `<p>${extract}</p>`;
}

function displayFlag(country) {
  let pageid = Object.keys(country)[0];

  if (country[pageid].original) {
    let source = country[pageid].original.source;
    flagElem.setAttribute('src', source);
  }
}

// //unsplash api
function displayImages(images) {
  const unsplashSection = $('.unsplash-main-imgs');
  const unsplashThumbs = $('.unsplash-thumbs');

  //empty previous loaded images
  unsplashSection.empty();
  unsplashThumbs.empty();
  console.log(images);
  $.each(images.results, function (index, value) {
    unsplashSection.append(
      `<div class="carousel-item">
        <img src="${value.urls.small}" class="d-block w-100" alt="${value.alt_description}" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Photo by ${value.user.name} on <a href="https://unsplash.com" target="_blank">Unsplash</a></h5>
            <p>${value.description}</p>
            <a href="${value.links.download}&force=true" target="_blank"  download="">Download</a>
          </div>
      </div>`
    );

    unsplashThumbs.append(
      `<button
        type="button"
        style="width: 100px"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="${index}"
        aria-label="Slide ${index}">
        <img
          class="d-block w-100"
          src="${value.urls.small}"
          class="img-fluid" />
      </button>`
    );
  });
  console.dir(unsplashSection);
  unsplashSection.children().eq(0).addClass('active');
  unsplashThumbs.children().eq(0).addClass('active');
  // unsplashThumbs.closet('.carousel-item').addClass('active');
}

// display exchange rate
function displayExchange(data) {
  currencyEl.innerHTML = `
    <div class="flex flex-col">
      Home $$$ = ${data.base_code}
      Vacation $$$ = ${data.target_code}
      Conversion Rate = ${data.conversion_rate}
    </div>
    `;
}

//Add user input to local storage
function addToLocalStorage(away) {
  let storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  //Add new country from user select
  let country = {
    away,
  };

  //Check if it object is already in the array
  const checkCountryExist = (storedHistory) => {
    if (storedHistory.away === country.away) {
      return true;
    }
    return false;
  };

  //If it is already in the array dont add it
  if (!storedHistory.some(checkCountryExist)) {
    //add to array
    storedHistory.push(country);
  }

  //Update localStorage with the new stored History
  localStorage.setItem('searchHistory', JSON.stringify(storedHistory));

  //show local history
  displayLocalHistory();
}

//Display User Search History
function displayLocalHistory() {
  historyUl.innerHTML = ``;
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  console.log(searchHistory);
  searchHistory.forEach(function (search) {
    console.log(search);
    let li = `
    <li>${search.away}</li>
    `;
    // <li><a href="" class="bg-indigo-500">${search.away} </a><li>
    historyUl.innerHTML += li;
  });
}
// click to local links
function clickLocaList() {
  let liElem = document.querySelectorAll('#history-list li');
  console.log(liElem);

  for (let i = 0; i < liElem.length; i++) {
    liElem[i].addEventListener('click', () => {
      fetchDescription(liElem[i].innerText);
      fetchFlag(liElem[i].innerText);
      fetchUnsplash(liElem[i].innerText);
      addToLocalStorage(liElem[i].innerText);
      clickLocaList();
    });
  }
}

//Event for form submission
userInputForm.addEventListener('submit', grabUserVisitingInput);
userOriginForm.addEventListener('submit', grabUserOriginInput);

function init() {
  //get init
}
init();
