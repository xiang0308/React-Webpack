/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:42:47
*/

import { combineReducers } from 'redux';
import preloader from './preloader';
import modal from './modal';
import alert from './alert';
import confirm from './confirm';
import music from './music';
import shake from './shake';

const rootReducer = combineReducers({
    preloader,
    modal,
    alert,
    confirm,
    music,
    shake
});

export default rootReducer;
