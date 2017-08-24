/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:38:54
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
        let { children, show } = this.props;

        return show && (
            <CssLayout layout="5" className={
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
