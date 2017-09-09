// Paths used for the gulp tasks
const srcDir = './src';
const destDir = './dist';
const srcTest = './test';
const srcDocs = './docs';

module.exports = {
  srcJquery: `${srcDir}/jquery.prettyFormError.js`,
  srcEs: `${srcDir}/module.prettyFormError.js`,
  bundleOutput: 'module.prettyFormError',
  destJs: destDir,
  srcSass: `${srcDir}/prettyFormError.scss`,
  destSass: destDir,
  srcCss: `${destDir}/prettyFormError.css`,
  destCss: destDir,
  cleanDir: destDir,
  srcServe: destDir,
  srcDir,
  destDir,
  srcSassDocs: `${srcDir}/docs.scss`,
  destSassDocs: './docs',
  srcDocs: `${destDir}/*.min.*`,
  destDocs: `./${srcDocs}/`,
  srcTestUtils: `${srcTest}/utilsSpec.js`,
  watchDocs: [`./${srcDocs}/*`, `./${srcDir}/docs.scss`],
  srcMocha: [ `./${srcTest}`, './', `./${srcDir}` ],
  watchMocha: [`./${srcTest}/*`, `./${srcDir}/typed/*.js`],
  processCommand: './node_modules/.bin/flow-remove-types -p src/typed -d src/'
};
