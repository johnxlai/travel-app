let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimage|imageinfo&format=json&piprop=original&titles=mexico&origin=*`;

apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&list=search&formatversion=2&srsearch=mexico&origin=*`;

// apiUrl = `https://v6.exchangerate-api.com/v6/33c366695bf51432d7cae5e1/pair/canada/brazil`;
fetch(apiUrl).then((response) => {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('something is not right');
  }
});
