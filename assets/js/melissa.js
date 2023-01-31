
let myApiKey = '8e233f62d86910e2c75ea2bb';
const currency_one = 'USD';
const currency_two = 'CAD';

currencyApiUrl = `https://v6.exchangerate-api.com/v6/${myApiKey}/pair/${currency_one}/${currency_two}`;
fetch(currencyApiUrl).then((response) => {
    //console.log(response);
    if (response.ok) {
        response.json().then(function (data) {
            display(data);
        });
    } else {
        console.log('something is not right');
    }
});
function display(money) {
    console.log(money.conversion_rate + currency_two);

}