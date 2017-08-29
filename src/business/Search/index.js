/*
* @Author: wangxiang
* @Date:   2017-06-26 14:26:58
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-29 11:22:12
*/

import React, { Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import LogoComponent from 'business/Logo';

import './index.less';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClear: false,
            keyword: '',
            showList: [],
            listIndex: 0,
            searchSrcs: [
                'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q=',
                'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=',
                'https://www.sogou.com/web?query=',
                'https://www.google.co.jp/search?hl=zh-CN&q='
            ],
            searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
        }
    }

    //处理输入
    handleInput(ev) {
        let _this = this;

        if (ev.target.value) {
            this.setState({
                isClear: true
            });
        } else {
            this.setState({
                isClear: false
            });
        }

        _this.setState({
            keyword: ev.target.value
        }, () => {
            //jsonp获取数据
            $.ajax({
                url: 'https://sug.so.360.cn/suggest?word=' + this.state.keyword + '&encodein=utf-8&encodeout=utf-8',
                type: 'get',
                dataType: "jsonp"
            }).done(function (data) {
                var list = data.s;
                _this.setState({
                    showList: list
                })
            })
        });
    }

    /**
     * [handleMouseSelect 处理鼠标hover]
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    handleMouseSelect(ev) {
        let index = ev.target.getAttribute('data-index');

        this.setState({
            listIndex: parseInt(index)
        })
    }

    /**
     * [handleSelectClick 处理点击列表]
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    handleSelectClick(ev) {
        this.setState({
            keyword: ev.target.innerText
        }, () => {
            this.refs.input.value = this.state.keyword;
            setTimeout(()=> {
                this.handleSearch();
            }, 50);
        })
    }

    /**
     * [handleClearClick 处理点击清除按钮]
     * @return {[type]} [description]
     */
    handleClearClick() {
        this.setState({
            keyword: '',
            showList: []
        });

        this.refs.input.value = '';
    }

    /**
     * [handleSearch 处理搜索]
     * @return {[type]} [description]
     */
    handleSearch() {
        let _state = this.state;

        window.location.href = _state.searchSrc + _state.keyword;
    }

    /**
     * [handleKeyEnter 处理Enter键]
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    handleKeyEnter(ev) {
        let keyCode = ev.keyCode;

        switch (keyCode) {
            case 13:
                this.handleSearch();
                break;
            case 38:
                this.selectUpAndDown(ev, keyCode);
                break;
            case 40:
                this.selectUpAndDown(ev, keyCode);
                break;
        }
    }

    /**
     * [selectUpAndDown 上下键选择列表项]
     * @param  {[type]} ev      [description]
     * @param  {[type]} keycode [description]
     * @return {[type]}         [description]
     */
    selectUpAndDown(ev, keycode) {
        ev.preventDefault();
        let _state = this.state;

        const stateCb = () => {
            this.setState({
                keyword: this.state.showList[this.state.listIndex]
            }, function () {
                this.refs.input.value = this.state.keyword;
            });
        }

        if (keycode === 38) {
            this.setState({
                listIndex: _state.listIndex == 0 ? 9 : --_state.listIndex
            }, stateCb);
        } else if (keycode === 40) {
            this.setState({
                listIndex: _state.listIndex == 9 ? 0 : ++_state.listIndex
            }, stateCb);
        }
    }

    /**
     * [onLogoChange logo选择与父组件通信]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    onLogoChange(index) {
        this.setState({
            searchSrc: this.state.searchSrcs[index]
        })
    }

    render() {
        let _this = this;
        let _state = this.state;
        let isShow = classnames(['search-clearinput', this.state.isClear ? 'show' : 'hide']);

        const Li = _state.showList.map((value, index)=>
            <li key={ index }
                data-index={ index }
                className={ this.state.listIndex == index ? 'is-select' : '' }
                onMouseOver={ this.handleMouseSelect.bind(_this) }
                onClick={ this.handleSelectClick.bind(_this) }>
                { value }
            </li>
        );

        return (
            <div className="search">
                <LogoComponent onLogoChange={this.onLogoChange.bind(this)}/>
                <div className="search-panel">
                    <input type="text" className="search-input"
                           onChange={this.handleInput.bind(_this)}
                           onKeyDown={this.handleKeyEnter.bind(_this)}
                           ref="input"
                    />
                    <span className={isShow} onClick={ this.handleClearClick.bind(_this) }>&times;</span>
                    <button className="search-btn" onClick={ this.handleSearch.bind(_this)}>搜一下</button>
                </div>
                <div className="search-list">
                    <ul>
                        { Li }
                    </ul>
                </div>
            </div>
        )
    }
}

export default SearchComponent;
