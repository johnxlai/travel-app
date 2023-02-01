// // selectors
const userInputForm = document.getElementById('user-input-form');
let fromCountryEl = document.getElementById('from-country');

// // listenser on form input (country they're interested about)

// // Fetch country description
function addDescription(fromCountryName) {
  if (fromCountryName) {
    // add description
    const apiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&redirects=1&titles=${fromCountryName}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data = data.query.pages;
        let pageid = Object.keys(data)[0];
        let extract = data[pageid].extract;

        let desc = document.getElementById('wiki-disc');
        desc.innerHTML = `<p>${extract}</p>`;
      });
  }
}

// // Fetch country flag
// function addDescription(atr) {
//   if (atr) {
//     // add description
//     const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&redirects=1&titles=${atr}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((response) => {
//         response = response.query.pages;
//         let pageid = Object.keys(response)[0];
//         let extract = response[pageid].extract;

//         let desc = document.getElementById('wiki-disc');
//         desc.innerHTML = `<p>${extract}</p>`;
//       });

//     // flag
//     const url2 = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${atr}&origin=*`;

//     fetch(url2)
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response);
//         response = response.query.pages;
//         let pageid = Object.keys(response)[0];
//         let flagElem = document.getElementById('flag');

//         if (response[pageid].original) {
//           let source = response[pageid].original.source;
//           flagElem.setAttribute('src', source);
//         } else {
//           flagElem.setAttribute('src', '');
//         }
//       });
//   }
// }

//Event for form submission
userInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let userInputCountry = fromCountryEl.value;
  addDescription(userInputCountry);
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

// //unsplash api
// // https://unsplash.com/documentation#search-photos

// let country = 'canada';
// const apiKey = `dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk`;

// let apiUrl = `https://api.unsplash.com/search/photos?page1&query=${country}&client_id=dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk&/
// `;

// fetch(apiUrl).then((response) => {
//   if (response.ok) {
//     response.json().then(function (data) {
//       // console.log(data);
//       displayImages(data);
//     });
//   } else {
//     console.log('something is not right');
//   }
// });

// function displayImages(images) {
//   console.log(images.results);

//   $.each(images.results, function (key, value) {
//     console.log(value.urls.small);
//     $('#wiki-img').append(
//       `<img src="${value.urls.small}" alt="${value.alt_description}">
//       <p>Photo by ${value.user.name} on <a href="https://unsplash.com" target="_blank">Unsplash</a></p>
//       <p>${value.description}</p>
//       <a href="${value.links.download}&force=true" target="_blank"  download="">Download</a>
//       `
//     );
//   });
// }
