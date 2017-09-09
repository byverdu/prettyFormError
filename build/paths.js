// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';
const srcTest = './test';
const srcDocs = './docs';

module.exports = {
  srcJs: `${srcDir}/prettyFormError.js`,
  processCommand: './node_modules/.bin/flow-remove-types -p src/typed/ -d src/',
  minifiedOutput: 'prettyFormError',
  destDir,
  srcDir,
  srcSass: `${srcDir}/prettyFormError.scss`,
  srcCss: `${destDir}/prettyFormError.css`,
  srcSassDocs: `${srcDir}/docs.scss`,
  destSassDocs: './docs',
  srcDocs: `${destDir}/*.min.*`,
  destDocs: `./${srcDocs}/`,
  srcTestUtils: `${srcTest}/utilsSpec.js`,
  watchDocs: [`./${srcDocs}/*`, `./${srcDir}/docs.scss`],
};
