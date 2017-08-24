/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:39:14
*/
import React, { Component } from 'react';
import $ from 'jquery';
import './index.less';

class ListViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let {handleRender, handleLoad, allowPull, allowScroll} = this.props;

        var Class = (function() {
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

        var LoadingData = Class.extend({
            init:function(options){
                var self = this;
                let hasOwnProperty = Object.prototype.hasOwnProperty;

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
                    for (var p in options) {
                        if (hasOwnProperty.call(options, p)) {
                            self[p] = options[p];
                        }
                    }
                }

                if (self.allowPull) {
                    if (self.supportTouch) {
                        self.bind(self.el, 'touchstart', self.startHandler);
                        self.bind(document, 'touchmove', self.moveHandler);
                        self.bind(document, 'touchend', self.endHandler);
                    } else {
                        self.bind(self.el, 'mousedown', self.startHandler);
                        self.bind(document, 'mousemove', self.moveHandler);
                        self.bind(document, 'mouseup', self.endHandler);
                    }
                }

                if (self.allowScroll) {
                    self.bind(self.el, 'scroll', self.scrollHandler);
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
            scrollHandler: function(evt) {
                let self = this;
                let $elem = $(self.el);

                window.requestAnimationFrame(function() {
                    // console.log(123);
                    var parentHeight = $elem.height(),
                        parentScrollTop = $elem.scrollTop(),
                        childrenHeight = 0;

                    $elem.children().each(function() {
                        childrenHeight += $(this).height();
                    });

                    if (parentHeight + parentScrollTop === childrenHeight) {
                        if (self.scroll) {
                            self.scroll(evt);
                        }
                    }
                });
            },
            startHandler: function(evt) {
                var self = this;

                // evt.preventDefault();
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
                    return;
                }

                // evt.preventDefault();


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
                // evt.preventDefault();

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

        let dg = new LoadingData({
            el: this.refs.box,
            elInner: this.refs.boxIn,
            elLoading: this.refs.loading,
            elAppending: this.refs.appending,
            allowPull: allowPull,
            allowScroll: allowScroll,
            start: function() {
                let self = this;

                self.scrollTop = $(self.el).scrollTop();
                if (self.scrollTop === 0) {
                    $(self.elLoading).html('释放加载…');
                }
            },
            move: function(evt) {
                let self = this;

                if (self.scrollTop === 0 && self.offsetY > 0) {
                    evt.preventDefault();
                    $(self.elLoading).height(self.damping(self.offsetY));
                }
            },
            end: function(evt) {
                let self = this;

                if (self.scrollTop === 0 && self.offsetY > 0) {
                    evt.preventDefault();
                    self.scrollTop = -1;
                    $(self.elLoading)
                        .height(30)
                        .html('加载中…');
                    self
                        .clearData()
                        .load(function(data) {
                            self.render(data);
                        });
                }
            },
            scroll: function() {
                let self = this;
                let el = self.el;
                let scrollTop = $(el).scrollTop();
                let $elAppending = $(self.elAppending);

                $elAppending.height(30);
                $(el).scrollTop(scrollTop + 30);
                self
                    .load(function(data) {
                        $elAppending.height(0);
                        self.render(data, true);
                    });
            },
            damping: function (value) {
                var step = [20, 40, 60, 80, 100];
                var rate = [0.5, 0.4, 0.3, 0.2, 0.1];

                var scaleedValue = value;
                var valueStepIndex = step.length;

                while (valueStepIndex--) {
                    if (value > step[valueStepIndex]) {
                        scaleedValue = (value - step[valueStepIndex]) * rate[valueStepIndex];
                        for (var i = valueStepIndex; i > 0; i--) {
                            scaleedValue += (step[i] - step[i - 1]) * rate[i - 1];
                        }
                        scaleedValue += step[0] * 1;
                        break;
                    }
                }

                return scaleedValue;
            },
            render: function(data, isAppend) {
                let self = this;


                if (isAppend) {
                    self.data = self.data.concat(data);
                } else {
                    self.data = data;
                }

                $(self.elLoading).height(0);

                self.renderHtml(self.data);
            },
            renderHtml: function(data) {
                let self = this;

                if (handleRender) {
                    handleRender(data);
                } else {
                    let li = '';

                    data.forEach((item) => {
                        li += '<li>' + item + '</li>';
                    });


                    $(self.elInner).html(li);
                }
            },
            data: [],
            clearData: function() {
                let self = this;

                self.data = [];

                return self;
            },
            load: function(callback) {
                var self = this;

                if (self.lock) {
                    return;
                }

                self.lock = true;


                if (handleLoad) {
                    handleLoad(self.data)
                        .then(function(data) {
                            self.lock = false;
                            callback(data);
                        })
                        .catch(function() {
                            self.lock = false;
                        });
                    // handleLoad(self.data, callback);
                } else {

                    $(self.elLoading).html('加载中…');

                    setTimeout(function () {
                        let data = [];
                        let len = self.data.length;

                        for (var i = 0; i < 200; i ++) {
                            data[i] = i + 1 + len;
                        }

                        self.lock = false;

                        if (callback) {
                            callback.call(self, data.sort(() => {
                                return Math.random() - 0.5;
                            }));
                        }
                    }, 2000 * Math.random());
                }
            }
        });

        dg
            .load(function(data) {
                dg.render(data);
            });
    }

    componentWillUnmount() {
    }

    render() {
        let { children } = this.props;

        return (
            <div className="list-view">
                <div ref="loading" className="list-view-loading">
                    释放加载…
                </div>
                <div ref="box" className="list-view-box">
                    <ul ref="boxIn">
                        {children}
                    </ul>
                    <div ref="appending" className="list-view-appending">
                        加载中…
                    </div>
                </div>
            </div>
        );
    }
}

ListViewComponent.defaultProps = {
    allowPull: true,
    allowScroll: true
    // layout: PropTypes.string
};

export default ListViewComponent;
