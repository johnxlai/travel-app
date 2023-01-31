let apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=mexico&origin=*`;

apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&page=Pet_door&formatversion=2&origin=*`;
fetch(apiUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('something is not right');
  }
});
