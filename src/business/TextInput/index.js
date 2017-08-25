/*
* @Author: wangxiang
* @Date:   2017-07-25 15:22:53
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-07-25 16:35:37
*/
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import './index.less';

class TextInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleInput(e) {
        let text = e.target.value;
        this.props.onInput(text);
    }

    render() {
        let {type, placeholder, text} = this.props;
        let className = classnames(['ui-input', type ? type : '']);

        return (
            <input type="text"
                   value={text}
                   className={className}
                   placeholder={placeholder}
                   onInput={(e) => this.handleInput(e)}/>
        );
    }
}

TextInputComponent.defaultProps = {
    placeholder: PropTypes.string,
    onInput: PropTypes.func
};

export default TextInputComponent;
