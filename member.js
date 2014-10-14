/*
{ '@id': '754fdc69:1490d264c7c:-22fc',
  elapsedtime: '0',
  userdata: 
   { account: 
      { account: '60768446',
        fundtrading: 'true',
        ira: 'false',
        margintrading: 'false',
        nickname: 'Individual Account',
        shared: 'false',
        stocktrading: 'true' },
     disabled: 'false',
     resetpassword: 'false',
     resettradingpassword: 'false',
     userprofile: { entry: [Object] } },
  error: 'Success' }
*/
exports.profile = function(consumer, config, callback){
  consumer.get(
    config.api_url + '/member/profile.json',
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