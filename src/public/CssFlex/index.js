/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:39:42
*/
import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

class CssFlexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, flex } = this.props;

        return (
            <div className={
                classnames(['css-flex', 'css-flex-' + flex])
            }>
                {children}
            </div>
        );
    }
}

CssFlexComponent.defaultProps = {
};

export default CssFlexComponent;
