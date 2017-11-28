var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appID: "8e7b978a-fd72-496c-80b5-32e2b068a260",
    appPassword: "felV26!womcLBGXTI633}_?"
        // appID: process.env.MICROSOFT_APP_ID,
        // appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
    session.sendTyping();
    session.beginDialog("Welcome");
    // session.send("You said: %s", session.message.text);
});

luis.startDialog(bot);