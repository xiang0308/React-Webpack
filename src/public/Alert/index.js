/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:14:50
*/

import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

class AlertComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleClick(e) {
        let { callback, actions } = this.props;

        e.preventDefault();

        actions.hideAlert();

        if (callback) {
            callback();
        }

    }

    render() {
        let { title, text, className, show } = this.props;

        return (
            <div className={
                classnames(['alert', className || '', show ? 'show' : ''])
            }>
                <div className="alert-inner">
                    <div className="alert-title">
                        {title}
                    </div>
                    <div className="alert-text">
                        {text}
                    </div>
                </div>
                <div className="alert-btn-list">
                    <div onClick={(e) => this.handleClick(e)} className="alert-btn">
                        Ok
                    </div>
                </div>
            </div>
        );
    }
}

AlertComponent.defaultProps = {
    // layout: PropTypes.string
};

export default AlertComponent;
