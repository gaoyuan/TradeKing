TradeKing
=========
Trading Strategy for my personal TradeKing account

Setup
------------
1. Clone the repository

	git clone git@github.com:gaoyuan/TradeKing.git 

2. Download the latest version of Nodejs.

3. Install all the node modules.

	npm install

4. Create your own _config.js_.

	var config = {};
	config.account_id = Your_Trade_King_Account_ID;
	config.api_url = 'https://api.tradeking.com/v1';
	config.stream_url = 'https://stream.tradeking.com/v1/';
	config.consumer_key = Your_Trade_King_Consumer_Key;
	config.consumer_secret = Your_Trade_King_Consumer_Secret;
	config.access_token = Your_Trade_King_Access_Token;
	config.access_secret = Your_Trade_King_Access_Secret;
	module.exports = config;

5. Start the trading algorithm.

	npm start

