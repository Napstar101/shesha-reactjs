const lessBundle = require('less-bundle');

module.exports = (function name() {
  lessBundle(
    {
      src: './src/styles/index.less',
      dest: './dist/styles.less',
    },
    function (err) {
      if (err) {
        console.log('lessBundle error :>> ', err);
      }
    }
  );
})();
