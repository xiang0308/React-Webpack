/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:59
*/

import * as types from '../constants'

const initialState = {
	show: false,
	percent: 0
};

export default function preloader(state = initialState, action) {
	switch (action.type) {
		case types.SHOW_PRELOADER:
			return Object.assign({}, state, {
				show: true,
				percent: action.percent
			});

		case types.HIDE_PRELOADER:
			return Object.assign({}, state, {
				show: false,
				percent: 0
			});

		default:
			return state
	}
}
