import runSequence from 'run-sequence';

module.exports = function (gulp) {
    const rs = runSequence.use(gulp);

    gulp.task('build', function (done) {
        // Run clean task before all others.
        rs('clean', [
            'fonts:build',
            'icons:build',
            'images:build',
            'izr:build',
            'styles:production',
            'scripts:production',
            'templates:production'
        ], done);
    });
};
