const myApiKey = '8e233f62d86910e2c75ea2bb';


const userInputOne = document.querySelector('#user-input-one');


countryList.forEach((country) => {
    if (userInputOne === Object.keys(country)[0]) {
        // console.log(`User input  - ${userInput}`);
        currency_one = Object.values(country)[0];
    }
});

countryList.forEach((country) => {
    if (userInputTwo === Object.keys(country)[0]) {
        // console.log(`User input  - ${userInput}`);
        currency_two = Object.values(country)[0];
    }
});


currency_one = userInputOne.value;


