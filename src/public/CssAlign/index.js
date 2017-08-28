/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:15:10
*/
import React, {Component} from 'react';
import classnames from 'classnames';
import './index.less';

class CssAlignComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let { children, align } = this.props;

        return (
            <div className={
                classnames(['css-align', 'css-align-' + align])
            }>
                {children}
            </div>
        );
    }
}

CssAlignComponent.defaultProps = {
    // fn: PropTypes.func, //isRequired
    // string: PropTypes.string,
    // bool: PropTypes.bool,
    // array: PropTypes.array
};

export default CssAlignComponent;
