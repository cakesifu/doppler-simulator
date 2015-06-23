const RESOLUTION = 100;

export default class Controls {
  constructor(model) {
    this.el = document.createElement("div");
    this.el.className = "controls";

    this.input = new InputControl(model);
    this.range = new RangeControl(model);

    this.el.appendChild(this.input.el);
    this.el.appendChild(this.range.el);
  }
}


class InputControl {
  constructor(model) {
    this.model = model;
    this.el = document.createElement("input");
    this.el.type = "number";

    this.el.onchange = ev => {
      this._handleInputValue(ev);
    };


    this.model.on("change", (value) => {
      this._handleModelChange(value);
    });
  }

  _handleInputValue(ev) {
    this.model.setValue(this.el.value);
  }

  _handleModelChange(value) {
    this.el.value = value;
  }
}


class RangeControl {
  constructor(model) {
    this.model = model;
    this.el = document.createElement("input");
    this.el.type = "range";
    this.el.min = 0;
    this.el.max = RESOLUTION;
    this.el.step = 1;

    this.el.onchange = ev => {
      this._handleInputValue(ev);
    };

    this.model.on("change", (value) => {
      this._handleModelChange(value);
    });
  }

  _handleInputValue(ev) {
    let inputValue = this.el.value;
    let percent = inputValue * inputValue / (RESOLUTION * RESOLUTION);

    this.model.setPercentualValue(percent);
  }

  _handleModelChange(value) {
    let sliderValue = Math.sqrt(this.model.percentualValue * RESOLUTION * RESOLUTION);
    this.el.value = sliderValue;
  }
}
