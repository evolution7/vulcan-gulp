import changed from 'gulp-changed';
import { get } from 'browser-sync';

const browserSync = get('developmentServer');

module.exports = function (gulp, config) {
    gulp.task('templates:development', function () {
        return gulp.src(config.templates.source)
            .pipe(changed(config.templates.output))
            .pipe(gulp.dest(config.templates.output))
            .on('end', function () {
                browserSync.reload();
            });
    });
};
