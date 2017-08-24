/**
 * Created by weijie on 2017/4/19.
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

class CssLayoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, layout, className } = this.props;

        return (
            <div className={
                classnames(['css-layout', 'css-layout-' + layout, className || ''])
            }>
                {children}
            </div>
        );
    }
}

CssLayoutComponent.defaultProps = {
    // layout: PropTypes.string
};

export default CssLayoutComponent;
