/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-05-18 15:01:37
*/
import React, {Component} from 'react';
import $ from 'jquery';

import './index.less';

class CssShakeEffectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shakeClass: 'css-effect-shake'
        }
    }

    componentDidMount() {
        this.startShake();
    }

    componentWillUnmount() {
    }

    startShake() {
        let _this = this;
        let { status, duration, delay, count, mode, interval } = _this.props;
        let cssShakeEffectNode = _this.refs.cssShakeEffect;
        let $shakeNode = $(cssShakeEffectNode);
        let ivalue = parseInt(interval || 0);
        let dvalue = parseInt(delay || 0);

        // 是否激活：0-表示未激活；1-表示激活
        if (status == '0') {
            return;
        }

        // 首次播放不需要添加属性
        if (!$shakeNode.hasClass(_this.state.shakeClass)) {
            $shakeNode.addClass(_this.state.shakeClass);
        }

        $shakeNode.css({
            'webkitAnimationDuration': (duration || 1) + 's',// 动画完成一个周期所花费的秒或毫秒
            'webkitAnimationDelay': (delay || 0) + 's',// 动画何时开始
            'webkitAnimationIterationCount': count || 1,// 动画被播放的次数
            'webkitAnimationFillMode': mode || 'both'// 动画填充模式
        }).on('webkitAnimationEnd', () => {
            $shakeNode
                .removeAttr('style')
                .removeClass(_this.state.shakeClass)
                .off('webkitAnimationEnd');

            // 如果设置了延时播放动画，需要与间隔时间同步
            // delay: 1s + ivalue: 2s = 3s
            if (dvalue > 0) {
                ivalue = ivalue - dvalue - 1;
            }

            // 如果为负数，设置默认值
            if (ivalue < 0) {
                ivalue = 1;
            }

            setTimeout(() => { _this.startShake(); }, ivalue * 1000);
        });
    }

    render() {
        let { children } = this.props;
        return (
            <div ref="cssShakeEffect" className={this.state.shakeClass}>
                {children}
            </div>
        );
    }
}

CssShakeEffectComponent.defaultProps = {
}

export default CssShakeEffectComponent;
