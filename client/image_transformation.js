import convert from "color-convert";

const strategies = {
  "simple": simpleStrategy,
  "hue-alteration": hueAlterationStrategy
};

export default class ImageTransformation {
  constructor(strategy) {
    this._fn = strategies[strategy];
  }

  apply(imageData, offset) {
    // TODO can be properly unit tested
    // TODO needs performance testing

    let newImageData = new ImageData(imageData.width, imageData.height);
    let oldData = imageData.data;
    let newData = newImageData.data;
    let length = oldData.length;

    for(let pixelNo = 0; pixelNo < length; pixelNo += 4) {
      let red = oldData[pixelNo];
      let green = oldData[pixelNo + 1];
      let blue = oldData[pixelNo + 2];
      let alpha = oldData[pixelNo + 3];

      if (offset) {
        [red, green, blue] = this._fn(red, green, blue, offset);
      }

      newData[pixelNo] = red;
      newData[pixelNo + 1] = green;
      newData[pixelNo + 2] = blue;
      newData[pixelNo + 3] = alpha;
    }

    return newImageData;
  }
}

function simpleStrategy(r, g, b, offset) {
  if (offset > 0) {
    r = r + 255 * offset;
    g = g * (1 - offset / 1.5);
    b = b * (1 - offset / 1.5);
  } else {
    offset = -offset;
    b = b + 255 * offset;
    r = r * (1 - offset / 1.5);
    g = g * (1 - offset / 1.5);
  }
  return [r, g, b];
}

function hueAlterationStrategy(r, g, b, offset) {
  if (offset === 0) {
    return [r, g, b];
  }

  let [h, s, l] = convert.rgb2hsl(r, g, b);

  if (offset < 0) {
    h = h + (240 - h) * -offset;
  } else {
    h = h * (1 - offset);
  }

  return convert.hsl2rgb(h, s, l);
}
