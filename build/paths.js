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
  srcServe: destDir,
  srcSassDocs: `${srcDir}/docs.scss`,
  destSassDocs: './docs',
  srcDocs: `${destDir}/*.min.*`,
  destDocs: './docs/',
  watchDocs: ['./docs/*', './src/docs.scss'],
  srcMocha: [ './mocha', './' ],
  watchMocha: './mocha/*'
};
