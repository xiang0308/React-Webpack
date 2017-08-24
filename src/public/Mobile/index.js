/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:39:00
*/
import React, {Component} from 'react';
import classnames from 'classnames';
import './index.less';

class MobileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, width } = this.props;

        return (
            <div ref="mobile" className={
                classnames(['mobile'])
            } style={{
                width: (width || 750 + 'px')
            }}>
                {children}
            </div>
        );
    }
}

MobileComponent.defaultProps = {
    // layout: PropTypes.string
};

export default MobileComponent;
