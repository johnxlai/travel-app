// // selectors
const userInputForm = document.getElementById('user-input-vacation-form');
const userOriginForm = document.getElementById('user-input-origin-form');
const fromCountry = $('#from-country');
const goingToCountry = $('#going-to-country');
const descriptionEl = document.getElementById('wiki-disc');
const wikiTitleEl = document.getElementById('wiki-tile');
const flagElem = document.getElementById('flag');
const currencyEl = document.getElementById('currency');
const errorElem = document.getElementById('modal-error');
const historyUl = document.getElementById('history-list');
const wikiImgElem = document.getElementById('wiki-img');
const startBtn = document.querySelector('#start-button');
const startContent = document.querySelector('#start-section');
const appContent = document.querySelector('#wrapper');
const box1El = document.getElementById('section-box-1');
const box2El = document.getElementById('section-box-2');
const box3El = document.getElementById('section-box-3');

let vacationDetails = {};

function startApp() {
  //hides home page content
  startContent.style.display = 'none';
  //shows app
  appContent.style.display = 'block';
 
};

function loadApp() {
  //hides home page content
  startContent.style.display = 'block';
  //shows app
  appContent.style.display = 'none';
 
};

startBtn.addEventListener('click', startApp);
window.addEventListener('load', loadApp);

//Grab user input
function grabUserVisitingInput(e) {
  e.preventDefault();
  let toWhere = goingToCountry.find(':selected').text();
  let toWhereCurrency = goingToCountry.find(':selected').val();

  //Fetch from API
  if (toWhere != false) {
    wikiTitleEl.innerHTML = `<h2>${toWhere}</h2>`;
    fetchDescription(toWhere);
    fetchFlag(toWhere);
    fetchUnsplash(toWhere);
    vacationDetails = { toWhere, toWhereCurrency };
    addToLocalStorage(toWhere);
    clickLocaList();
    showMe(box1El);
    showMe(box2El);
    showMe(box3El);

    currencyEl.innerHTML = ``;
  } else {
    // add error massage
    errorModalClose();
  }
}

function grabUserOriginInput(e) {
  e.preventDefault();
  let homeCurrency = fromCountry.find(':selected').val();
  console.log(homeCurrency);
  if (homeCurrency != false) {
    fetchCurrency(homeCurrency, vacationDetails.toWhereCurrency);
  } else {
    errorModalClose();
  }
}

////////// ERROR Handlers ///////////////
//Error Modal
function errorModalClose() {
  errorElem.classList.remove('display-none-error');

  console.error('something is not right');
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
  // console.log(images);
  $.each(images.results, function (index, value) {
    unsplashSection.append(
      `<div class="carousel-item overflow-hidden">
          <div class="carousel-caption bg-slate-900/50 p-2 d-none d-md-block bottom-[12px]">
            <h5>Photo by ${value.user.name} on <a class="underline" href="https://unsplash.com" target="_blank">Unsplash</a> | <a href="${value.links.download}&force=true" target="_blank"  download="">Download Image</a></h5>
          </div>
        <img src="${value.urls.small}" class="d-block object-cover w-100 max-h-[300px]" alt="${value.alt_description}" />

      </div>`
    );

    unsplashThumbs.append(
      `<button
        type="button"
        style="width: 100px;"
        data-bs-target="#carouselUnsplashIndicators"
        data-bs-slide-to="${index}"
        aria-label="Slide ${index}">
        <img
          class="d-block w-100 max-h-[50px] object-cover"
          src="${value.urls.small}"
          class="img-fluid" />
      </button>`
    );
  });

  //Grab first children and add class active
  unsplashSection.children().eq(0).addClass('active');
  unsplashThumbs.children().eq(0).addClass('active');
}

// display exchange rate
function displayExchange(data) {
  currencyEl.innerHTML = `
    <div class="flex flex-col">1 ${data.base_code} = ${data.conversion_rate} ${data.target_code}</div>
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
    storedHistory.unshift(country);
    if (storedHistory.length > 10) {
      storedHistory.pop();
    }
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

  searchHistory.forEach(function (search) {
    let li = `
    <li class="mr-2 md:mr-0 mb-2">${search.away}</li>
    `;

    historyUl.innerHTML += li;
  });

  clickLocaList();
}
// click to local links
function clickLocaList() {
  let liElem = document.querySelectorAll('#history-list li');

  for (let i = 0; i < liElem.length; i++) {
    liElem[i].addEventListener('click', () => {
      wikiTitleEl.innerHTML = `<h2>${liElem[i].innerText}</h2>`;
      fetchDescription(liElem[i].innerText);
      fetchFlag(liElem[i].innerText);
      fetchUnsplash(liElem[i].innerText);
      addToLocalStorage(liElem[i].innerText);
      showMe(box1El);
      showMe(box2El);
      showMe(box3El);
      // clickLocaList();
    });
  }
}

function showMe(nameElem) {
  if(nameElem.classList.contains('display-none-custom')){
    nameElem.classList.remove('display-none-custom');
  }
}

//Event for form submission
userInputForm.addEventListener('submit', grabUserVisitingInput);
userOriginForm.addEventListener('submit', grabUserOriginInput);

function init() {
  //get init
  displayLocalHistory();
}
init();
