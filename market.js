var utils = require('./utils');

var market_wrapper = function(consumer, config, endpoint, callback){
  consumer.get(
    config.api_url + '/market/' + endpoint, 
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
{ '@id': '754fdc69:1490d264c7c:4695',
  date: '2014-10-14 02:02:55.973999',
  status: { current: 'closed', next: 'pre', change_at: '08:00:00' },
  message: 'Market is open Monday through Friday 9:30AM to 4:00PM EST',
  unixtime: '1413266575' }
*/
exports.clock = function(consumer, config, callback){
  market_wrapper(consumer, config, 'clock.json', callback);
};

/*
{ '@id': '754fdc69:1490d4806b9:-3922',
  quotes: 
   { quote: 
      { adp_100: '96.5216',
        adp_200: '87.2140',
        adp_50: '99.5662',
        adv_21: '57988980',
        adv_30: '66825250',
        adv_90: '56453530',
        ask: '99.9500',
        ask_time: '19:59',
        asksz: '3',
        basis: '4',
        beta: '0.945',
        bid: '99.9100',
        bid_time: '19:59',
        bidsz: '1',
        bidtick: '1',
        chg: '0.9200',
        chg_sign: 'd',
        chg_t: '0.9200',
        cl: '99.8100',
        cusip: '03783310',
        date: '2014-10-13',
        datetime: '2014-10-13T16:14:00-04:00',
        div: '0.4700',
        divexdate: '20140807',
        divfreq: 'Q',
        divpaydt: '20140814',
        dollar_value: '4895325261',
        eps: '6.20',
        exch: 'NASD',
        exch_desc: 'NASDAQ',
        hi: '101.7800',
        iad: '1.88',
        incr_vl: '24',
        last: '99.8100',
        lo: '99.8100',
        name: 'APPLE INC',
        op_flag: '1',
        opn: '101.3300',
        pchg: '0.913 %',
        pchg_sign: 'd',
        pcls: '100.7300',
        pe: '16.10',
        phi: '102.0300',
        plo: '100.3000',
        popn: '100.6900',
        pr_adp_100: '96.3790',
        pr_adp_200: '87.1026',
        pr_adp_50: '99.4636',
        pr_date: '2014-10-10',
        prbook: '4.990',
        prchg: '-0.2900',
        pvol: '66331592',
        qcond: '82',
        secclass: '0',
        sesn: 'regular',
        sesn_vl: '52262671',
        sho: '5,987,867,000',
        symbol: 'AAPL',
        tcond: 'R',
        timestamp: '1413231240',
        tr_num: '277924',
        tradetick: 'e',
        trend: 'eeeeeedude',
        vl: '53583368',
        volatility12: '0.212377',
        vwap: '101.0634',
        wk52hi: '103.7400',
        wk52hidate: '20140902',
        wk52lo: '69.3100',
        wk52lodate: '20131011',
        yield: '1.89' } } }
*/
exports.quotes = function(consumer, config, options, callback){
  market_wrapper(consumer, config, 'ext/quotes.json?' + utils.queryString(options), callback);
};

/*
{ '@id': '754fdc69:1490d264c7c:-6b2c',
  elapsedtime: '0',
  totalrows: '0',
  transactions: null }

keywords:  a comma delimited list of keywords to search on
symbols:   a comma delimited list of symbols to search on
maxhits:   number of results to return (default: 10)
startdate: search for articles between this date and enddate
enddate:   search for articles between start date and this date
*/
exports.news_headlines = function(consumer, config, options, callback){
  market_wrapper(consumer, config, 'news/search.json?' + utils.queryString(options), callback);
};

/*
id: id of the news
*/
exports.news = function(consumer, config, id, callback){
  market_wrapper(consumer, config, 'news/' + id + '.json?', callback);
};

/*
symbols:   a single symbol to search on (symbol parameter is required)
interval:  the requested interval of data to be returned: 5min, 1min, tick (5min is the default)
rpp:       the number of requests per page (only valid for the tick interval, 10 is the default)
index:     the record offset when requesting paginated data (only valid for the tick interval)
startdate: begin date for the range of data between this date and enddate (startdate parameter is required)
enddate:   end date for the range of data requested between start date and this date (enddate parameter is required)
starttime: start time for intraday data requests
*/
exports.timesales = function(consumer, config, options, callback){
  market_wrapper(consumer, config, 'timesales.json?' + utils.queryString(options), callback);
};


/*
listType:
toplosers                     Top losers by dollar amount
toppctlosers                  Top percentage losers
topvolume                     Top volume
topactive                     Top active
topgainers                    Top gainers by dollar amount
toppctgainers                 Top percentage gainers
topactivegainersbydollarvalue Top active gainers by dollar value
*/
exports.toplists = function(consumer, config, listType, callback){
  market_wrapper(consumer, config, 'toplists/' + listType + '.json', callback);
}


