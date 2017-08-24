/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:19
*/
import * as types from '../constants';

export const showConfirm = function (argText, argTitle, argCallback, argCancel) {
    let text,
        title,
        callback,
        cancel;

    if (arguments.length === 2) {
        text = argText;
        callback = argTitle;
    } else if (arguments.length === 3) {
        if (typeof argTitle === 'function') {
            text = argText;
            callback = argTitle;
            cancel = argCallback;
        } else {
            text = argText;
            title = argTitle;
            callback = argCallback;
        }
    } else {
        text = argText;
        title = argTitle;
        callback = argCallback;
        cancel = argCancel;
    }

    return {
        type: types.SHOW_CONFIRM,
        show: true,
        text,
        title,
        callback,
        cancel
    };
};

export const hideConfirm = () => ({
    type: types.HIDE_CONFIRM,
    show: false
});
