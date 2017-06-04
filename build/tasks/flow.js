const gulp = require('gulp');
const flow = require('gulp-flowtype');
const childProcess = require('child_process');

gulp.task( 'type-check', () => {
  return gulp.src('./src-dev/_*.js')
    .pipe(flow({
      abort: true
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task( 'strip-types', ['type-check'], () => {
  childProcess.exec('./node_modules/.bin/flow-remove-types -p -o src/prettyFormError.js src/_prettyFormError.js');
});

gulp.task('flow', ['type-check', 'strip-types']);
