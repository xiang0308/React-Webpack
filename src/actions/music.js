/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:24
*/

import * as types from '../constants';

export const playMusic = () => ({
    type: types.PLAY_MUSIC,
    play: true
});

export const pauseMusic = () => ({
    type: types.PAUSE_MUSIC,
    play: false
});
