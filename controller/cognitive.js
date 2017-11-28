var request = require('request');
var builder = require('botbuilder');

exports.analyseImage = function(session) {
    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/46f22fa2-dcff-4e73-a029-3c4809dd714e/url?iterationId=4777fca9-afc1-4cd3-b532-5a49dad87e97',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'fccf9a9570824165a73e1ae985ea3a3f'
        },
        body: { 'Url': session.message.text }
    }, function(err, res, body) {
        console.log(validResponse(body));
        session.send(validResponse(session, body));
    });
}

function validResponse(session, body) {
    if (body && body.Predictions && body.Predictions[0].Tag) {
        var card = new builder.ThumbnailCard(session)
            .title('This is a ' + body.Predictions[0].Tag)
            .images([
                builder.CardImage.create(session, session.message.text)
            ]);
        session.send(new builder.Message(session).addAttachment(card));
        session.message.text = "";
        session.sendTyping();
        session.beginDialog('Welcome');
    } else {
        console.log("Please try again.");
    }
}