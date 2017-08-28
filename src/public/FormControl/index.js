/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:15:44
*/

import React, { Component } from 'react';
import './index.less';

class FormControlComponent extends Component {
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
        let html;

        switch (type) {
            case '+num':
                html = <input type="number" pattern="[0-9]*" {...this.props}/>;
                break;
            case 'num':
                html = <input type="number" {...this.props}/>;
                break;
            case 'tel':
                html = <input type="tel" {...this.props}/>;
                break;
            case 'email':
                html = <input type="email" {...this.props}/>;
                break;
            case 'url':
                html = <input type="url" {...this.props}/>;
                break;
            case 'search':
                html = <input type="search" {...this.props}/>;
                break;
            case 'datetime':
                html = <input type="datetime" {...this.props}/>;
                break;
            default:
                html = <input type="text" {...this.props}/>;
                break;
        }

        return (
            <div>
                {html}
            </div>
        );
    }
}

FormControlComponent.defaultProps = {
    type: 'text'
    // layout: PropTypes.string
};

export default FormControlComponent;
