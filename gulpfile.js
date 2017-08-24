/*
* @Author: Wei Jie
* @Date:   2017-04-19 10:34:34
* @Last Modified by:   Wei Jie
* @Last Modified time: 2017-04-25 15:16:19
*/

'use strict';
var gulp = require('gulp');
var sftp = require('gulp-sftp');


['rd', 'qa', 'dist'].forEach(function(item) {
    gulp.task('sftp-' + item, function () {
        runPublish(item);
    });
});


function runPublish(hj) {
    return gulp.src(hj + '/**')
        .pipe(sftp({
            host: '101.69.176.99',
            user: 'jfuser',
            pass: 'GAmPckKIit6JDHqOafMA',
            // remotePath: '/home/jfuser/tt',
            remotePath: '/var/www/html/v35/' + hj
        }));
}
