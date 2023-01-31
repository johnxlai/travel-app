let apiUrl =
  'https://en.wikipedia.org/w/api.php?action=query&format=json&meta=siteinfo&formatversion=2&siprop=namespaces';

fetch(apiUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('something is not right');
  }
});
