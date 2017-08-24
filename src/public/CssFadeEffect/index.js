/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-06-21 17:48:38
*/
import React, {Component} from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import './index.less';

class CssFadeEffectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: ''
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        let cssFadeEffectNode = this.refs.cssFadeEffect;
        let { status, duration, delay, count, mode, active } = this.props;
        // debugger;
        let style = (!!active && active.trim() == 'true') ? 'x' : 'default';
        let $cssFadeEffect = $(cssFadeEffectNode);

        // 是否激活：0-表示未激活；1-表示激活
        if (status == '0') {
            this.setState({
                style: 'stop'
            });
            return;
        }

        this.setState({
            style: style
        });

        $cssFadeEffect.css({
            'webkitAnimationDuration': (duration || 1) + 's',   // 动画完成一个周期所花费的秒或毫秒
            'webkitAnimationDelay': (delay || 0) + 's',         // 动画何时开始
            'webkitAnimationIterationCount': count || 1,        // 动画被播放的次数
            'webkitAnimationFillMode': mode || 'forwards'       // 动画填充模式
        });
    }

    render() {
        let { children, direction } = this.props;
        return (
            <div ref="cssFadeEffect" className={ classnames(['css-fade-effect', direction || 'left', this.state.style]) }>
                {children}
            </div>
        );
    }
}

CssFadeEffectComponent.defaultProps = {
}

export default CssFadeEffectComponent;
