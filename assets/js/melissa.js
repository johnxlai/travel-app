







const myApiKey = '8e233f62d86910e2c75ea2bb';
let userInputOne = 'Canada';
let userInputTwo = 'Estonia';

//Country List

let countryList = [
    { Afghanistan: 'AFN' },
    { Albania: 'ALL' },
    { Algeria : 'DZD' },
    { Andorra : 'EUR' },
    { Angola : 'AOA' },
    { antiguaAndBarbuda : 'XCD' },
    { Argentina : 'ARS' },
    { Armenia : 'AMD' },
    { Australia : 'AUD' },
    { Austria : 'EUR' },
    { Azerbaijan : 'AZN' },
    { Bahamas : 'BSD' },
    { Bahrain : 'BHD' },
    { Bangladesh : 'BDT' },
    { Barbados : 'BBD' },
    { Belarus : 'BYR' },
    { Belgium : 'EUR' },
    { Belize : 'BZD' },
    { Benin : 'XOF' },
    { Bhutan : 'BTN' },
    { Bolivia : 'BOB' },
    { bosniaAndHerzegovina : 'BAM' },
    { Botswana : 'BWP' },
    { Brazil : 'BRL' },
    { Brunei : 'BND' },
    { Bulgaria : 'BGN' },
    { burkinaFaso : 'XOF' },
    { Burundi : 'BIF' },
    { Cambodia : 'KHR' },
    { Cameroon : 'XAF' },
    { Canada : 'CAD' },
    { capeVerde : 'CVE' },
    { centralAfricanRepublic : 'XAF' },
    { Chad : 'XAF' },
    { Chile : 'CLP' },
    { China : 'CNY' },
    { Colombia : 'COP' },
    { Comoros : 'KMF' },
    { Congo : 'CDF' },
    { costaRica : 'CRC' },
    { Croatia : 'HRK' },
    { Cuba : 'CUP' },
    { Cyprus : 'EUR' },
    { czechRepublic : 'CZK' },
    { Denmark : 'DKK' },
    { Djibouti : 'DJF' },
    { Dominica : 'XCD' },
    { dominicanRepublic : 'DOP' },
    { eastTimor : 'USD' },
    { Ecuador : 'USD' },
    { Egypt : 'EGP' },
    { elSalvador : 'USD' },
    { equatorialGuinea : 'XAF' },
    { Eritrea : 'ERN' },
    { Estonia : 'EUR' },
    { Ethiopia : 'ETB' },
    { Fiji : 'FJD' },
    { Finland : 'EUR' },
    { France : 'EUR' },
    { Gabon : 'XAF' },
    { Gambia : 'GMD' },
    { Georgia : 'GEL' },
    { Germany : 'EUR' },
    { Ghana : 'GHS' },
    { Gibraltar : 'GIP' },
    { Greece : 'EUR' },
    { Greenland : 'DKK' },
    { Grenada : 'XCD' },
    { Guatemala : 'GTQ' },
	{ Guinea : 'GNF' },
    { guineaBissau : 'GWP' },
    { Guyana : 'GYD' },
    { Haiti : 'HTG' },
    { vaticanCity : 'EUR' },
    { Honduras : 'HNL' },
    { hongKong : 'HKD' },
    { Hungary : 'HUF' },
    { Iceland : 'ISK' },
	{ India : 'INR' },
    { Indonesia : 'IDR' },
    { Iran : 'IRR' },
    { Iraq : 'IQD' },
    { Ireland : 'EUR' },
    { Greece : 'FJD' },
    { Greenland : 'EUR' },
    { Israel : 'ILS' },
    { Italy : 'EUR' },
    { Jamaica : 'JMD' },
    { Japan : 'JPY' },
    { Jordan : 'JOD' },
    { Kazakhstan : 'KZT' },
    { Kenya : 'KES' },
    { Kiribati : 'AUD' },
    { southKorea : 'KRW' },
	{ Kuwait : 'KWD' },
    { Kyrgyzstan : 'KGS' },
    { Laos : 'LAK' },
    { Latvia : 'LVL' },
    { Lebanon : 'LBP' },
    { Lesotho : 'LSL' },
    { Liberia : 'LRD' },
    { Libya : 'LYD' },
    { Liechtenstein : 'CHF' },
	{ Lithuania : 'LTL' },
    { Luxembourg : 'EUR' },
    { Madagascar : 'MGF' },
    { Malawi : 'MWK' },
    { Malaysia : 'MYR' },
    { Maldives : 'MVR' },
    { Mali : 'XOF' },
	{ Malta : 'EUR' },
    { marshallIslands : 'USD' },
    { Mauritania : 'MRO' },
    { Mauritius : 'MUR' },
    { Mexico : 'MXN' },
    { Micronesia : 'USD' },
    { Moldova : 'MDL' },
    { Monaco : 'EUR' },
    { Mongolia : 'MNT' },
	{ Montenegro : 'EUR' },
    { Montserrat : 'XCD' },
    { Morocco : 'MAD' },
    { Mozambique : 'MZN' },
    { Myanmar : 'MMK' },
    { Namibia : 'NAD' },
    { Nauru : 'AUD' },
    { Nepal : 'NPR' },
    { Netherlands : 'EUR' },
	{ newZealand : 'NZD' },
    { Nicaragua : 'NIO' },
    { Niger : 'XOF' },
    { Nigeria : 'NGN' },
    { northMacedonia : 'MKD' },
    { Norway : 'NOK' },
    { Oman : 'OMR' },
  { Pakistan : 'PKR' },
    { Palau : 'USD' },
    { Panama : 'PAB' },
    { papuaNewGuinea : 'PGK' },
    { Paraguay : 'PYG' },
    { Peru : 'PEN' },
    { Philippines : 'PHP' },
    { Poland : 'PLN' },
    { Portugal : 'EUR' },
	{ Qatar : 'QAR' },
    { Romania : 'RON' },
    { Russia : 'RUB' },
    { Rwanda : 'RWF' },
    { Samoa : 'WST' },
    { sanMarino : 'EUR' },
    { saoTomePrincipe : 'STD' },
    { saudiArabia : 'SAR' },
    { Senegal : 'XOF' },
	{ Serbia : 'RSD' },
    { Seychelles : 'SCR' },
    { sierraLeone : 'SLL' },
    { Slovakia : 'EUR' },
    { Slovenia : 'EUR' },
    { solomonIslands : 'SBD' },
    { southAfrica : 'ZAR' },
{ Singapore: 'SGD' },
    { Somalia : 'SOS' },
    { Spain : 'EUR' },
  { sriLanka : 'USD' },
    { Sudan : 'SDG' },
    { Suriname : 'SRD' },
    { Sweden : 'SEK' },
    { Switzerland : 'CHF' },
    { Syria : 'SYP' },
    { Taiwan : 'TWD' },
    { Tajikistan : 'TJS' },
    { Tanzania : 'TZS' },
	{ Thailand : 'THB' },
    { Togo : 'XOF' },
    { Tokelau : 'NZD' },
    { Tonga : 'TOP' },
    { trinidadTobago : 'TTD' },
    { Tunisia : 'TND' },
    { Turkey : 'TRY' },
    { Turkmenistan : 'TMT' },
	{ Tuvalu : 'AUD' },
    { USA : 'USD' },
    { Uganda : 'UGX' },
    { Ukraine : 'UAH' },
    { unitedArabEmirates : 'AED' },
    { unitedKingdom : 'GBP' },
    { Uruguay : 'UYU' },
    { Uzbekistan : 'UZS' },
    { Vanuatu : 'VUV' },
    { Venezuela : 'VEF' },
      { Vietnam : 'VND' },
      { virginIslands : 'USD' },
      { westernSahara : 'MAD' },
      { Yemen : 'YER' },
      { Zambia : 'ZMW' },
      { Zimbabwe : 'ZWD' },
  
]




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
