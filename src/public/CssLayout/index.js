/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:15:32
*/
import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

class CssLayoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, layout, className } = this.props;

        return (
            <div className={
                classnames(['css-layout', 'css-layout-' + layout, className || ''])
            }>
                {children}
            </div>
        );
    }
}

CssLayoutComponent.defaultProps = {
    // layout: PropTypes.string
};

export default CssLayoutComponent;
