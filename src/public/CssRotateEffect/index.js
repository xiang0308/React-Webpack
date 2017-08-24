/*
* @Author: wangxiang
* @Date:   2017-05-16 11:05:49
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-05-18 11:48:01
*/
import React, {Component} from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import './index.less';

class CssRotateEffectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        let cssRotateEffectNode = this.refs.cssRotateEffect;
        let { status, duration, delay, count, mode } = this.props;

        // 是否激活：0-表示未激活；1-表示激活
        if (status == '0') {
            return;
        }

        $(cssRotateEffectNode).css({
            'webkitAnimationDuration': (duration || 1) + 's',// 动画完成一个周期所花费的秒或毫秒
            'webkitAnimationDelay': (delay || 0) + 's',// 动画何时开始
            'webkitAnimationIterationCount': count || 'infinite',// 动画被播放的次数
            'webkitAnimationFillMode': mode || 'forwards'// 动画填充模式
        });
    }

    render() {
        // rotateMode: rotate(旋转)、flip(翻转)
        let { children, rotateMode } = this.props;
        return (
            <div ref="cssRotateEffect"
                 className={ classnames(['css-effect', 'css-effect-' + (rotateMode || 'rotate')]) }>
                {children}
            </div>
        );
    }
}

CssRotateEffectComponent.defaultProps = {
}

export default CssRotateEffectComponent;
