/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:43
*/

import * as types from '../constants'

const initialState = {
    show: false,
    title: 'Rongyi',
    text: '',
    callback: function() {},
    cancel: function() {}
};

export default function confirm(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_CONFIRM:
            return Object.assign({}, state, {
                show: true,
                title: action.title || initialState.title,
                text: action.text,
                callback: action.callback,
                cancel: action.cancel
            });

        case types.HIDE_CONFIRM:
            return Object.assign({}, state, {
                show: false
            });

        default:
            return state
    }
}
