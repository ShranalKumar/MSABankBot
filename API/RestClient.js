var request = require('request');

exports.getCurrency = function(url, session, callback, base, amount) {
    request.get(url, { 'headers': { 'ZUMO-API-VERSION': '2.0.0' } }, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, session, base, amount);
        }
    });
}

exports.getAllCards = function(url, session, callback) {
    request.get(url, { 'headers': { 'ZUMO-API-VERSION': '2.0.0' } }, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, session);
        }
    });
}

exports.getAllAplications = function(url, session, name, callback) {
    request.get(url, { 'headers': { 'ZUMO-API-VERSION': '2.0.0' } }, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            callback(body, session, name);
        }
    });
}

exports.postApplication = function(url, title, firstName, lastName, dob, email, phone, card) {
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type': 'application/json'
        },
        json: {
            "title": title,
            "firstname": firstName,
            "lastname": lastName,
            "dob": dob,
            "email": email,
            "phone": phone,
            "card": card
        }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    });
}