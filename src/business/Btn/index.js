/*
* @Author: wangxiang
* @Date:   2017-06-26 18:46:30
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-07-25 17:18:18
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import './index.less';

class BtnComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleClick(e) {
        let {onClick} = this.props;

        e.preventDefault();
        onClick();
    }

    render() {
        let {type, text, readonly} = this.props;
        let className = classnames(['ui-btn', type ? type : '', readonly ? 'readonly' : '']);

        return (
            <div className={className} onClick={(e) => this.handleClick(e)} >
                <div className={type}>
                    {text}
                </div>
            </div>
        );
    }
}

BtnComponent.defaultProps = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    readonly: PropTypes.bool
};

export default BtnComponent;
