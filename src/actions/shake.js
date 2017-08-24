/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:31
*/
import * as types from '../constants';

export const addShake = (times) => ({
    type: types.ADD_SHAKE,
    times: times
});

export const deleteShake = () => ({
    type: types.DELETE_SHAKE
});
