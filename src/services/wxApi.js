/*
 * @Author: wangxiang
 * @Date:   2017-04-25 16:02:37
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 10:47:18
 */

import ApiService from './service';
import $ from 'jquery';
import { getRootUrl, getShareUrl } from './utils';

var wx = require('weixin-js-sdk');
let shareUrl = require('../images/share.jpg');

const wxApi = () => {
    let defer = $.Deferred();
    ApiService
        .appInfo()
        .then(function(res) {
            window.APPINFOCONFIG = res.result.config || {};
            if (!window.APPINFOCONFIG.appId) {
                defer.reject('没有appid');
                return false;
            }

            // 注入权限验证配置
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: window.APPINFOCONFIG.appId, // 必填，公众号的唯一标识
                timestamp: window.APPINFOCONFIG.timestamp, // 必填，生成签名的时间戳
                nonceStr: window.APPINFOCONFIG.nonceStr, // 必填，生成签名的随机串
                signature: window.APPINFOCONFIG.signature,// 必填，签名
                jsApiList: [
                    'checkJsApi',
                    'chooseImage',
                    'uploadImage',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'startRecord',
                    'stopRecord',
                    'translateVoice',
                    'playVoice',
                    'uploadVoice',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'getNetworkType'
                ] // 必填，需要使用的JS接口列表
            });

            // 微信分享
            wx.ready(function() {
                // wx.hideOptionMenu();
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
                        'translateVoice',
                        'uploadVoice',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'getNetworkType'
                    ], // 需要检测的JS接口列表
                    success: function () {

                    }
                });

                wx.getNetworkType({
                    success: function (res) {
                        defer.resolve(res);
                    }
                });

                window.jsSdkShare = {
                    'title': '与宁相遇.希腊',
                    'desc':  !!window.pid ? '我在这里制作了一张希腊心愿海报，赶紧为我助力冲击“希腊5日旅游大奖”吧！':'制作希腊心愿海报，冲击“希腊5日旅游大奖”',
                    'imgUrl': !!window.pid ? window.PID_POSTERURL : window.location.href.split('#')[0] + shareUrl,
                    // todo 分享链接
                    getLink: function() {
                        let url;
                        if (window.pid) {
                            url = getShareUrl() + '?type=share&pid=' + window.openid;
                        } else {
                            url = getShareUrl();
                        }
                        return url;
                    },
                    onSuccess: function () {
                        // todo 修改分享成功埋点
                        ApiService
                            .shareReport({
                                openid: window.openid
                            });
                    }
                };

                // 分享到朋友圈
                wx.onMenuShareTimeline({
                    title: window.jsSdkShare.desc, // 分享标题
                    link: window.jsSdkShare.getLink(1), // 分享链接
                    imgUrl: window.jsSdkShare.imgUrl, // 分享图标
                    img_url: window.jsSdkShare.imgUrl,
                    success: function () {
                        if (window.jsSdkShare.onSuccess) {
                            window.jsSdkShare.onSuccess(1);
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                // 分享给朋友
                wx.onMenuShareAppMessage({
                    title: window.jsSdkShare.title, // 分享标题
                    desc: window.jsSdkShare.desc, // 分享描述
                    link: window.jsSdkShare.getLink(2), // 分享链接
                    imgUrl: window.jsSdkShare.imgUrl, // 分享图标
                    img_url: window.jsSdkShare.imgUrl,
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        if (window.jsSdkShare.onSuccess) {
                            window.jsSdkShare.onSuccess(2);
                        }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareQQ({
                    title: window.jsSdkShare.title, // 分享标题
                    desc: window.jsSdkShare.desc, // 分享描述
                    link: window.jsSdkShare.getLink(3), // 分享链接
                    imgUrl: window.jsSdkShare.imgUrl, // 分享图标
                    img_url: window.jsSdkShare.imgUrl,
                    success: function () {
                       // 用户确认分享后执行的回调函数
                       if (window.jsSdkShare.onSuccess) {
                        window.jsSdkShare.onSuccess(3);
                       }
                    },
                    cancel: function () {
                       // 用户取消分享后执行的回调函数
                    }
                });


                wx.onMenuShareWeibo({
                    title: window.jsSdkShare.title, // 分享标题
                    desc: window.jsSdkShare.desc, // 分享描述
                    link: window.jsSdkShare.getLink(4), // 分享链接
                    imgUrl: window.jsSdkShare.imgUrl, // 分享图标
                    img_url: window.jsSdkShare.imgUrl,
                    success: function () {
                       // 用户确认分享后执行的回调函数
                       if (window.jsSdkShare.onSuccess) {
                        window.jsSdkShare.onSuccess(4);
                       }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareQZone({
                    title: window.jsSdkShare.title, // 分享标题
                    desc: window.jsSdkShare.desc, // 分享描述
                    link: window.jsSdkShare.getLink(5), // 分享链接
                    imgUrl: window.jsSdkShare.imgUrl, // 分享图标
                    img_url: window.jsSdkShare.imgUrl,
                    success: function () {
                       // 用户确认分享后执行的回调函数
                       if (window.jsSdkShare.onSuccess) {
                        window.jsSdkShare.onSuccess(5);
                       }
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
            wx.error(function (res) {
                defer.reject(res.errMsg);
            });
        })
        .catch(function(err) {
            defer.reject('获取OPENID出错啦！' + err.meta.msg);
        });
    return defer.promise();
};

export default wxApi;
