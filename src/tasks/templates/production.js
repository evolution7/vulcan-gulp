import revReplace from 'gulp-rev-replace';

module.exports = function (gulp, config) {
    gulp.task('templates:production', ['styles:production', 'scripts:production'], function () {
        return gulp.src(config.templates.source)
            .pipe(revReplace({
                manifest: gulp.src('./rev-manifest.json')
            }))
            .pipe(gulp.dest(config.templates.output));
    });
};
