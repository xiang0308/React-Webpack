/*
 * @Author: wangxiang
 * @Date:   2017-04-19 10:34:34
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-24 18:51:39
 */
'use strict';
var gulp = require('gulp');
var sftp = require('gulp-sftp');

['rd', 'qa', 'dist'].forEach(function(item) {
    gulp.task('sftp-' + item, function() {
        runPublish(item);
    });
});

function runPublish(hj) {
    return gulp.src(hj + '/**')
        .pipe(sftp({
            host: '',
            user: '',
            pass: '',
            remotePath: '' + hj
        }));
}
