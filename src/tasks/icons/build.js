import q from 'q';
import path from 'path';
import fs from 'fs';
import Grunticon from 'grunticon-lib';

module.exports = function (gulp, config) {
    gulp.task('icons:build', function () {
        const deferred = q.defer();
        const iconDir = config.icons.source;
        const options = {
            enhanceSVG: true,
            cssprefix: '.icon--',
            customselectors: {
                '*': ['%icon--$1']
            },
            datasvgcss: 'icons.data.svg.scss',
            datapngcss: 'icons.data.png.scss',
            urlpngcss: 'icons.fallback.scss',
            pngpath: '/i/png',
            dynamicColorOnly: true,
            colors: config.icons.colours
        };

        const files = fs.readdirSync(iconDir).map(function (fileName) {
            return path.join(iconDir, fileName);
        });

        const grunticon = new Grunticon(files, config.icons.output, options);

        grunticon.process(function () {
            deferred.resolve();
        });

        return deferred.promise;
    });
};
