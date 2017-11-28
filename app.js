var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appID: '28ce156a-ebf9-4967-93f7-7291da60ebe3',
    appPassword: 'cbzVMBF6808)[ipyvVUX5|}'
        // appID: process.env.MICROSOFT_APP_ID,
        // appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
    session.sendTyping();
    session.beginDialog("Welcome");
    session.send("You said: %s", session.message.text);
});

luis.startDialog(bot);