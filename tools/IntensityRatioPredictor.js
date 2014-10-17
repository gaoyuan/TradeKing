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
    var pips = Math.abs(this.prev - cur) / this.tickSize;

    var buyintensity = 0.0;
    var sellintensity = 0.0;

    if (this.prev > cur){
      this.bFactor *= this.exp;
      if(this.upFlag){
        this.sFactor *= this.exp;
      }
      this.sFactor += this.exp * pips;
    }else if (this.prev < cur){
      this.sFactor *= this.exp;
      if (!this.upFlag){
        this.bFactor *= this.exp;
      }
      this.bFactor += this.exp * pips;
    }else{
      this.bFactor *= this.exp;
      this.sFactor *= this.exp;
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