/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:39:55
*/
import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

class CssAlignComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, align } = this.props;

        return (
            <div className={
                classnames(['css-align', 'css-align-' + align])
            }>
                {children}
            </div>
        );
    }
}

export default CssAlignComponent;
