import gulp from 'gulp';

gulp.task( 'build', [
  'minify',
  'move-js',
  'sass',
  'css-minify'
]);
