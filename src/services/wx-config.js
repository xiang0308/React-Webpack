/*
 * @Author: wangxiang
 * @Date:   2017-04-25 18:01:36
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-09-09 14:04:43
 */
'use strict';

import $ from 'jquery';
import wx from 'services/wx';

/**
 * [加载微信JS-SDK应用程序签名信息]
 * @param  {[type]} config [description]
 * @return {[type]}     [description]
 */
export const wxConfig = (config) => {
    let deferred = $.Deferred();

    // 注入权限验证配置
    wx.config({
        debug: false,
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名
        jsApiList: [
            'checkJsApi',
            'chooseImage',
            'uploadImage',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'startRecord',
            'stopRecord',
            'playVoice',
            'uploadVoice',
            'hideOptionMenu',
            'showOptionMenu',
            'getNetworkType'
        ] // 必填，需要使用的JS接口列表
    });

    // 微信分享
    wx.ready(function() {
        // 判断当前客户端版本是否支持指定JS接口
        wx.checkJsApi({
            jsApiList: [
                'checkJsApi',
                'chooseImage',
                'uploadImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'startRecord',
                'stopRecord',
                'playVoice',
                'uploadVoice',
                'hideOptionMenu',
                'showOptionMenu',
                'getNetworkType'
            ], // 需要检测的JS接口列表
            success: function() {}
        });

        wx.getNetworkType({
            success: function (res) {
                deferred.resolve(res);
            }
        });

    });

    wx.error(function (res) {
        deferred.reject(res.errMsg);
    });

    return deferred.promise();
};
