/*
* @Author: wangxiang
* @Date:   2017-06-26 18:44:22
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-09-09 16:09:18
*/

import React, { Component } from 'react';
import './index.less';

class OrientationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reRender: false
        }
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
        return (
            <div className="horizon">
                <div className="horizon_box">
                    <div className="horizon_pic"><i></i></div>
                    <span>为了更好的体验，请将手机竖过来哦~</span>
                </div>
            </div>
        );
    }
}

export default OrientationComponent;
