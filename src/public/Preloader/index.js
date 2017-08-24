/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:38:34
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

PreloaderComponent.defaultProps = {
    // layout: PropTypes.string
};

export default PreloaderComponent;

