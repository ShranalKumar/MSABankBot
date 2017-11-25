var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appID: 'aa100423-6c66-48c4-acc5-f168241a6784',
    appPassword: 'jxdhLJBO98@#fqpWTT067+-'
});


console.log("bot");
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.on('conversationUpdate', function(session) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function(identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});

bot.dialog('/', function(session) {
    session.send("Hello");
});

//luis.startDialog(bot);