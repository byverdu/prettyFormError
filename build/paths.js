// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';

module.exports = {
  srcJs: `${srcDir}/prettyError.js`,
  destJs: destDir,
  srcSass: `${srcDir}/prettyError.scss`,
  destSass: destDir,
  srcCss: `${destDir}/prettyError.css`,
  destCss: destDir,
  cleanDir: destDir,
  srcHtml: 'index.html',
  destHtml: destDir,
  srcServe: destDir,
  srcMocha: [ './mocha', './' ],
  watchMocha: './mocha/*'
};
