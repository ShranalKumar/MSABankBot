var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appID: '16db0dd2-ae1b-466b-9395-7d3918b633d1',
    appPassword: 'sqfrYFHXB68%}misYY958-!'
});

var bot = new builder.UniversalBot(connector, function(session) {
    session.sendTyping();
    session.beginDialog("Welcome");
    session.send("You said: %s", session.message.text);
});

server.post('/api/messages', connector.listen());

luis.startDialog(bot);