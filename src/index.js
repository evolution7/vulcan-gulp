import requireDir from 'require-dir';
import { create } from 'browser-sync';
import defaultConfig from '../defaults';

create('developmentServer');

const tasks = [];
const dir = requireDir('./tasks', { recurse: true });

function collectTasks(directory) {

    for (const file in directory) {
        if (typeof directory[file] === 'function') {
            tasks.push(directory[file]);
        } else if (typeof directory[file] === 'object') {
            collectTasks(directory[file]);
        }
    }
}

module.exports = function (gulp, userConfig) {
    const config = Object.assign({}, defaultConfig, userConfig);

    collectTasks(dir);
    tasks.forEach(function (task) {
        task(gulp, config);
    });

    gulp.task('default', ['dev', 'watch']);
};
