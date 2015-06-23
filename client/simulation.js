import SourceImage from "./source_image";
import ImageTransformation from "./image_transformation";
import ImageDisplay from "./image_display";
import Model from "./model";
import Controls from "./controls";


export default class Simulation {
  constructor({src, type}) {
    this.sourceImage = new SourceImage(src);
    this.transformation = new ImageTransformation(type);
    this.model = new Model({min: -100, max: 100});
    this.controls = new Controls(this.model);
    this.display = new ImageDisplay();
  }

  mount(element) {
    element.appendChild(this.display.el);
    element.appendChild(this.controls.el);
  }

  start() {
    this._attachListeners();
    this.model.setValue(0);
  }

  redraw() {
    let value = this._zeroAlignedValue();
    let originalImageData = this.sourceImage.imageData;

    if (originalImageData) {
      let newImageData = this.transformation.apply(originalImageData, value);
      this.display.render(newImageData);
    }
  }

  _zeroAlignedValue() {
    // TODO this is something the model should do
    return this.model.percentualValue * 2 - 1;
  }

  _attachListeners() {
     this.sourceImage.on("ready", () => {
      this.redraw();
    });

    this.model.on("change", () => {
      this.redraw();
    });

  }
}
