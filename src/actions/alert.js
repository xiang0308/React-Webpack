/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:36:07
*/

import * as types from '../constants';

export const showAlert = function (argText, argTitle, argCallback) {
    let text,
        title,
        callback;

    if (arguments.length === 1) {
        text = argText;
    } else if (arguments.length === 2) {
        if (typeof argTitle === 'function') {
            text = argText;
            callback = argTitle;
        } else {
            text = argText;
            title = argTitle;
        }
    } else {
        text = argText;
        title = argTitle;
        callback = argCallback;
    }

    return {
        type: types.SHOW_ALERT,
        show: true,
        text,
        title,
        callback
    };
};

export const hideAlert = () => ({
    type: types.HIDE_ALERT,
    show: false
});
