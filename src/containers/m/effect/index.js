/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-05-18 15:04:36
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import CssFadeEffect from 'public/CssFadeEffect';
import CssZoomEffect from 'public/CssZoomEffect';
import CssRotateEffect from 'public/CssRotateEffect';
import CssShakeEffect from 'public/CssShakeEffect';

import './index.less';

class EffectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnMount() {
    }

    render() {
        let ballon = require('./images/ballon.png');
        let music = require('./images/music.png');
        let car = require('./images/car.png');
        let activity = require('./images/activity.png');

        return (
            <div className="m-effect">
                <h3>动效组件说明</h3>
                <table className="m-effect-table">
                    <thead>
                        <tr>
                            <th width="30%">组件名称</th>
                            <th>参数描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CssFadeEffect组件</td>
                            <td>
                                <p>1. status表示是否激活，0-未激活，1-激活，默认激活</p>
                                <p>2. duration表示动画播放周期，默认1</p>
                                <p>3. delay表示动画延时时间，默认0</p>
                                <p>4. count表示动画播放次数，默认1</p>
                                <p>5. mode表示动画填充模式，默认forwards</p>
                                <p>6. active表示用于swiper切换page时，设置true启用，其他情况默认滑入</p>
                                <p>7. direction表示从left、right、top、bottom方向滑入，默认left</p>
                            </td>
                        </tr>
                        <tr>
                            <td>CssZoomEffect组件</td>
                            <td>
                                <p>1. status表示是否激活，0-未激活，1-激活，默认激活</p>
                                <p>2. duration表示动画播放周期，默认2</p>
                                <p>3. delay表示动画延时时间，默认0</p>
                                <p>4. count表示动画播放次数，默认infinite</p>
                                <p>5. mode表示动画填充模式，默认both</p>
                            </td>
                        </tr>
                        <tr>
                            <td>CssRotateEffect组件</td>
                            <td>
                                <p>1. status表示是否激活，0-未激活，1-激活，默认激活</p>
                                <p>2. duration表示动画播放周期，默认1</p>
                                <p>3. delay表示动画延时时间，默认0</p>
                                <p>4. count表示动画播放次数，默认infinite</p>
                                <p>5. mode表示动画填充模式，默认forwards</p>
                                <p>6. rotateMode表示转动模式: rotate(旋转)、flip(翻转)，默认rotate</p>
                            </td>
                        </tr>
                        <tr>
                            <td>CssShakeEffect组件</td>
                            <td>
                                <p>1. status表示是否激活，0-未激活，1-激活，默认激活</p>
                                <p>2. duration表示动画播放周期，默认1</p>
                                <p>3. delay表示动画延时时间，默认0</p>
                                <p>4. count表示动画播放次数，默认1</p>
                                <p>5. mode表示动画填充模式，默认both</p>
                                <p>6. interval表示每隔多长时间播放动画，默认1</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <h3>滑入动效</h3>
                <div className="m-effect-left">
                    <CssFadeEffect
                        status="1"
                        direction="left"
                        duration="0.8"
                        delay="0"
                        count="10"
                        mode="both"
                    >
                        从左边滑入
                    </CssFadeEffect>
                </div>
                <div className="m-effect-right">
                    <CssFadeEffect
                        direction="right"
                        count="8"
                    >
                        从右边滑入
                    </CssFadeEffect>
                </div>
                <div className="m-effect-top">
                    <CssFadeEffect
                        direction="top"
                        count="5"
                    >
                        从顶部滑入
                    </CssFadeEffect>
                </div>
                <div className="m-effect-bottom">
                    <CssFadeEffect
                        direction="bottom"
                        count="6"
                    >
                        从底部滑入
                    </CssFadeEffect>
                </div>
                <hr/>
                <h3>放大变小动效</h3>
                <div className="m-effect-breathing">
                    <CssZoomEffect
                        status="1"
                    >
                        <img src={ballon} alt="ballon"/>
                    </CssZoomEffect>
                </div>
                <hr/>
                <h3>转动动效</h3>
                <div className="m-effect-rotate">
                    <ul>
                        <li>
                            <CssRotateEffect
                                rotateMode="rotate"
                                duration="2"
                                delay="0.3"
                            >
                                <img src={music} alt="music"/>
                            </CssRotateEffect>
                        </li>
                        <li>
                            <CssRotateEffect
                                rotateMode="flip"
                                count="20"
                                mode="both"
                            >
                                <img src={car} alt="car"/>
                            </CssRotateEffect>
                        </li>
                    </ul>
                </div>
                <hr/>
                <h3>抖动动效</h3>
                <div className="m-effect-shake">
                    <CssShakeEffect
                        status="1"
                        interval="3"
                    >
                        <img src={activity} alt="activity"/>
                    </CssShakeEffect>
                </div>
                <hr/>
            </div>
        );
    }
}

EffectComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EffectComponent);
