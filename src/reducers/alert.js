/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:40
*/

import * as types from '../constants'

const initialState = {
    show: false,
    title: 'Rongyi',
    text: '',
    callback: function() {}
};

export default function alert(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_ALERT:
            return Object.assign({}, state, {
                show: true,
                title: action.title || initialState.title,
                text: action.text,
                callback: action.callback
            });

        case types.HIDE_ALERT:
            return Object.assign({}, state, {
                show: false
            });

        default:
            return state
    }
}
