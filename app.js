var oauth = require('oauth')
  , utils = require('./utils')
  , config = require('./config')
  , accountsAPI = require('./APIs/accounts')
  , marketAPI = require('./APIs/market')
  , ordersAPI = require('./APIs/orders')
  , Laterns = require('./models/lanterns');

var me = new oauth.OAuth(
  "https://developers.tradeking.com/oauth/request_token",
  "https://developers.tradeking.com/oauth/access_token",
  config.consumer_key,
  config.consumer_secret,
  "1.0",
  "http://localhost/tradeking/callback",
  "HMAC-SHA1");

var robot = new Laterns();
marketAPI.stream(me, config, "SPY", function(data){
  var t = data.trade;
  if (t && t.last){
    accountsAPI.balances(me, config, function(balanceData){
      accountsAPI.holdings(me, config, function(holdingData){
        var cash = parseFloat(balanceData.accountbalance.money.cashavailable);
        var holdings = parseInt(holdingData.accountholdings.holding.qty);
            var qty = robot.run(t);
        if (qty > 0){
          ordersAPI.make_order(me, config, utils.FIXML_buy_stock(config.account_id, "SPY", qty), function(data){
            console.log('Long: ' + qty.toString());
          });
        }else if (qty < 0){
          ordersAPI.make_order(me, config, utils.FIXML_sell_stock(config.account_id, "SPY", qty), function(data){
            console.log('Short: ' + qty.toString());
          });
        }
      });
    });
  }
});
