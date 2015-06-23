import {EventEmitter} from "events";

export default class Model extends EventEmitter{
  constructor({min, max}) {
    super();

    this._min = min;
    this._max = max;
    this.value = null;
    this.percentualValue = null;
  }

  setValue(value) {
    value = Math.round(value);

    if (value < this._min) {
      value = this._min;
    }

    if (value > this._max) {
      value = this._max;
    }

    if (value != this.value) {
      this.value = value;
      this.percentualValue = (value - this._min) / (this._max - this._min);
      this.zeroAlignedPercent = this.percentualValue * 2 - 1;
      this.emit("change", value);
    }
  }

  setPercentualValue(p) {
    let value = (this._max - this._min) * p + this._min;
    this.setValue(value);
  }
}
