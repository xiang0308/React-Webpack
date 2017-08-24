/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:56
*/

import * as types from '../constants'

const initialState = {
    play: false
};

export default function music(state = initialState, action) {
    switch (action.type) {
        case types.PLAY_MUSIC:
            return Object.assign({}, state, {
                play: true
            });

        case types.PAUSE_MUSIC:
            return Object.assign({}, state, {
                play: false
            });

        default:
            return state
    }
}
