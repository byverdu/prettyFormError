import gulp from 'gulp';

gulp.task( 'build', [
  'clean',
  'minify',
  'move-js',
  'sass',
  'css-minify',
  'move-html'
]);
