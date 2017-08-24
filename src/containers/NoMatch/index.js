/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:41:36
*/

import React, {Component} from 'react';

class NoMatchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="">
				您输入的URL地址有误~
			</div>
        );
    }
}

export default NoMatchComponent;
