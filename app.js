// Use the OAuth module
var oauth = require('oauth');
var config = require('./config');
var accountsAPI = require('./accounts');
var memberAPI = require('./member');
var marketAPI = require('./market');

// Setup the OAuth Consumer
var me = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  config.consumer_key,
  config.consumer_secret,
  "1.0",
  "http://mywebsite.com/tradeking/callback",
  "HMAC-SHA1");

marketAPI.toplists(me, config, 'topgainers', function(data){
  console.log(data.quotes);
});

/*
// var oa = new oauth.OAuth(null, null, config.consumer_key, config.consumer_secret, "1.0", null, "HMAC-SHA1");
var request = tradeking_consumer.get("https://stream.tradeking.com/v1/market/quotes?symbols=AAPL", 
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