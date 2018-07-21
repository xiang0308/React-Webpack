/*
 * @Author: wangxiang
 * @Date:   2017-04-10 14:44:14
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-07-11 14:43:43
 */
import $ from 'jquery';
import { getRootUrl } from './utils';

let ApiService = getApiService();
export { ApiService };

function getApiService() {
    return myAjax({
        appInfo: {
            name: '分享JS-SDK应用程序签名信息',
            url: ''
        },
        maidian: {
            name: '埋点上报',
            url: '',
            params: {}
        }
    });
}

function myAjax(obj) {
    var rtv = {};
    $.each(obj, function(key, item) {
        rtv[key] = function(data) {
            let deferred = $.Deferred(),
                url = getRootUrl(item.host) + item.url,
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
                }).then(function(json) {
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
                    if (textStatus === 'timeout') {
                        deferred.reject({
                            meta: {
                                errno: 'timeout',
                                msg: '对不起，网络出小差了'
                            }
                        });
                    } else {
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
