/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:27
*/

import * as types from '../constants';

export const showPreloader = (percent) => ({
    type: types.SHOW_PRELOADER,
    percent,
    show: true
});
export const hidePreloader = () => ({
    type: types.HIDE_PRELOADER,
    show: false
});
