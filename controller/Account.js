var rest = require('../API/RestClient');

exports.retrieveRates = function(session, base, symbols, amount) {
    var url = "https://api.fixer.io/latest?base=" + base + "&symbols=" + symbols;
    rest.getCurrency(url, session, handleCurrencyResponse, base, amount);
}

exports.retrieveCards = function(session) {
    var url = "http://msabankbot.azurewebsites.net/tables/CreditCards";
    rest.getAllCards(url, session, handleCardsResponse);
}

function handleCurrencyResponse(body, session, base, amount) {
    console.log(body);
    var allDetails = JSON.parse(body);
    //session.send(allDetails.rates.AUD.toString());
    for (var det in allDetails.rates) {
        var converted = amount * allDetails.rates[det];
        session.send(amount + " " + base + " to " + det + " is " + converted);
    }
}

function handleCardsResponse(body, session) {
    var allDetails = JSON.parse(body);
}