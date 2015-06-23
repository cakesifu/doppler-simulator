export default class ImageDisplay {
  constructor() {
    this.el = document.createElement("canvas");
    this.ctx = this.el.getContext("2d");
  }

  render(imageData) {
    this.el.width = imageData.width;
    this.el.height = imageData.height;
    this.ctx.putImageData(imageData, 0, 0);
  }
}
