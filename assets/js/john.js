//unsplash api
// https://unsplash.com/documentation#search-photos

let country = 'canada';
const apiKey = `dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk`;

let apiUrl = `https://api.unsplash.com/search/photos?page1&query=${country}&client_id=dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk&/
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

function displayImages(images) {
  console.log(images.results);
  let photoDetails = images.results[0];
  $('#wiki-img').append(
    `<img src="${photoDetails.urls.small}" alt="${photoDetails.alt_description}">
    <p>${photoDetails.user.username}</p>
    `
  );
}
