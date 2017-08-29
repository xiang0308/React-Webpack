/*
* @Author: wangxiang
* @Date:   2017-06-26 14:26:58
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-29 11:58:16
*/

import React, { Component } from 'react';
import classnames from 'classnames';

import './index.less';

class LogoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logos: [
                require('./img/360_logo.png'),
                require('./img/baidu_logo.png'),
                require('./img/sougou_logo.png'),
                require('./img/google_logo.png')
            ],
            selectIndex: 0,
            showLogo: false
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    /**
     * [handleLogoSelect 处理logo选择]
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    handleLogoSelect(ev) {
        var index = parseInt(ev.target.getAttribute('data-index'));
        this.setState({
            selectIndex: index,
            showLogo: !this.state.showLogo
        }, () => {
            this.props.onLogoChange(index)
        })
    }

    /**
     * [showLogoList 显示logo列表]
     * @return {[type]} [description]
     */
    showLogoList() {
        this.setState({
            showLogo: !this.state.showLogo
        })
    }

    render() {
        let _state = this.state;
        let logos = _state.logos;
        let showLogo = classnames(['logo-panel-list', this.state.showLogo ? 'show' : 'hide']);

        const Li = this.state.logos.map((logo, index)=>{
            return (
                <div className="logo-panel-list-item"
                     key={index}>
                    <img src={logo} onClick={this.handleLogoSelect.bind(this)} data-index={index}/>
                </div>
            )
        });

        return (
            <div className="logo-panel">
                <div className="logo-panel-display">
                    <img src={logos[this.state.selectIndex]}/>
                </div>
                <span className="logo-panel-select-arrow"
                    onClick={() => this.showLogoList()}></span>
                <div className={showLogo}>
                    { Li }
                </div>
            </div>
        );
    }
}

export default LogoComponent;
