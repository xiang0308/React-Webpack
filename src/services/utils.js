/*
* @Author: wangxiang
* @Date:   2017-04-25 10:21:14
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-25 11:52:29
*/

import config from 'config';
import $ from 'jquery';

export function getRootUrl() {
    let env = getParameterByName('env');

    return (env ? config[env + 'Url'] : config.rootUrl);
}

export function getShareUrl() {
    let env = getParameterByName('env') || 'dist';
    let urlStr = 'share' + env.replace(/\w/, function($0) {
        return $0.toUpperCase();
    }) + 'Url';

    return (env ? config[urlStr] : config.shareUrl);
}

export function ConverJson(jsonString) {
    var rtv;
    try {
        rtv = JSON.parse(jsonString);
    } catch (ex) {
        try {
            rtv = (new Function('return' + jsonString ))();
        } catch (ex) {
            rtv = eval('(' + jsonString + ')');
        }
    }

    return rtv;
}

/**
 * @param  {[type]} mouseX [description]
 * @param  {[type]} mouseY [description]
 * @param  {[type]} rectX  [description]
 * @param  {[type]} rectY  [description]
 * @param  {[type]} width  [矩形宽度]
 * @param  {[type]} height [矩形高度]
 * @return {[bool]}        [description]
 */
export function isMouseInRect(mouseX, mouseY, rectX, rectY, width, height) {
    let maxX = rectX + width;
    let maxY = rectY + height;

    return mouseX > rectX && mouseX < maxX && mouseY > rectY && mouseY < maxY;
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function rem(size = 750) {
    let docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        reCalc = () => {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth >= size){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / size) + 'px';
            }
        };

    if (!document.addEventListener) return;
    reCalc();
    window.addEventListener(resizeEvt, reCalc, false);
    document.addEventListener('DOMContentLoaded', reCalc, false);
}

let cacheMapImg = {

};
export function preLoadImg(imgs, callback) {
    let len = imgs.length;
    let i = 0;
    let loadOk = function(i, len, isError) {
        callback(parseInt(i / len * 100), isError);
    }

    imgs.forEach(item => {
        if (cacheMapImg[item]) {
            i ++;
            loadOk(i, len);
        } else {
            let image = new Image();
            image.onload = function() {
                i ++ ;
                loadOk(i, len);
            };
            image.onerror = function() {
                i ++ ;
                loadOk(i, len, true);
            };
            image.src = item;
        }
    })
}

export function validTelephoneNum(value) {
    const reg = /^1(3|4|5|7|8)\d{9}$/;
    if (getType(value) === 'string' && !isNaN(parseInt(value))) {
        return reg.test(value);
    } else if (getType(value) === 'number') {
        return reg.test(value);
    } else {
        return false;
    }
}

export function scrollBottom(dom, ulDom, callback) {
    $(dom).on('scroll.bottom', ()=>{
        window.requestAnimationFrame(()=>{
            var sh = $(dom).height(),
                st = $(dom).scrollTop(),
                mt = $(ulDom).height();

            if (sh + st > mt && callback) {
                callback();
            }
        });
    });
}

var BaseClass = (function() {
    var _mix = function(r, s) {
        for (var p in s) {
            if (s.hasOwnProperty(p)) {
                r[p] = s[p]
            }
        }
    }
    var _extend = function() {
        //开关 用来使生成原型时,不调用真正的构成流程init
        this.initPrototype = true
        var prototype = new this()
        this.initPrototype = false

        var items = Array.prototype.slice.call(arguments) || []
        var item

        //支持混入多个属性，并且支持{}也支持 Function
        while (item = items.shift()) {
            _mix(prototype, item.prototype || item)
        }

        // 这边是返回的类，其实就是我们返回的子类
        function SubClass() {
            if (!SubClass.initPrototype && this.init)
                this.init.apply(this, arguments)//调用init真正的构造函数
        }

        // 赋值原型链，完成继承
        SubClass.prototype = prototype
        // 改变constructor引用
        SubClass.prototype.constructor = SubClass
        // 为子类也添加extend方法
        SubClass.extend = _extend

        return SubClass
    }
    //超级父类
    var Class = function() {}
    //为超级父类添加extend方法
    Class.extend = _extend
    return Class
})();

var Drag = BaseClass.extend({
    init:function(options){
        var self = this;

        self.supportTouch = (window.Modernizr && Modernizr.touch === true) || (function () {
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })();
        self.canMove = false;
        self.offsetX = 0;
        self.offsetY = 0;
        self.startX = 0;
        self.startY = 0;
        self.transform = [];
        if (options) {
            self.el = options.el;
            self.elInner = options.elInner;
            self.start = options.start;
            self.move = options.move;
            self.end = options.end;
        }
        if (self.supportTouch) {
            self.bind(self.el, 'touchstart', self.startHandler);
            self.bind(document, 'touchmove', self.moveHandler);
            self.bind(document, 'touchend', self.endHandler);
        } else {
            self.bind(self.el, 'mousedown', self.startHandler);
            self.bind(document, 'mousemove', self.moveHandler);
            self.bind(document, 'mouseup', self.endHandler);
        }
    },
    bind: function (el, eventName, fn) {
        var self = this;

        if (el && eventName && fn) {
            el.addEventListener(eventName, function bindEvent() {
                if (fn) {
                    fn.apply(self, arguments);
                }

                // el.removeEventListener(eventName, bindEvent, false);
            }, false);
        }
    },
    startHandler: function(evt) {
        var self = this;

        evt.preventDefault();
        self.canMove = true;

        if (self.supportTouch) {
            self.startX = evt.touches[0].pageX;
            self.startY = evt.touches[0].pageY;
        } else {
            self.startX = evt.pageX;
            self.startY = evt.pageY;
        }

        if (self.start) {
            self.start(evt);
        }
        //清除偏移量
        self.offsetX = 0;
        self.offsetY = 0;
    },
    moveHandler: function(evt) {
        var self = this;

        if (!self.canMove) {
            return false;
        }
        evt.preventDefault();
        if (self.supportTouch) {
            self.offsetX = evt.targetTouches[0].pageX - self.startX;
            self.offsetY = evt.targetTouches[0].pageY - self.startY;
        } else {
            self.offsetX = evt.pageX - self.startX;
            self.offsetY = evt.pageY - self.startY;
        }
        if (self.move) {
            self.move(evt);
        }
    },
    endHandler: function(evt) {
        var self = this;

        if (!self.canMove) {
            return false;
        }
        evt.preventDefault();
        self.canMove = false;
        if (self.end) {
            self.end(evt);
        }
    },
    getTransform: function(el) {
        var transform = window.getComputedStyle(el, null).getPropertyValue('-webkit-transform');
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+.?\d+))\))/);

        if(!results) return [0, 0, 0];
        if(results[1] == '3d') return results.slice(2,5);

        results.push(0);
        return results.slice(5, 8); // returns the [X,Y,Z,1] values
    }
});

export {BaseClass, Drag};
