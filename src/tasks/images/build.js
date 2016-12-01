module.exports = function (gulp, config) {
    gulp.task('images:build', function () {
        return gulp.src(config.images.source)
            .pipe(gulp.dest(config.images.output));
    });
};
