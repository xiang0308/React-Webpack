/*
* @Author: wangxiang
* @Date:   2017-03-29 15:36:16
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-09-29 17:24:41
*/
import React, { Component, PropTypes } from 'react';
import PageComponent from 'public/Page';
import BtnComponent from 'business/Btn';
import TextInputComponent from 'business/TextInput';
import * as services from 'services';
import './index.less';

class LotteryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readonly: false,    // 是否只读模式
            totalNum: '',        // 总记录数
            current: 1,         // 当前页码
            pageSize: 10,         // 每页显示的条数
            totalPage: '',       // 总页数
            goValue: '',         // 跳转
            text: '',           // 输入框的文本值
            indexList: [],      // 获取数据的存放数组
            result: []          // 返回数据
        }
    }

    componentWillMount() {
        let _this = this;
        setTimeout(function() {
            _this.getLotteryList();
        }, 0);
    }

    componentDidMount() {
        let _this = this, { location } = _this.props;
        window.ReactLocation = location;
    }

    /**
     * [getLotteryList 获取中奖列表数据]
     * @return {[type]} [description]
     */
    getLotteryList() {
        let _this = this;
        let ApiService = services.ApiService;

        ApiService
            .getAllList()
            .then(function (res) {
                if (res && res.result && res.result.length) {
                    let mockData = _this.handler2Arr(res.result);
                    _this.setState({
                            indexList: mockData,
                            result: mockData,
                            totalNum: mockData.length,
                            // 计算总页数= 总记录数 / 每页显示的条数
                            totalPage: Math.ceil( mockData.length / _this.state.pageSize)
                    });
                    _this.pageClick(_this.state.current);
                }
            });
    }

    /**
     * [pageClick 点击翻页]
     * @param  {[type]} pageNum [description]
     * @return {[type]}         [description]
     */
    pageClick(pageNum) {
        let _this = this;
        if(pageNum != _this.state.current){
           _this.state.current = pageNum
        }
        _this.state.indexList = [];//清空之前的数据
        for(var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++){
           if(_this.state.result[i]){
               _this.state.indexList.push(_this.state.result[i]);
           }
        }
        _this.setState({indexList:_this.state.indexList});
    }

    /**
     * [goPrevClick 上一步]
     * @return {[type]} [description]
     */
    goPrevClick(){
        var _this = this;
        let cur = this.state.current;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    }

    /**
     * [goNext 下一步]
     * @return {[type]} [description]
     */
    goNext() {
        let _this = this, cur = _this.state.current;
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    }

    /**
     * [goSwitchChange 跳转到指定页]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    goSwitchChange(e) {
        let _this = this, value = e.target.value;
        _this.setState({goValue : value});
        if (!/^[1-9]\d*$/.test(value)) {
            console.warn('页码只能输入大于1的正整数哦~');
        } else if (parseInt(value) > parseInt(_this.state.totalPage)){
            console.warn('没有这么多页哦~');
        } else {
            _this.pageClick(value);
        }
    }

    /**
     * [handleClick 点击查询]
     * @return {[type]} [description]
     */
    handleClick() {
        let _this = this;
        let ApiService = services.ApiService;
        let txt = this.state.text.trim();

        if (txt.trim() != '' && !services.validTelephoneNum(txt)) {
            alert('请输入正确手机号哦~');
            return;
        }

        _this.setState({
            text: txt
        });

        if (txt == '' || txt.trim() == '') {
            _this.getLotteryList();
        } else {
             ApiService
                .getAllList({
                    phone: _this.state.text
                })
                .then(function (res) {
                    if (res && res.result && res.result.length) {
                        let mockData = _this.handler2Arr(res.result);
                        _this.setState({
                                indexList: mockData,
                                result: mockData,
                                totalNum: mockData.length,
                                // 计算总页数= 总记录数 / 每页显示的条数
                                totalPage: Math.ceil( mockData.length / _this.state.pageSize)
                        });
                        _this.pageClick(_this.state.current);
                    }
                });
        }

    }

    /**
     * [handleInput 文本框输入值]
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    handleInput(text) {
        this.setState({
            text: text
        });
    }

    handler2Arr(arrs) {
        let childNodes = [];
        arrs.forEach(item => {
            let prize_name = '';
            item.forEach((v) => {
                prize_name += v.prize_name + ',';
            });
            item[0].prize_name = prize_name.substr(0, prize_name.length - 2);
            childNodes.push(item[0]);
        });

        return childNodes;
    }

    /**
     * [render 渲染DOM]
     * @return {[type]} [description]
     */
    render() {
        return (
            <div className="lottery-wrap">
                <ul className="ui-search">
                    <li>参与人：</li>
                    <li>
                        <TextInputComponent type="us" onInput={(text) => this.handleInput(text)} text={this.state.text} placeholder="请输入手机号" />
                    </li>
                    <li>
                        <BtnComponent type="us" text="查询" onClick={() => this.handleClick()}/>
                    </li>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>
                                参与人
                            </th>
                            <th>
                                参与时间
                            </th>
                            <th>
                                抽奖金额
                            </th>
                            <th>
                                奖品名
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.indexList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.phone}
                                    </td>
                                    <td>
                                        {item.create_at}
                                    </td>
                                    <td>
                                        {item.price}
                                    </td>
                                    <td>
                                        {item.prize_name}
                                    </td>
                                </tr>
                              )
                        })}
                    </tbody>
                </table>
                <div className="ui-page">
                    <PageComponent
                        total={this.state.totalNum}
                        current={this.state.current}
                        totalPage={this.state.totalPage}
                        goValue={this.state.goValue}
                        pageClick={this.pageClick.bind(this)}
                        goPrev={this.goPrevClick.bind(this)}
                        goNext={this.goNext.bind(this)}
                        switchChange={this.goSwitchChange.bind(this)} />
                </div>
            </div>
        );
    }
}

LotteryComponent.defaultProps = {
    fn: PropTypes.func,
    string: PropTypes.string,
    bool: PropTypes.bool,
    array: PropTypes.array
};

export default LotteryComponent;
