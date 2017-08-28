/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:15:01
*/

import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

class ConfirmComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleCancel(e) {
        let { cancel, actions } = this.props;

        e.preventDefault();

        actions.hideConfirm();

        if (cancel) {
            cancel();
        }
    }

    handleClick(e) {
        let { callback, actions } = this.props;

        e.preventDefault();

        actions.hideConfirm();

        if (callback) {
            callback();
        }

    }

    render() {
        let { title, text, className, show } = this.props;

        return (
            <div className={
                classnames(['confirm', className || '', show ? 'show' : ''])
            }>
                <div className="confirm-inner">
                    <div className="confirm-title">
                        {title}
                    </div>
                    <div className="confirm-text">
                        {text}
                    </div>
                </div>
                <div className="confirm-btn-list">
                    <div onClick={(e) => this.handleCancel(e)} className="confirm-btn">
                        Cancel
                    </div>
                    <div onClick={(e) => this.handleClick(e)} className="confirm-btn">
                        Ok
                    </div>
                </div>
            </div>
        );
    }
}

ConfirmComponent.defaultProps = {
    // layout: PropTypes.string
};

export default ConfirmComponent;
