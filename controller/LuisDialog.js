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
                    builder.CardAction.postBack(session, 'Credit Cards', 'View Credit Cards'),
                    builder.CardAction.postBack(session, 'Currency Exchange', 'View Exchange Rates')
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
        }
    ]).triggerAction({
        matches: 'Cards'
    });

    bot.dialog('Apply', [
        function(session, args) {
            if (session.message && session.message.value) {
                console.log(session.message.value.card);
                var title = session.message.value.title;
                var firstName = session.message.value.firstname;
                var lastName = session.message.value.lastname;
                var dob = session.message.value.datofbirth;
                var email = session.message.value.email;
                var phone = session.message.value.phone;
                var card = session.message.value.card;
                acc.makeApplication(session, title, firstName, lastName, dob, email, phone, card);
            } else {
                var application = getApplicationCard(session);
                var msg = new builder.Message(session).addAttachment(application);
                session.send(msg);
            }
        }
    ]).triggerAction({
        matches: 'Apply'
    });
}

exports.showCards = function(session, cardCarousel) {
    session.send(new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cardCarousel));
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

function getApplicationCard(session) {
    var application = {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            type: "AdaptiveCard",
            body: [{
                    "type": "TextBlock",
                    "text": "Credit Card Application",
                    "size": "large",
                    "weight": "bolder"
                },
                {
                    "type": "TextBlock",
                    "text": "Title*"
                },
                {
                    "type": "Input.ChoiceSet",
                    "id": "title",
                    "style": "compact",
                    "choices": [{
                            "title": "Mr.",
                            "value": "Mr."
                        },
                        {
                            "title": "Mrs.",
                            "value": "Mrs."
                        },
                        {
                            "title": "Miss.",
                            "value": "Miss."
                        },
                        {
                            "title": "Ms.",
                            "value": "Ms."
                        },
                        {
                            "title": "Dr.",
                            "value": "Dr."
                        },
                        {
                            "title": "Hon.",
                            "value": "Hon."
                        },
                        {
                            "title": "Sir.",
                            "value": "Sir."
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "First Name/s*"
                },
                {
                    "type": "Input.Text",
                    "id": "firstname",
                    "placeholder": "Enter your First Name/s..."
                },
                {
                    "type": "TextBlock",
                    "text": "Last Name*"
                },
                {
                    "type": "Input.Text",
                    "id": "lastname",
                    "placeholder": "Enter your Last Name..."
                },
                {
                    "type": "TextBlock",
                    "text": "Date Of Birth* (dd/mm/yyyy)"
                },
                {
                    "type": "Input.Text",
                    "id": "dateofbirth",
                    "placeholder": "Enter your Date Of Birth..."
                },
                {
                    "type": "TextBlock",
                    "text": "Email Address*"
                },
                {
                    "type": "Input.Text",
                    "id": "email",
                    "placeholder": "Enter your email address..."
                },
                {
                    "type": "TextBlock",
                    "text": "Contact Number*"
                },
                {
                    "type": "Input.Text",
                    "id": "phone",
                    "placeholder": "Enter your home or mobile phone number..."
                },
                {
                    "type": "TextBlock",
                    "text": "Which Card would you like to apply for?*"
                },
                {
                    "type": "Input.ChoiceSet",
                    "id": "card",
                    "style": "compact",
                    "choices": [{
                            "title": "Low Rate Visa",
                            "value": "Low Rate Visa"
                        },
                        {
                            "title": "Cash Back Visa",
                            "value": "Cash Back Visa"
                        },
                        {
                            "title": "Airpoints Visa",
                            "value": "Airpoints Visa"
                        },
                        {
                            "title": "Cash Back Visa Platinum",
                            "value": "Cash Back Visa Platinum"
                        },
                        {
                            "title": "Airpoints Visa Platinum",
                            "value": "Airpoints Visa Platinum"
                        }
                    ]
                }
            ],
            actions: [{
                "type": "Action.Submit",
                "title": "Apply Now!"
            }]
        }
    };
    return application;
}