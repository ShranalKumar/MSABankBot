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