/*
 * @Author: wangxiang
 * @Date:   2017-04-25 11:29:39
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-04-25 17:57:38
 */

'use strict';

import wx from 'weixin-js-sdk';

/**
 * [JSSDK分享接口]
 * 说明：
 * 1.pyq : 表示朋友圈
 * 2.py  : 表示朋友
 * 3.qq  : 表示QQ
 * 4.qqkj: 表示qq空间
 * 5.wb  : 表示微博
 * @param  {[type]} obj [title,desc,link,imgUrl...]
 * @return {[type]}     [description]
 */
export const handleShare = (obj) => {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
        title: typeof obj.title === 'function' ? obj.title('pyq') || obj.title,                     // 分享标题
        desc: typeof obj.desc === 'function' ? obj.desc('pyq') || obj.desc,                         // 分享描述
        link: typeof obj.link === 'function' ? obj.link('pyq') || obj.link,                         // 分享链接
        imgUrl: typeof obj.imgUrl === 'function' ? obj.imgUrl('pyq') || obj.imgUrl,                 // 分享图标
        success: function () {                                                                      // 分享成功后执行回调
            if (typeof obj.onSuccess === 'function') {
                obj.onSuccess('pyq');
            }
        },
        cancel: function () {                                                                       // 取消分享后执行的回调函数
            if (typeof obj.onCancel === 'function') {
                obj.onCancel('pyq');
            }
        }
    });

    // 分享给朋友
    wx.onMenuShareAppMessage({
        title: typeof obj.title === 'function' ? obj.title('py') || obj.title,                      // 分享标题
        desc: typeof obj.desc === 'function' ? obj.desc('py') || obj.desc,                          // 分享描述
        link: typeof obj.link === 'function' ? obj.link('py') || obj.link,                          // 分享链接
        imgUrl: typeof obj.imgUrl === 'function' ? obj.imgUrl('py') || obj.imgUrl,                  // 分享图标
        success: function () {                                                                      // 分享成功后执行回调
            if (typeof obj.onSuccess === 'function') {
                obj.onSuccess('py');
            }
        },
        cancel: function () {                                                                       // 取消分享后执行的回调函数
            if (typeof obj.onCancel === 'function') {
                obj.onCancel('py');
            }
        }
    });

    // 分享到QQ好友
    wx.onMenuShareQQ({
        title: typeof obj.title === 'function' ? obj.title('qq') || obj.title,                      // 分享标题
        desc: typeof obj.desc === 'function' ? obj.desc('qq') || obj.desc,                          // 分享描述
        link: typeof obj.link === 'function' ? obj.link('qq') || obj.link,                          // 分享链接
        imgUrl: typeof obj.imgUrl === 'function' ? obj.imgUrl('qq') || obj.imgUrl,                  // 分享图标
        success: function () {                                                                      // 分享成功后执行回调
            if (typeof obj.onSuccess === 'function') {
                obj.onSuccess('qq');
            }
        },
        cancel: function () {                                                                       // 取消分享后执行的回调函数
            if (typeof obj.onCancel === 'function') {
                obj.onCancel('qq');
            }
        }
    });

    // 分享到QQ空间
    wx.onMenuShareQZone({
        title: typeof obj.title === 'function' ? obj.title('qqkj') || obj.title,                    // 分享标题
        desc: typeof obj.desc === 'function' ? obj.desc('qqkj') || obj.desc,                        // 分享描述
        link: typeof obj.link === 'function' ? obj.link('qqkj') || obj.link,                        // 分享链接
        imgUrl: typeof obj.imgUrl === 'function' ? obj.imgUrl('qqkj') || obj.imgUrl,                // 分享图标
        success: function () {                                                                      // 分享成功后执行回调
            if (typeof obj.onSuccess === 'function') {
                obj.onSuccess('qqkj');
            }
        },
        cancel: function () {                                                                       // 取消分享后执行的回调函数
            if (typeof obj.onCancel === 'function') {
                obj.onCancel('qqkj');
            }
        }
    });

    // 分享到微博
    wx.onMenuShareWeibo({
        title: typeof obj.title === 'function' ? obj.title('wb') || obj.title,                      // 分享标题
        desc: typeof obj.desc === 'function' ? obj.desc('wb') || obj.desc,                          // 分享描述
        link: typeof obj.link === 'function' ? obj.link('wb') || obj.link,                          // 分享链接
        imgUrl: typeof obj.imgUrl === 'function' ? obj.imgUrl('wb') || obj.imgUrl,                  // 分享图标
        success: function () {                                                                      // 分享成功后执行回调
            if (typeof obj.onSuccess === 'function') {
                obj.onSuccess('wb');
            }
        },
        cancel: function () {                                                                       // 取消分享后执行的回调函数
            if (typeof obj.onCancel === 'function') {
                obj.onCancel('wb');
            }
        }
    });
}
