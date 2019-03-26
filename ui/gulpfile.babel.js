import gulp from 'gulp';
import watch from 'gulp-watch';
import bS from 'browser-sync';

const browserSync = bS.create();

// Run all tasks
// gulp.task('styles', bundleCss);

gulp.task('watch', liveEdit);


// function bundleCss() {
// 	return gulp
// 		.src('./styles/main.css')
// 		.on('error', (errorInfo) => {
// 			console.log(errorInfo.toString());
// 			this.emit('end');
// 		})
// 		.pipe(gulp.dest('./'));
// }

function injectCss() {
	return gulp.src('./styles/main.css').pipe(browserSync.stream());
}

function reloadBrowser() {
	browserSync.reload();
}

function liveEdit(done) {
	browserSync.init({
		notify: false,
		server: {
			baseDir: './',
		},
	});

	watch('./*.html', reloadBrowser);
	watch('./pages/**/*.html', reloadBrowser);
	watch('./styles/**/*.css', injectCss);
	// watch('./styles/**/*.css', gulp.series(bundleCss, injectCss));

	done();
}