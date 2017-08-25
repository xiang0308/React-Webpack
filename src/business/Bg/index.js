/*
* @Author: wangxiang
* @Date:   2017-06-27 14:26:58
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-06-27 14:30:51
*/

import React, {Component} from 'react';
import './index.less';

class BgComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ui-bg">
                {this.props.children}
            </div>
        );
    }
}

export default BgComponent;
