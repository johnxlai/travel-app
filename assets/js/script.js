// // selectors
const userInputForm = document.getElementById('user-input-form');
const fromCountry = document.getElementById('from-country');
const goingToCountry = document.getElementById('going-to-country');
const descriptionEl = document.getElementById('wiki-disc');
const flagElem = document.getElementById('flag');

// // listenser on form input (country they're interested about)

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

  let apiUrl = `https://api.unsplash.com/search/photos?page1&query=${fromCountryName}&client_id=${unsplashApiKey}/`;

  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data);
        displayImages(data);
      });
    } else {
      console.log('something is not right');
    }
  });
}

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
  const unsplashSection = $('.unsplash-imgs');
  unsplashSection.empty();

  $.each(images.results, function (key, value) {
    unsplashSection.append(
      `<img src="${value.urls.small}" alt="${value.alt_description}">
      <p>Photo by ${value.user.name} on <a href="https://unsplash.com" target="_blank">Unsplash</a></p>
      <p>${value.description}</p>
      <a href="${value.links.download}&force=true" target="_blank"  download="">Download</a>
      `
    );
  });
}

//Event for form submission
userInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let fromWhere = fromCountry.value;
  let toWhere = goingToCountry.value;
  fetchDescription(fromWhere);
  fetchFlag(fromWhere);
  fetchUnsplash(fromWhere);
  convertCountryToCurrency(fromWhere, toWhere);
});

// // add to local storage

// //local storage will be used for history

// //the local storage var will be used for the fetch search for wiki api

// // create fetch function for grabing money exchange

// // show map

function convertCountryToCurrency(fromCountry, goingToCountry) {
  grabCurrency(fromMoney, toMoney);
}

//fetch currency api
function grabCurrency(from$$$, to$$$) {
  const currencyApiKey = '8e233f62d86910e2c75ea2bb';
  currencyApiUrl = `https://v6.exchangerate-api.com/v6/${currencyApiKey}/pair/${from$$$}/${to$$$}`;
  fetch(currencyApiUrl).then((response) => {
    //console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        displayExchange(data);
      });
      // } else {
      console.log('something is not right');
    }
  });
}

function displayExchange(data) {
  console.log(data);
  console.log('display exchange rate here');
  // console.log(money.conversion_rate + currency_two);
}
