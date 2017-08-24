/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:39:08
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

    render() {
        let { show } = this.props;

        return (
            <div className={
                classnames(['mask', show ? 'show' : ''])
            }>
            </div>
        );
    }
}

MaskComponent.defaultProps = {
    // layout: PropTypes.string
};

export default MaskComponent;
