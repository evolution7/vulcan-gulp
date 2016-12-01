import del from 'del';

module.exports = function (gulp, config) {
    gulp.task('clean', function () {
        return del([
            config.templates.output,
            config.styles.output,
            config.scripts.output,
            config.fonts.output,
            config.images.output,
            config.icons.output,
            './rev-manifest.json'
        ]);
    });
};
