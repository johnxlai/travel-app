// // selectors
const userInputForm = document.getElementById('user-input-form');
let fromCountryEl = document.getElementById('from-country');
const descriptionEl = document.getElementById('wiki-disc');
const flagElem = document.getElementById('flag');
const unsplashApiKey = `dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk`;

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
  // flag
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
  let apiUrl = `https://api.unsplash.com/search/photos?page1&query=${country}&${unsplashApiKey}/
`;

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
  console.log(country);

  if (country[pageid].original) {
    let source = country[pageid].original.source;
    flagElem.setAttribute('src', source);
  }
}

// //unsplash api

function displayImages(images) {
  console.log(images.results);

  $.each(images.results, function (key, value) {
    console.log(value.urls.small);
    $('#wiki-img').append(
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
  let userInputCountry = fromCountryEl.value;
  fetchDescription(userInputCountry);
  fetchFlag(userInputCountry);
  fetchUnsplash(userInputCountry);
});

// // add to local storage

// //local storage will be used for history

// //the local storage var will be used for the fetch search for wiki api

// // create fetch function for grabing data from wiki

// // create fetch function for grabing money exchange

// // what we need to display with the data
// //show images

// // show map

// //show bio of country
