/*
Make an order.
body in FIXML format.
*/
exports.make_order = function(consumer, config, body, callback){
  consumer.post(
    config.api_url + '/accounts/' + config.account_id + '/orders.json',
    config.access_token, 
    config.access_secret,
    body,
    'application/xml',
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
Preview an order.
body in FIXML format.
*/
exports.preview_order = function(consumer, config, body, callback){
  consumer.post(
    config.api_url + '/accounts/' + config.account_id + '/orders/preview.json',
    config.access_token, 
    config.access_secret,
    body,
    'application/xml',
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
Get the most recent orders.
*/
exports.get_order = function(consumer, config, callback){
  consumer.get(
    config.api_url + '/accounts/' + config.account_id + '/orders.json',
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