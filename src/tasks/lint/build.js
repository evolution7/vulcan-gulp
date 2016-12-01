import eslint from 'gulp-eslint';

module.exports = function (gulp, config) {
    gulp.task('lint:build', function () {
        return gulp.src([
            config.scripts.watch,
            `!${config.scripts.vendor}`
        ])
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format());
    });
};
