describe('pooling layer: GlobalAveragePooling1D', function() {
  const assert = chai.assert;
  const styles = testGlobals.styles;
  const logTime = testGlobals.logTime;
  const stringifyCondensed = testGlobals.stringifyCondensed;
  const approxEquals = KerasJS.testUtils.approxEquals;
  const layers = KerasJS.layers;

  const testParams = [
    { inputShape: [ 6, 6 ] },
    { inputShape: [ 3, 7 ] },
    { inputShape: [ 8, 4 ] }
  ];

  before(function() {
    console.log('\n%cpooling layer: GlobalAveragePooling1D', styles.h1);
  });

  testParams.forEach(({ inputShape }, i) => {
    const key = `pooling.GlobalAveragePooling1D.${i}`;
    const [ inputLength, inputFeatures ] = inputShape;
    const title = `[${key}] test: ${inputLength}x${inputFeatures} input`;

    it(title, function() {
      console.log(`\n%c${title}`, styles.h3);
      let testLayer = new layers.GlobalAveragePooling1D();
      let t = new KerasJS.Tensor(
        TEST_DATA[key].input.data,
        TEST_DATA[key].input.shape
      );
      console.log('%cin', styles.h4, stringifyCondensed(t.tensor));
      const startTime = performance.now();
      t = testLayer.call(t);
      const endTime = performance.now();
      console.log('%cout', styles.h4, stringifyCondensed(t.tensor));
      logTime(startTime, endTime);
      const dataExpected = new Float32Array(TEST_DATA[key].expected.data);
      const shapeExpected = TEST_DATA[key].expected.shape;
      assert.deepEqual(t.tensor.shape, shapeExpected);
      assert.isTrue(approxEquals(t.tensor, dataExpected));
    });
  });
});
