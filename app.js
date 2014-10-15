// Use the OAuth module
var oauth = require('oauth')
  , utils = require('./utils')
  , config = require('./config')
  , accountsAPI = require('./APIs/accounts')
  , memberAPI = require('./APIs/member')
  , marketAPI = require('./APIs/market')
  , ordersAPI = require('./APIs/orders');

// Setup the OAuth Consumer
var me = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  config.consumer_key,
  config.consumer_secret,
  "1.0",
  "http://localhost/tradeking/callback",
  "HMAC-SHA1");

/*
// var oa = new oauth.OAuth(null, null, config.consumer_key, config.consumer_secret, "1.0", null, "HMAC-SHA1");
var request = me.get("https://stream.tradeking.com/v1/market/quotes?symbols=SPY", 
config.access_token, 
config.access_secret);

request.on('response', function (response) {
    response.setEncoding('utf8');
    response.on('data', function(data) {
        console.log(data);
    })
});
request.end();
*/