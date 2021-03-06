var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: "5fe872c9-49c5-4430-8159-46582b8c9942",
    appPassword: "beiIZN41@ntezAGSN465(=*"
        //appID: process.env.MICROSOFT_APP_ID,
        //appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
    session.sendTyping();
    session.beginDialog("Welcome");
    // session.send("You said: %s", session.message.text);
});

luis.startDialog(bot);