/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:16:14
*/

import React, {Component} from 'react';
import classnames from 'classnames';
import './index.less';

class MobileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, width } = this.props;
        if (width) {
            width = parseInt(width);
        }

        return (
            <div ref="mobile" className={
                classnames(['mobile'])
            } style={{
                width: (width || 750 + 'px')
            }}>
                {children}
            </div>
        );
    }
}

MobileComponent.defaultProps = {};

export default MobileComponent;
