/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:35:55
*/

import * as types from '../constants';

export const showModal = () => ({
    type: types.SHOW_MODAL,
    show: true
});

export const hideModal = () => ({
    type: types.HIDE_MODAL,
    show: false
});
