import SourceImage from "../client/source_image";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import {assert} from "chai";

function triggerEvents(img) {
  setTimeout( ()=> {
    let event = {};
    if (img.onload) {
      img.onload(event);
    }
  }, 0);
}

describe("SourceImage", function() {
  beforeEach(function() {
    global.document = {
      createElement: sinon.stub()
    };

    this.img = {
      on: sinon.stub(),
      width: 100,
      height: 100
    };
  });

  it("can be initialized with a string", function() {
    let sourceImage;
    document.createElement.returns(this.img);

    sourceImage = new SourceImage("foo.png");

    assert.ok(document.createElement.calledWith("img"));
  });


  it("should emit 'ready' when loaded and expose some props", function(done) {
    let sourceImage;

    sourceImage = new SourceImage(this.img);

    sourceImage.on("ready", function() {
      assert.equal(sourceImage.width, 100);
      assert.equal(sourceImage.height, 100);
      assert.equal(sourceImage.loaded, true);
      done();
    });

    triggerEvents(this.img);
  });


  context("image data", function() {

    it("should return null if not loaded", function() {
      let sourceImage = new SourceImage(this.img);

      assert.isNull(sourceImage.imageData);

      triggerEvents(this.img);
    });


    it.skip("should return image data", function() {
      // without jsdom or a real browser env it's pretty weird to test this one
    });
  });
});

