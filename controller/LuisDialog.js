var builder = require('botbuilder');
var acc = require('./Account');

exports.startDialog = function(bot) {
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/02ab0ac7-1be0-4246-aa9d-7a86726bbf5d?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('Welcome', [
        function(session, args, next) {
            console.log("hi");
            session.dialogData.args = args || {};
            var welcome = new builder.HeroCard(session)
                .title("Welcome to the Contoso Bank Bot")
                .subtitle("What would you like to do today?")
                .buttons([
                    builder.CardAction.imBack(session, 'Credit Cards', 'View Credit Cards'),
                    builder.CardAction.imBack(session, 'Currency Exchange', 'View Exchange Rates')
                ]);
            session.send(new builder.Message(session).addAttachment(welcome));
        }
    ]).triggerAction({
        matches: 'Welcome'
    });

    bot.dialog('Currency', [
        function(session, args) {
            if (session.message && session.message.value) {
                console.log(session.message.value);
                var base = session.message.value.base;
                var symbol = session.message.value.symbol;
                var amount = session.message.value.amount;
                acc.retrieveRates(session, base, symbol, amount);
            } else {
                session.dialogData.args = args || {};
                var adaptiveCard = getExchangeCard(session);
                var msg = new builder.Message(session).addAttachment(adaptiveCard)
                session.send(msg);
            }
        }
    ]).triggerAction({
        matches: 'Currency'
    });

    bot.dialog('CreditCard', [
        function(session, args) {
            acc.retrieveCards(session);
            session.send("cards");
        }
    ]).triggerAction({
        matches: 'Cards'
    });
}

function getExchangeCard(session) {
    var exchange = {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            type: "AdaptiveCard",
            body: [{
                    "type": "TextBlock",
                    "text": "Exchange currency",
                    "size": "large",
                    "weight": "bolder"
                },
                {
                    "type": "TextBlock",
                    "text": "From: "
                },
                {
                    "type": "Input.ChoiceSet",
                    "id": "base",
                    "style": "compact",
                    "choices": [{
                            "title": "Australian Dollar",
                            "value": "AUD"
                        },
                        {
                            "title": "Bulgarian Lev",
                            "value": "BGN"
                        },
                        {
                            "title": "Brazillian Real",
                            "value": "BRL"
                        },
                        {
                            "title": "Canadian Dollar",
                            "value": "CAD"
                        },
                        {
                            "title": "Swiss Franc",
                            "value": "CHF"
                        },
                        {
                            "title": "Chinese Yuan",
                            "value": "CNY"
                        },
                        {
                            "title": "Czech Koruna",
                            "value": "CZK"
                        },
                        {
                            "title": "Danish Krone",
                            "value": "DKK"
                        },
                        {
                            "title": "British Pound",
                            "value": "GBP"
                        },
                        {
                            "title": "Hong Kong Dollar",
                            "value": "HKD"
                        },
                        {
                            "title": "Croatian Kuna",
                            "value": "HRK"
                        },
                        {
                            "title": "Hungarian Forint",
                            "value": "HUF"
                        },
                        {
                            "title": "Indonesian Rupiah",
                            "value": "IDR"
                        },
                        {
                            "title": "Israeli New Shekel",
                            "value": "ILS"
                        },
                        {
                            "title": "Indian Rupee",
                            "value": "INR"
                        },
                        {
                            "title": "Japanese Yen",
                            "value": "JPY"
                        },
                        {
                            "title": "South Korean Won",
                            "value": "KRW"
                        },
                        {
                            "title": "Mexican Peso",
                            "value": "MXN"
                        },
                        {
                            "title": "Malaysian Ringgit",
                            "value": "MYR"
                        },
                        {
                            "title": "Norwegian Krone",
                            "value": "NOK"
                        },
                        {
                            "title": "New Zealand Dollar",
                            "value": "NZD"
                        },
                        {
                            "title": "Philippene Peso",
                            "value": "PHP"
                        },
                        {
                            "title": "Polish Zloty",
                            "value": "PLN"
                        },
                        {
                            "title": "Romanian Leu",
                            "value": "RON"
                        },
                        {
                            "title": "Russian Ruble",
                            "value": "RUB"
                        },
                        {
                            "title": "Swedish Krona",
                            "value": "SEK"
                        },
                        {
                            "title": "Singapore Dollar",
                            "value": "SGD"
                        },
                        {
                            "title": "Thai Baht",
                            "value": "THB"
                        },
                        {
                            "title": "Turkish Lira",
                            "value": "TRY"
                        },
                        {
                            "title": "United States Dollar",
                            "value": "USD"
                        },
                        {
                            "title": "South African Rand",
                            "value": "ZAR"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "To: "
                },
                {
                    "type": "Input.ChoiceSet",
                    "id": "symbol",
                    "style": "compact",
                    "choices": [{
                            "title": "Australian Dollar",
                            "value": "AUD"
                        },
                        {
                            "title": "Bulgarian Lev",
                            "value": "BGN"
                        },
                        {
                            "title": "Brazillian Real",
                            "value": "BRL"
                        },
                        {
                            "title": "Canadian Dollar",
                            "value": "CAD"
                        },
                        {
                            "title": "Swiss Franc",
                            "value": "CHF"
                        },
                        {
                            "title": "Chinese Yuan",
                            "value": "CNY"
                        },
                        {
                            "title": "Czech Koruna",
                            "value": "CZK"
                        },
                        {
                            "title": "Danish Krone",
                            "value": "DKK"
                        },
                        {
                            "title": "British Pound",
                            "value": "GBP"
                        },
                        {
                            "title": "Hong Kong Dollar",
                            "value": "HKD"
                        },
                        {
                            "title": "Croatian Kuna",
                            "value": "HRK"
                        },
                        {
                            "title": "Hungarian Forint",
                            "value": "HUF"
                        },
                        {
                            "title": "Indonesian Rupiah",
                            "value": "IDR"
                        },
                        {
                            "title": "Israeli New Shekel",
                            "value": "ILS"
                        },
                        {
                            "title": "Indian Rupee",
                            "value": "INR"
                        },
                        {
                            "title": "Japanese Yen",
                            "value": "JPY"
                        },
                        {
                            "title": "South Korean Won",
                            "value": "KRW"
                        },
                        {
                            "title": "Mexican Peso",
                            "value": "MXN"
                        },
                        {
                            "title": "Malaysian Ringgit",
                            "value": "MYR"
                        },
                        {
                            "title": "Norwegian Krone",
                            "value": "NOK"
                        },
                        {
                            "title": "New Zealand Dollar",
                            "value": "NZD"
                        },
                        {
                            "title": "Philippene Peso",
                            "value": "PHP"
                        },
                        {
                            "title": "Polish Zloty",
                            "value": "PLN"
                        },
                        {
                            "title": "Romanian Leu",
                            "value": "RON"
                        },
                        {
                            "title": "Russian Ruble",
                            "value": "RUB"
                        },
                        {
                            "title": "Swedish Krona",
                            "value": "SEK"
                        },
                        {
                            "title": "Singapore Dollar",
                            "value": "SGD"
                        },
                        {
                            "title": "Thai Baht",
                            "value": "THB"
                        },
                        {
                            "title": "Turkish Lira",
                            "value": "TRY"
                        },
                        {
                            "title": "United States Dollar",
                            "value": "USD"
                        },
                        {
                            "title": "South African Rand",
                            "value": "ZAR"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "Amount"
                },
                {
                    "type": "Input.Text",
                    "id": "amount",
                    "placeholder": "Enter amount to convert..."
                }
            ],
            actions: [{
                "type": "Action.Submit",
                "title": "Submit"
            }]
        }
    };
    return exchange;
}