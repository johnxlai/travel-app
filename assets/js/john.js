//unsplash api
// https://unsplash.com/documentation#search-photos

let apiUrl = `https://api.unsplash.com/search/photos?page=1&query=office`;

fetch(apiUrl).then((response) => {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('something is not right');
  }
});
