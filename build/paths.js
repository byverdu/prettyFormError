// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';
const srcTest = './test';
const srcDocs = './docs';

module.exports = {
  srcJs: [`./src/prettyFormError.js`],
  processCommand: './node_modules/.bin/flow-remove-types -p src/typed/ -d src/',
  minifiedOutput: 'prettyFormError',
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
  destDocs: `./${srcDocs}/`,
  srcTestUtils: `${srcTest}/utilsSpec.js`,
  watchDocs: [`./${srcDocs}/*`, `./${srcDir}/docs.scss`],
};
