import {EventEmitter} from "events";

export default class SourceImage extends EventEmitter{
  constructor(img) {
    super();
    this.loaded = false;

    if (typeof img === "string") {
      let src = img;
      img = document.createElement("img");
      img.src = src;
    }
    this.img = img;

    if (img.complete) {
      this._loaded();
    } else {
      img.onload = event => {
        this._loaded();
      };
    }
  }

  get imageData() {
    if (!this.loaded) {
      return null;
    }

    if (!this._imageData) {
      let canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");

      canvas.width = this.width;
      canvas.height = this.height;
      ctx.drawImage(this.img, 0, 0);
      this._imageData = ctx.getImageData(0, 0, this.width, this.height);
    }

    return this._imageData;
  }

  _loaded() {
    this.width = this.img.width;
    this.height = this.img.height;
    this.loaded = true;
    this.emit("ready");
  }
}
