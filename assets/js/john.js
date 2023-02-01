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
