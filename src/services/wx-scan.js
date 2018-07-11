/*
 * @Author: wangxiang
 * @Date:   2017-04-25 18:01:36
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-05-04 12:04:42
 */

'use strict';

import $ from 'jquery';
import wx from 'services/wx';

/**
 * [微信扫一扫接口]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const wxScan = (obj) => {
    return scanQRCode(obj)
        .then(res => {
            return res;
        });

    /**
     * [scanQRCode 扫描二维码]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    function scanQRCode(obj) {
        let deferred = $.Deferred();
        wx.scanQRCode({
            needResult: obj.needResult || 1,
            desc: obj.desc || '',
            success: function(res) {
                deferred.resolve(JSON.stringify(res));
            },
            fail: function(err) {
                deferred.reject(JSON.stringify(err));
            }
        });

        return deferred.promise();
    }
};
