//unsplash api
// https://unsplash.com/documentation#search-photos

let country = 'Canada';
const apiKey = `dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk`;

let apiUrl = `https://api.unsplash.com/photos/?query=${country}&client_id=dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk&/
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
  console.log(images);

  $('#wiki-img').append(
    `<img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg">`
  );
}
