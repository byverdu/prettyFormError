import gulp from 'gulp';
require( 'require-dir' )( './build/tasks' );

gulp.task( 'dev', [ 'build-dev', 'watch-dev' ]);
// gulp.task( 'prouction', [ 'build' ]);
// gulp.task( 'tests', [ 'serve-test', 'watch' ]);
// gulp.task( 'docs', [ 'serve-docs', 'watch' ]);

// gulp.task('clean-src', ['type-check', 'strip-types'], () => {
//   return gulp
//     .src('src/prettyFormError.js')
//     .pipe(stripLine([
//       /^\/\*\s*global PrettyFormError \*\//,
//       /^\/\*\s* \*\//
//     ]))
//     .pipe(gulp.dest('src-tes'));
// });

// const stripLine  = require('gulp-strip-line');
