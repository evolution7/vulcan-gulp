import runSequence from 'run-sequence';

module.exports = function (gulp) {
    const rs = runSequence.use(gulp);

    gulp.task('dev', function (done) {
        // Run clean task before all others.
        // icons:build should be run before to remove the need
        // to run it as a dependency of styles:development for watch task
        rs('clean', 'icons:build', [
            'fonts:build',
            'images:build',
            'izr:build',
            'styles:development',
            'scripts:development',
            'templates:development'
        ], done);
    });
};
