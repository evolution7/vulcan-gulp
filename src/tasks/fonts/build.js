module.exports = function (gulp, config) {
    gulp.task('fonts:build', function () {
        return gulp.src(config.fonts.source)
            .pipe(gulp.dest(config.fonts.output));
    });
};
