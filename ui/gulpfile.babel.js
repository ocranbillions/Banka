import gulp from 'gulp';
import watch from 'gulp-watch';
import bS from 'browser-sync';
import concatCss from 'gulp-concat-css';
const browserSync = bS.create();

gulp.task('watch', liveEdit);

function liveEdit(done) {
	browserSync.init({
		notify: false,
		server: {
			baseDir: './',
		},
	});

	// Watch all html for changes
	watch('./*.html', reloadBrowser);
	watch('./pages/**/*.html', reloadBrowser);

	// Watch all css for changes
	watch('./assets/styles/**/*.css', gulp.series(bundleCss, injectCssToBrowser));
	done();
}

// FUNCTIONS
function bundleCss() {
	return gulp.src('assets/styles/main.css')
		.pipe(concatCss("main.bundle.css"))
		.pipe(gulp.dest('assets/styles/'));
}

function injectCssToBrowser() {
	return gulp.src('./assets/styles/main.bundle.css').pipe(browserSync.stream());
}

function reloadBrowser() {
	browserSync.reload();
}