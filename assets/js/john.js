//unsplash api
// https://unsplash.com/documentation#search-photos

const apiKey = `dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk`;

let apiUrl = `https://api.unsplash.com/photos/?client_id=dLu5Px-IAAbB5LQ4bnPDg8BwZSRXdqoMLaZdTj_vEqk
`;

fetch(apiUrl).then((response) => {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('something is not right');
  }
});
