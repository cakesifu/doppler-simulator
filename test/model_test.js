import {assert} from "chai";
import sinon from "sinon";

import Model from "../client/model";


describe("Model", function() {
  beforeEach(function() {
    this.model = new Model({min: -100, max: 100});
  });

  it("defaults to null", function() {
    assert.isNull(this.model.value);
  });

  it("emits on value changes", function(done) {
    this.model.on("change", value => {
      assert.equal(value, 20);
      assert.equal(this.model.value, 20);
      done();
    });

    this.model.setValue(20);
  });

  it("rounds to integer", function() {
    this.model.setValue(20.7);

    assert.equal(this.model.value, 21);
  });

  it("handles string inputs", function() {
    this.model.setValue("20.7");

    assert.equal(this.model.value, 21);
  });

  it("allows setting value as percent", function() {
    this.model.setPercentualValue(0.6);

    assert.equal(this.model.value, 20);
  });

  it("allows reading value as percent", function() {
    this.model.setValue(20);

    assert.equal(this.model.percentualValue, 0.6);
  });

  it("allows reading a zero aligned percent", function() {
    this.model.setValue(-20);

    assert.closeTo(this.model.zeroAlignedPercent, -0.2, 0.000001);
  });

  it("doesn't emit if real value doesn't change", function() {
    let callback = sinon.spy();

    this.model.on("change", callback);

    this.model.setValue(20);
    this.model.setValue("20");
    this.model.setValue("20.1");
    this.model.setPercentualValue(0.6);

    assert.ok(callback.withArgs(20).calledOnce, "event emitted multiple times");
  });

  it("doesn't allow values outside inteval", function() {
    this.model.setValue(150);
    assert.equal(this.model.value, 100);

    this.model.setValue(-150);
    assert.equal(this.model.value, -100);
  });
});
