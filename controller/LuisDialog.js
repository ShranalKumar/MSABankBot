var builder = require('botbuilder');
var acc = require('./Account');

exports.startDialog = function(bot) {
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/02ab0ac7-1be0-4246-aa9d-7a86726bbf5d?subscription-key=d1c174e41a47422aa30e74c7f2429503&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);
    session.send('What would you like to do?');


    bot.dialog('ViewBalance', [
        function(session, args, next) {
            session.dialogData.args = args || {};

            if (!session.conversationData['username']) {
                builder.Prompts.text(session, "Enter your name to get started.");
            } else {
                next();
            }
        },
        function(session, results, next) {
            if (results.response) {
                session.conversationData['username'] = results.response;
            }
            session.send('Retreiving balance information...');
            acc.displayBalance(session, session.conversationData["username"]);

        }
    ]).triggerAction({
        matches: 'ViewBalance'
    });
}