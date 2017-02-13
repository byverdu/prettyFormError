import gulp from 'gulp';

gulp.task('move-docs-js', () => {
  gulp.src('./dist/*.min.*')
    .pipe(gulp.dest('./docs'))
})

gulp.task( 'build-docs', [
  'move-docs-js'
]);
