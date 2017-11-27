var rest = require('../API/RestClient');
var builder = require('botbuilder');
var luis = require('./LuisDialog');

exports.retrieveRates = function(session, base, symbols, amount) {
    // if (base == "" || symbols == "" || amount == "") {
    //     session.send("Please complete the currency exchange form");
    //     session.endDialog();
    //     session.beginDialog('Currency');
    // } else {
    var url = "https://api.fixer.io/latest?base=" + base + "&symbols=" + symbols;
    rest.getCurrency(url, session, handleCurrencyResponse, base, amount);
    // session.beginDialog("Welcome");
    // }
}

exports.retrieveCards = function(session) {
    var url = "http://msabankbot.azurewebsites.net/tables/CreditCards";
    rest.getAllCards(url, session, handleCardResponse);
}

exports.makeApplication = function(session, title, firstName, lastName, dob, email, phone, card) {
    var url = "http://msabankbot.azurewebsites.net/tables/Application";
    rest.postApplication(url, title, firstName, lastName, dob, email, phone, card);
}

exports.getApplication = function(session, name) {
    var url = "http://msabankbot.azurewebsites.net/tables/Application";
    rest.getAllAplications(url, session, name, handleApplicationResponse);
}

function handleCurrencyResponse(body, session, base, amount) {
    console.log(body);
    var allDetails = JSON.parse(body);
    for (var det in allDetails.rates) {
        var converted = amount * allDetails.rates[det];
        session.send(amount + " " + base + " to " + det + " is " + converted);
        // session.delay(5000);
        session.beginDialog("Welcome");
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

function handleApplicationResponse(body, session, name) {
    var allApplications = JSON.parse(body);

    for (var app in allApplications) {
        if (allApplications[app].firstname.toLowerCase() == name.toLowerCase()) {
            var title = allApplications[app].title;
            var firstName = allApplications[app].firstname;
            var lastName = allApplications[app].lastname;
            var email = allApplications[app].email;
            var phone = allApplications[app].phone;
            var card = allApplications[app].card;

            var text = title + ' ' + firstName + ' ' + lastName + '\n\n' +
                email + '\n\n' + phone + '\n\n' + card;

            var application = new builder.HeroCard(session)
                .title('Credit Card Application')
                .text(text)
                .buttons([
                    builder.CardAction.postBack(session, 'Welcome', 'Ok'),
                    builder.CardAction.postBack(session, 'Delete', 'Cancel Application')
                ]);

            luis.showApplication(session, application);
        }
    }

}