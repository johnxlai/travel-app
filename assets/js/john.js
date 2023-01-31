let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=mexico&origin=*`;

apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&formatversion=2&srsearch=mexico&origin=*`;

// apiUrl = `https://v6.exchangerate-api.com/v6/8e233f62d86910e2c75ea2bb/pair/USD/GBP`;
fetch(apiUrl).then((response) => {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('something is not right');
  }
});
