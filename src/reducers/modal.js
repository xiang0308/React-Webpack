/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:52
*/

import * as types from '../constants'

const initialState = {
    show: false
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
            return Object.assign({}, state, {
                show: true
            });

        case types.HIDE_MODAL:
            return Object.assign({}, state, {
                show: false
            });

        default:
            return state
    }
}
