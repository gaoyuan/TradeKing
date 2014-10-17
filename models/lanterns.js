var IntensityRatioPredictor = require('../tools/IntensityRatioPredictor');

function Lanterns(){
  this.commission = 4.95;
  this.irp = new IntensityRatioPredictor();
}

Lanterns.prototype.run = function(cash, holdings, trade){
  var cur_price = parseFloat(trade.last);
  var cur_time = new Date(trade.datetime);
  var intensityRatio = this.irp.predict(trade);
  if (intensityRatio > 2.5){
    var qty = Math.floor((cash - this.commission) / cur_price);
    if (qty > 0)
      return qty;
  }else if (intensityRatio < 0.4){
    if (holdings > 0)
      return -holdings;
  }
  return 0;
};

module.exports = Lanterns;