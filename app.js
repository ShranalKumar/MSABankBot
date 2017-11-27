var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appID: 'aa100423-6c66-48c4-acc5-f168241a6784',
    appPassword: 'aXM983[!ikeelsKOEUW64_('
});

var bot = new builder.UniversalBot(connector, function(session) {
    session.sendTyping();
    session.beginDialog("Welcome");
    session.send("You said: %s", session.message.text);
});

server.post('/api/messages', connector.listen());

luis.startDialog(bot);