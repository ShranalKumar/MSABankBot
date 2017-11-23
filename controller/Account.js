var rest = require('../API/RestClient');

exports.displayBalance = function(session, username) {
    var url = "http://msabankbot.azurewebsites.net/tables/AccDetails";
    rest.getBalance(url, session, username, handleBalanceResponse);
};

function handleBalanceResponse(body, session, username) {
    console.log(body);
    var accDets = JSON.parse(body);
    var allDets = '';

    for (var det in accDets) {
        var user = accDets[det].username;
        var bal = accDets[det].balance;

        if (username.toLowerCase() === user.toLowerCase()) {
            allDets = bal;
        }
    }
    session.send('Your balance is %s', allDets);

}