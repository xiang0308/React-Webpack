/*
 * @Author: wangxiang
 * @Date:   2017-04-25 16:02:37
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-05-04 12:04:47
 */

'use strict';

import $ from 'jquery';
import wx from 'services/wx';

/**
 * [JSSDK图像接口]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const wxImage = (obj) => {
    let needUrlType = obj.needUrlType.trim() || 'localIds';

    return chooseImage(obj)
        .then(function(res) {
            if (needUrlType === 'localIds') {                       // 获取localIds
                return res.localIds;
            } else if (needUrlType === 'serverId') {                // 获取serverId
                return uploadImage(res.localIds).then(res => {
                    return res.serverId;
                });
            } else if (needUrlType === 'localData') {               // 获取localData
                return getLocalImgData(res.localIds).then(res => {
                    return res.localData;
                });
            }
        });

    /**
     * [chooseImage 选择相册或者拍照]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    function chooseImage(obj) {
        let deferred = $.Deferred();
        wx.chooseImage({
            count: obj.count || 1, // 默认9
            sizeType: obj.sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: obj.sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                deferred.resolve('' + res.localIds);
            },
            fail: function(err) {
                deferred.reject(JSON.stringify(err));
            }
        });

        return deferred.promise();
    }

    /**
     * [uploadImage 上传照片获取serverId]
     * @param  {[type]} localId [description]
     * @return {[type]}     [description]
     */
    function uploadImage(localId) {
        let deferred = $.Deferred();
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                deferred.resolve(res.serverId);
            },
            fail: function(err) {
                deferred.reject(JSON.stringify(err));
            }
        });

        return deferred.promise();
    }

    /**
     * [getLocalImgData 获取本地图片localData]
     * @param  {[type]} localId [description]
     * @return {[type]}     [description]
     */
    function getLocalImgData(localId) {
        let deferred = $.Deferred();
        wx.getLocalImgData({
            localId: localId,
            success: function(res) {
                let localData = res.localData;

                // Android 需要特殊转换
                if (!/^data:image/.test(localData)) {
                    localData = 'data:image/jpeg;base64,' + localData;
                }

                deferred.resolve(localData);
            },
            fail: function(err) {
                deferred.reject(JSON.stringify(err));
            }
        });
        return deferred.promise();
    }
};
