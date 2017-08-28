/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:16:21
*/

import React, { Component } from 'react';
import classnames from 'classnames';
import CssLayout from '../CssLayout';
import './index.less';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, show, layout } = this.props;

        return show && (
            <CssLayout layout={layout || 5} className={
                classnames(['modal'])
            }>
                {children}
            </CssLayout>
        );
    }
}

ModalComponent.defaultProps = {
    // layout: PropTypes.string
};

export default ModalComponent;
