// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';

module.exports = {
  srcJs: `${srcDir}/prettyFormError.js`,
  destJs: destDir,
  srcSass: `${srcDir}/prettyFormError.scss`,
  destSass: destDir,
  srcCss: `${destDir}/prettyFormError.css`,
  destCss: destDir,
  cleanDir: destDir,
  srcServe: destDir,
  srcSassDocs: `${srcDir}/docs.scss`,
  destSassDocs: './docs',
  srcDocs: `${destDir}/*.min.*`,
  destDocs: './docs/',
  watchDocs: ['./docs/*', './src/docs.scss'],
  srcMocha: [ './test', './' ],
  watchMocha: './test/*'
};
