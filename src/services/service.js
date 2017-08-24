/*
* @Author: wangxiang
* @Date:   2017-04-10 14:44:14
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-04-16 12:42:33
*/
import $ from 'jquery';
import {getRootUrl} from './utils';
let ApiService = getApiService();
export default ApiService;

export function getApiService() {
    return myAjax({
        appInfo: {
            name: '分享JS-SDK应用程序签名信息',
            url: '/api/daning/jssdk'
        },
        getActivityStauts: {
            name: '获取活动状态',
            url: '/api/daning/greececulture/status',
            params: {
                name: 'HellenicFestival'
            }
        },
        getMyPosterInfo: {
            name: '我的海报页',
            url: '/api/daning/greececulture/info',
            params: {
                openid: ''
            }
        },
        sendMessage: {
            name: '发送短信',
            url: '/api/daning/greececulture/sendsms',
            params: {
                phone: ''
            }
        },
        submit: {
            name: '提交',
            url: '/api/daning/greececulture/submit',
            params: {
                openid: '',
                code: '',
                phone: '',
                poster: ''
            }
        },
        getWechatMaterial: {
            name: '获取微信照片',
            url: '/api/daning/upload',
            params: {
                media_id: ''
            }
        },
        vote: {
            name: '投票',
            url: '/api/daning/greececulture/vote',
            params: {
                helper_openid: '',
                player_openid: ''
            }
        },
        getPosterList: {
            name: '海报墙',
            url: '/api/daning/greececulture/list',
            params: {
                id: '',
                page: 0,
                page_size: 4
            }
        }
    });
}
export function myAjax(obj) {
    var rtv = {};
    $.each(obj, function (key, item) {
        rtv[key] = function (data) {
            let deferred = $.Deferred(),
                url = getRootUrl() + item.url,
                ajaxType = item.ajaxType,
                contentType = item.contentType,
                params = item.params || {},
                myParams = $.extend(params, data);

            if (!navigator.onLine) {
                deferred.reject({
                    meta: {
                        errno: 'offline',
                        msg: '对不起，网络出小差了'
                    }
                });
            } else {
                $.ajax({
                    url: url,
                    type: ajaxType || 'post',
                    timeout: 8000,
                    contentType: (contentType || 'application/x-www-form-urlencoded') + '; charset=utf-8',
                    dataType: 'json',
                    data: contentType ? JSON.stringify(myParams) : myParams
                }).then(function (json) {
                    if (json.meta) {
                        var errno = json.meta.status || json.meta.errno;

                        if (errno === 0) {
                            deferred.resolve(json);
                        } else {
                            deferred.reject(json);
                        }
                    } else {
                        deferred.resolve(json);
                    }
                }).catch(function(err, textStatus) {
                    if (textStatus === 'timeout'){
                        deferred.reject({
                            meta: {
                                errno: 'timeout',
                                msg: '对不起，网络出小差了'
                            }
                        });
                    }else{
                        deferred.reject({
                            meta: {
                                errno: 'unknown',
                                msg: '对不起，出现未知错误'
                            }
                        });
                    }
                });
            }

            return deferred.promise();
        }
    });

    return rtv;
}
