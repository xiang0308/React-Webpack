/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:16:41
*/

import React, {Component} from 'react';
import './index.less';
import CssLayout from 'public/CssLayout';

class PreloaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {preloader} = this.props;

        return preloader.show && (
            <CssLayout layout="5">
                <div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </CssLayout>
        );
    }
}

PreloaderComponent.defaultProps = {};

export default PreloaderComponent;

