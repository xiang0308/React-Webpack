/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:16:08
*/

import React, {Component} from 'react';
import classnames from 'classnames';
import './index.less';

class MaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleClose(e) {
        let {onClick} = this.props;
        e.preventDefault();
        onClick();
    }

    render() {
        let { show } = this.props;

        return (
            <div
                onClick={(e) => this.handleClose(e)}
                className={classnames(['mask', show ? 'show' : ''])}>
            </div>
        );
    }
}

MaskComponent.defaultProps = {
    // layout: PropTypes.string
};

export default MaskComponent;
