import watch from 'gulp-watch';
import batch from 'gulp-batch';
import { get } from 'browser-sync';

const browserSync = get('developmentServer');

module.exports = function (gulp, config) {
    gulp.task('watch', function () {

        browserSync.init({
            proxy: config.browserSync.proxy,
            port: config.browserSync.port,
            ui: false,
            online: false,
            reloadOnRestart: true
        });

        // Scripts - handled within task with watchify
        gulp.start('scripts:watch');

        // Styles
        watch(config.styles.watch, batch(function (events, done) {
            gulp.start('styles:development', done);
        }));

        // Template
        watch(config.templates.source, batch(function (events, done) {
            gulp.start('templates:development', done);
        }));

        // Images
        watch(config.images.source, batch(function (events, done) {
            gulp.start('images:build', done);
        }));

        // Icons
        watch(config.icons.source, batch(function (events, done) {
            gulp.start('icons:build', done);
        }));
    });
};
