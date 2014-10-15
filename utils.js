// turn query options into query string
exports.queryString = function(options){
  return Object.keys(options).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(options[k]);
  }).join('&');
};

// turn param options into param string
var paramString = function(options){
  return Object.keys(options).map(function(k){
    return k + '="' + options[k] + '"';
  }).join(' ');
};

// helper function for generating FIXML outputs
var FIXML = function(options){
  return [
    '<FIXML xmlns="http://www.fixprotocol.org/FIXML-5-0-SP2">',
    '<Order ' + paramString(options.Order) + '>',
    '<Instrmt ' + paramString(options.Instrmt) + '/>',
    '<OrdQty Qty="' + options.Qty + '"/>',
    '</Order>',
    '</FIXML>'
  ].join('');
};

/*
Buy a stock.
*/
exports.FIXML_buy_stock = function(aid, Sym, Qty){
  return FIXML({
    Order: {
      TmInForce: 0,
      Typ: 1,
      Side: 1,
      Acct: aid
    },
    Instrmt: {
      SecTyp: 'CS',
      Sym: Sym
    },
    Qty: Qty
  });
};

/*
Sell a stock.
*/
exports.FIXML_sell_stock = function(aid, Sym, Qty){
  return FIXML({
    Order: {
      TmInForce: 0,
      Typ: 1,
      Side: 2,
      Acct: aid
    },
    Instrmt: {
      SecTyp: 'CS',
      Sym: Sym
    },
    Qty: Qty
  });
};

/*
Short a stock.
*/
exports.FIXML_short_stock = function(aid, Sym, Qty){
  return FIXML({
    Order: {
      TmInForce: 0,
      Typ: 2,
      Side: 5,
      Acct: aid
    },
    Instrmt: {
      SecTyp: 'CS',
      Sym: Sym
    },
    Qty: Qty
  });
};

/*
Buy to cover a stock.
*/
exports.FIXML_cover_stock = function(aid, Sym, Qty){
  return FIXML({
    Order: {
      TmInForce: 0,
      Typ: 2,
      Side: 1,
      AcctTyp: 5,
      Acct: aid
    },
    Instrmt: {
      SecTyp: 'CS',
      Sym: Sym
    },
    Qty: Qty
  });
};
