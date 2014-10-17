function IntensityRatioPredictor(){
  this.tickSize = 0.01;
  this.mu = 1.0;
  this.alpha = 1.2;
  this.beta = 1.8;
  this.exp = Math.exp(-this.beta);
  this.upFlag = false;
  this.prev = 0.0;
  this.lastTick = new Date();
  this.bFactor = 0.0;
  this.sFactor = 0.0;  
}

/*
Predict the buy/sell intensity given trade information.
*/
IntensityRatioPredictor.prototype.predict = function(trade){
  var cur = parseFloat(trade.last);
  var cur_time = new Date(trade.datetime);
  var ratio = 0.0;
  if (this.prev != 0.0 && this.lastTick.getDate() == cur_time.getDate()){
    var pips = Math.abs(this.prev - cur) / tickSize;

    var buyintensity = 0.0;
    var sellintensity = 0.0;

    if (this.prev > cur){
      this.bFactor *= exp;
      if(upFlag){
        this.sFactor *= exp;
      }
      this.sFactor += exp * pips;
    }else if (prev < cur){
      this.sFactor *= exp;
      if (!upFlag){
        this.bFactor *= exp;
      }
      this.bFactor += exp * pips;
    }else{
      this.bFactor *= exp;
      this.sFactor *= exp;
    }
    buyintensity = this.mu + this.alpha * this.bFactor;
    sellintensity = this.mu + this.alpha * this.sFactor;
    ratio = buyintensity / sellintensity;
  }
  this.prev = cur;
  this.lastTick = cur_time;
  return ratio;
}

module.exports = IntensityRatioPredictor;