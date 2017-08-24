/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:39:23
*/
import React, {Component} from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import './index.less';

class CssZoomEffectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let cssZoomEffectNode = this.refs.cssZoomEffect;
        let { status, duration, delay, count, mode } = this.props;

        // 是否激活：0-表示未激活；1-表示激活
        if (status == '0') {
            return;
        }

        $(cssZoomEffectNode).css({
            'webkitAnimationDuration': (duration || 2) + 's',// 动画完成一个周期所花费的秒或毫秒
            'webkitAnimationDelay': (delay || 0) + 's',// 动画何时开始
            'webkitAnimationIterationCount': count || 'infinite',// 动画被播放的次数
            'webkitAnimationFillMode': mode || 'both'// 动画填充模式
        });
    }

    componentWillUnmount() {
    }

    render() {
        let { children } = this.props;
        return (
            <div ref="cssZoomEffect" className={ classnames(['css-effect-zoom']) }>
                {children}
            </div>
        );
    }
}

CssZoomEffectComponent.defaultProps = {
}

export default CssZoomEffectComponent;
