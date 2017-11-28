var request = require('request');
var builder = require('botbuilder');

exports.analyseImageUrl = function(session) {
    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/46f22fa2-dcff-4e73-a029-3c4809dd714e/url?iterationId=0c17c9f6-d1ae-48c4-86cd-19ea6c073821',
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

exports.analyseImageFile = function(session) {
    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/46f22fa2-dcff-4e73-a029-3c4809dd714e/image?iterationId=0c17c9f6-d1ae-48c4-86cd-19ea6c073821',
        json: true,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': 'fccf9a9570824165a73e1ae985ea3a3f'
        },
        body: session.message.attachments[0].contentUrl
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