// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';

module.exports = {
  srcJs: `${srcDir}/prettyError.js`,
  destJs: destDir,
  srcSass: `${srcDir}/styles.scss`,
  destSass: destDir,
  srcCss: `${destDir}/styles.css`,
  destCss: destDir,
  cleanDir: destDir,
  srcHtml: 'index.html',
  destHtml: destDir,
  srcServe: destDir,
  srcQunit: './qunit/index.html',
  watchQunit: './qunit/*'
};
