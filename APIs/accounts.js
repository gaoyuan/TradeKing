var accounts_wrapper = function(consumer, config, endpoint, callback){
  consumer.get(
    config.api_url + '/accounts/' + endpoint, 
    config.access_token, 
    config.access_secret, 
    function(error, data, response) {
      if (error) {
        console.log(error);
      }else{
        // Parse the JSON data
        parsed_data = JSON.parse(data);
        // Return the response
        callback(parsed_data.response);
      }
    }
  );
};

/*
{ '@id': '754fdc69:1490d0798dd:2e11',
  elapsedtime: '0',
  accountbalance: 
   { account: '60768446',
     accountvalue: '0.0',
     backofficehouseexcess: '0.0',
     fedcall: '0.0',
     housecall: '0.0',
     maintenanceexcess: '0.0',
     money: 
      { accruedinterest: '0.0',
        cash: '0.0',
        cashavailable: '0.0',
        marginbalance: '0.0',
        mmf: '0.0',
        total: '0.0',
        uncleareddeposits: '0.0',
        unsettledfunds: '0.0',
        yield: '0.0' },
     securities: 
      { longoptions: '0.0',
        longstocks: '0.0',
        options: '0.0',
        shortoptions: '0.0',
        shortstocks: '0.0',
        stocks: '0.0',
        total: '0.0' } },
  accountholdings: 
   { displaydata: { totalsecurities: '$.00' },
     totalsecurities: '0.0' } }
*/
exports.accounts = function(consumer, config, callback){
  accounts_wrapper(consumer, config, config.account_id+'.json', callback);
};

/*
{ '@id': '754fdc69:1490d0798dd:3fd0',
  elapsedtime: '0',
  accountbalance: 
   { account: '60768446',
     accountvalue: '0.0',
     backofficehouseexcess: '0.0',
     fedcall: '0.0',
     housecall: '0.0',
     maintenanceexcess: '0.0',
     money: 
      { accruedinterest: '0.0',
        cash: '0.0',
        cashavailable: '0.0',
        marginbalance: '0.0',
        mmf: '0.0',
        total: '0.0',
        uncleareddeposits: '0.0',
        unsettledfunds: '0.0',
        yield: '0.0' },
     securities: 
      { longoptions: '0.0',
        longstocks: '0.0',
        options: '0.0',
        shortoptions: '0.0',
        shortstocks: '0.0',
        stocks: '0.0',
        total: '0.0' } },
  error: 'Success' }
*/
exports.balances = function(consumer, config, callback){
  accounts_wrapper(consumer, config, config.account_id+'/balances.json', callback);
};

/*
{ '@id': '754fdc69:1490d264c7c:-6b2c',
  elapsedtime: '0',
  totalrows: '0',
  transactions: null }

range: all, today, current_week, current_month, last_month
transactions: all, bookkeeping, trade
*/
exports.history = function(consumer, config, range, transactions, callback){
  accounts_wrapper(consumer, config, config.account_id+'/history.json?range='+range+'&transactions='+transactions, callback);
};

/*
{ '@id': '754fdc69:1490d0798dd:35a6',
  elapsedtime: '173',
  requesttimestamp: '2014-10-14T01:24:49.934-04:00',
  timestamp: '2014-10-14T01:24:50.107-04:00',
  accountholdings: { totalsecurities: '0.0' },
  error: 'Success' }
*/
exports.holdings = function(consumer, config, callback){
  accounts_wrapper(consumer, config, config.account_id+'/holdings.json', callback);
};

