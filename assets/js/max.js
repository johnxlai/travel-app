
let search = 'canada';

let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&&srlimit=20&srsearch=${search}&origin=*`;

fetch(url)
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        let text = data.query.search[0].snippet;
        document.body.innerHTML = text;
    })