/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:43:02
*/

import * as types from '../constants'

const initialState = {
    times: 0
};

export default function music(state = initialState, action) {
    switch (action.type) {
        case types.ADD_SHAKE:
            return Object.assign({}, state, {
                times: action.times
            });

        case types.DELETE_SHAKE:
            return Object.assign({}, state, {
                times: 0
            });

        default:
            return state
    }
}
