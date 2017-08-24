/*
 * @Author: wangxiang
 * @Date:   2017-04-25 16:02:37
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-04-25 17:32:22
 */

'use strict';

import $ from 'jquery';
import wx from 'weixin-js-sdk';

/**
 * [JSSDK音频接口]
 * @return {[type]} [description]
 */
export const handleVoice = () => {
    return {
        startRecord: startRecord,               // 开始录音
        stopRecord: stopRecord,                 // 停止录音
        uploadVoice: uploadVoice,               // 上传语音
        playVoice: playVoice,                   // 播放音频
        pauseVoice: pauseVoice,                 // 暂停播放音频
        stopVoice: stopVoice,                   // 停止播放音频
        onVoiceRecordEnd: onVoiceRecordEnd,     // 监听录音自动停止
        onVoicePlayEnd: onVoicePlayEnd          // 监听录音播放停止
    };

    /**
     * [startRecord 开始录音]
     * @return {[type]} [description]
     */
    function startRecord() {
        let deferred = $.Deferred();
        wx.startRecord({
            cancel: function() {
                deferred.reject('用户拒绝授权录音');
            }
        });

        return deferred.promise();
    }

    /**
     * [stopRecord 停止录音]
     * @return {[type]} [description]
     */
    function stopRecord() {
        let deferred = $.Deferred();
        wx.stopRecord({
            success: function(res) {
                deferred.resolve(res.localId);
            },
            fail: function(err) {
                deferred.reject(JSON.stringify(err));
            }
        });

        return deferred.promise();
    }

    /**
     * [uploadVoice 上传语音]
     * @param  {[type]} localId [description]
     * @return {[type]}         [description]
     */
    function uploadVoice(localId) {
        let deferred = $.Deferred();
        wx.uploadVoice({
            localId: localId,
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
     * [playVoice 播放音频]
     * @param  {[type]} localId [description]
     * @return {[type]}         [description]
     */
    function playVoice(localId) {
        wx.playVoice({
            localId: localId
        });
    }

    /**
     * [pauseVoice 暂停播放音频]
     * @return {[type]} [description]
     */
    function pauseVoice(localId) {
        wx.pauseVoice({
            localId: localId
        });
    }

    /**
     * [stopVoice 停止播放音频]
     * @param  {[type]} localId [description]
     * @return {[type]}         [description]
     */
    function stopVoice(localId) {
        wx.stopVoice({
            localId: localId
        });
    }

    /**
     * [onVoiceRecordEnd 监听录音自动停止]
     * @return {[type]} [description]
     */
    function onVoiceRecordEnd() {
        let deferred = $.Deferred();
        wx.onVoiceRecordEnd({
            complete: function(res) {
                deferred.resolve(res.localId);
            }
        });

        return deferred.promise();
    }

    /**
     * [onVoicePlayEnd 监听录音播放停止]
     * @return {[type]} [description]
     */
    function onVoicePlayEnd() {
        let deferred = $.Deferred();
        wx.onVoicePlayEnd({
            complete: function(res) {
                deferred.resolve(res.localId);
            }
        });
        return deferred.promise();
    }

};
