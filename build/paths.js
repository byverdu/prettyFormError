// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';
const srcTest = './test';
const srcDev = './src-dev';
const srcDocs = './docs';

module.exports = {
  srcJs: `${srcDir}/prettyFormError.js`,
  destJs: destDir,
  srcSass: `${srcDir}/prettyFormError.scss`,
  destSass: destDir,
  srcCss: `${destDir}/prettyFormError.css`,
  destCss: destDir,
  cleanDir: destDir,
  srcServe: destDir,
  srcDev,
  srcDir,
  srcSassDocs: `${srcDir}/docs.scss`,
  destSassDocs: './docs',
  srcDocs: `${destDir}/*.min.*`,
  destDocs: `./${srcDocs}/`,
  watchDocs: [`./${srcDocs}/*`, `./${srcDir}/docs.scss`],
  srcMocha: [ `./${srcTest}`, './' ],
  watchMocha: [`./${srcTest}/*`, `./${srcDev}/*.js`],
  processCommand: './node_modules/.bin/flow-remove-types -p -o src/prettyFormError.js src/_prettyFormError.js'
};
