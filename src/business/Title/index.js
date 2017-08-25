/*
* @Author: wangxiang
* @Date:   2017-06-26 18:46:30
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-06-27 16:32:57
*/

import React, { Component } from 'react';
import './index.less';

class TitleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { type } = this.props;
        let title = 'ui-title';

        if (type) {
            title = title + ' ' + type;
        }

        return (
            <div className={title}>
                <div className={type}></div>
            </div>
        );
    }
}

export default TitleComponent;
