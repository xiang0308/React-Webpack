/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-05-18 18:45:46
*/
import React, {Component} from 'react';
import CssShakeEffect from 'public/CssShakeEffect';

import './index.less';

class ShakeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1
        }
    }

    componentWillmount() {
        this.loadShake();
    }

    componentDidMount() {
        this.startShake();
    }

    componentWillUnmount() {
    }

    startShake() {
        let _this = this;
        let { actions, stamp, runTime } = this.props;

        // 清空
        actions.deleteShake();
        // 开始抖动
        _this.setState({
            status: 1
        });

        setTimeout(function() {
            new _this.Shake({
                runTime: runTime,
                start: function() {
                },
                success: function() {
                },
                end: function() {
                    let self = this;

                    // 停止抖动
                    _this.setState({
                        status: 0
                    });

                    actions.addShake(self.times);
                }
            });
        }, 1000 * stamp);
    }

    loadShake() {
        let _this = this;

        (function() {
            this.Shake = function(options) {
                let self = this;
                self.lock = false;
                self.options = options;
                self.init();
            }
            this.Shake.prototype.init = function() {
                let self = this,
                    options = self.options;

                    if (window.DeviceMotionEvent) {
                        let SHAKE_THRESHOLD = options.SHAKE_THRESHOLD || 1800,
                            fnSuccess = options.success,
                            fnStart = options.start,
                            fnEnd = options.end,
                            runTime = options.runTime,
                            last_update = 0,
                            x = 0,
                            y = 0,
                            z = 0,
                            last_x = 0,
                            last_y = 0,
                            last_z = 0,
                            times = 0,
                            startTime;

                        startTime = new Date();
                        if (fnStart) {
                            fnStart.call(self);
                        }

                        if (fnEnd && runTime) {
                            setTimeout(fnEnd.bind(self), runTime);
                        }

                        window.addEventListener('devicemotion', function devicemotion(eventData) {
                            var acceleration = eventData.accelerationIncludingGravity,
                                curTime = new Date() * 1,
                                diffTime,
                                speed;

                            if ((curTime - last_update) > 100) {
                                diffTime = curTime - last_update;
                                last_update = curTime;
                                x = acceleration.x;
                                y = acceleration.y;
                                z = acceleration.z;
                                speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                                if (speed > SHAKE_THRESHOLD) {
                                    if (fnSuccess && runTime && curTime - startTime < runTime) {
                                        fnSuccess.call(self);
                                    }
                                    times++;
                                    self.times = times;
                                }
                                last_x = x;
                                last_y = y;
                                last_z = z;
                            }
                        }, false);
                    } else {
                        console.error('抱歉，你的手机配置实在有些过不去，考虑换个新的再来试试吧');
                    }
                }
        }).apply(_this);
    }

    render() {
        let { children, interval } = this.props;

        return (
            <div ref="shake" className="shake">
                <CssShakeEffect
                    status={this.state.status}
                    interval={interval}
                >
                </CssShakeEffect>
                {children}
            </div>
        );
    }
}

ShakeComponent.defaultProps = {
}

export default ShakeComponent;
