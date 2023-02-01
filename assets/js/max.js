
// Event Listener button
let btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let formValue = document.getElementById('text-name').value;
    addDescription(formValue);
});

// description and flag
function addDescription(atr) {
    if (atr) {

        // add description
        const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&redirects=1&titles=${atr}`;

        fetch(url)
        .then(response => response.json())
        .then (response => {
            response = response.query.pages;
            let pageid = Object.keys(response)[0];
            let extract = response[pageid].extract;

            let desc = document.getElementById('wiki-disc');
            desc.innerHTML = `<p>${extract}</p>`
        });

        // flag
        const url2 = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${atr}&origin=*`;

        fetch(url2)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            response = response.query.pages;
            let pageid = Object.keys(response)[0];
            let flagElem = document.getElementById('flag');

            if (response[pageid].original) {
                let source = response[pageid].original.source;
                flagElem.setAttribute('src', source);
            } else {
                flagElem.setAttribute('src', '');
            }
        });
    }
}