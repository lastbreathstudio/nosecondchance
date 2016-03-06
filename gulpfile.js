var gulp         = require('gulp');
    newer = require('gulp-newer');
	imagemin = require('gulp-imagemin');
    browserSync  = require('browser-sync').create();

var source = 'app/',
    dest = 'build/',
    images = {
        in: source + 'images/*.*',
        out: dest + 'images/'
    };

gulp.task('images', function() {
	return gulp.src(images.in)
		.pipe(newer(images.out))
		.pipe(imagemin())
		.pipe(gulp.dest(images.out));
});  

gulp.task('browser-sync', function() {
		browserSync.init({
				server: {
						baseDir: dest
				},
				notify: false
		});
});

gulp.task('watch', function () {

	gulp.watch('build/css/*.css').on("change", browserSync.reload);
	gulp.watch('build/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
