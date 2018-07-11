/*
 * @Author: wangxiang
 * @Date:   2017-04-25 11:29:39
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-07-05 14:30:52
 */

'use strict';
import wx from 'services/wx';

/**
 * [JSSDK分享接口]
 * 说明：
 * 1.pyq : 表示分享到朋友圈
 * 2.py  : 表示分享给朋友
 * 3.qq  : 表示分享给QQ好友
 * 4.qqkj: 表示分享到QQ空间
 * 5.wb  : 表示分享到微博
 * @param  {[type]}   obj      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export const wxShare = (obj, callback) => {
    // 微信分享
    wx.ready(function() {
        /*分享给朋友*/
        wx.onMenuShareAppMessage(obj);

        /*分享到QQ*/
        wx.onMenuShareQQ(obj);

        /*分享到腾讯微博*/
        wx.onMenuShareWeibo(obj);

        /*分享到QQ空间*/
        wx.onMenuShareQZone(obj);

        /*分享到朋友圈*/
        // obj.title = obj.desc; /*分享到朋友圈没有desc字段，取title*/
        wx.onMenuShareTimeline({
            title: obj.desc, // 分享标题
            link: obj.link, // 分享链接
            imgUrl:obj.imgUrl, // 分享图标
            success: obj.success,
            cancel: obj.cancel
        });

        if (callback) {
            callback();
        }
    });

    wx.error(function (res) {
        console.error(res.errMsg);
    });

}
