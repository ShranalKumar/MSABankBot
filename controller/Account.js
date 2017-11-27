var rest = require('../API/RestClient');
var builder = require('botbuilder');
var luis = require('./LuisDialog');

exports.retrieveRates = function(session, base, symbols, amount) {
    var url = "https://api.fixer.io/latest?base=" + base + "&symbols=" + symbols;
    rest.getCurrency(url, session, handleCurrencyResponse, base, amount);
}

exports.retrieveCards = function(session) {
    var url = "http://msabankbot.azurewebsites.net/tables/CreditCards";
    rest.getAllCards(url, session, handleCardResponse);
}

exports.makeApplication = function(session, title, firstName, lastName, dob, email, phone, card) {
    var url = "http://msabankbot.azurewebsites.net/tables/Application";
    rest.postApplication(url, title, firstName, lastName, dob, email, phone, card);
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

function handleCardResponse(body, session) {
    var allDetails = JSON.parse(body);

    var cardCarousel = [];

    for (var det in allDetails) {
        var cardName = allDetails[det].cardName;
        var interestRate = allDetails[det].interestRate;
        var annualFee = allDetails[det].annualFee;
        var interestFreeDays = allDetails[det].interestFree;

        var text = "Interest Rate: " + interestRate + '\n\n' + "Annual Fee: " +
            annualFee + '\n\n' + "Interest Free Days: " + interestFreeDays;

        var card = new builder.HeroCard(session)
            .title(cardName)
            .text(text)
            .buttons([
                builder.CardAction.postBack(session, 'Apply Now', 'Apply Now')
            ]);
        cardCarousel.push(card);
    }
    luis.showCards(session, cardCarousel);
}