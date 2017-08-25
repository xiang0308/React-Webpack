/*
* @Author: wangxiang
* @Date:   2017-07-25 15:22:53
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-21 15:29:39
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actions from 'actions';
import * as services from 'services';
import TextInputComponent from 'business/TextInput';
import BtnComponent from 'business/Btn';

import './index.less';

class AdminComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            date: '',
            season: '',
            chooseDataAM: [],
            chooseDataPM: [],
            list: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.getDayStockList()
    }

    formatData(data) {
        let tempData = data;
        let arrs = [];
        let key, value;

        if (tempData) {
            for(key in tempData) {
                value = tempData[key];
                arrs.push({
                    season: key,
                    stock: value
                });
            }

            return arrs;
        }
    }

    getDayStockList(date) {
        let ryApi = services.ApiService;
        let { actions } = this.props;

        actions.showPreloader();
        ryApi
           .getDayStockList({
                date: date || ''
           })
           .then(res => {
                actions.hidePreloader();
                let data = res.data;
                let chooseDataAM = this.formatData(data.am);
                let chooseDataPM = this.formatData(data.pm);

                let list = chooseDataAM.concat(chooseDataPM);

                this.setState({
                    list: list,
                    chooseDataAM: chooseDataAM || [],
                    chooseDataPM: chooseDataPM || []
                });
           })
           .catch(() => {
                actions.hidePreloader();
           });
    }

    handleDateInput(date) {
        this.setState({
            date: date
        });
    }

    handleSeasonInput(season) {
        this.setState({
            season: season
        });
    }

    handleSearchClick() {
        if (this.state.date) {
            this.getDayStockList(this.state.date);
        }
    }

    handleStatusClick(e, index) {
        e.preventDefault();

        let item = this.state.list[index];
        let isshow = item.isshow;

        item.isshow = !isshow;

        this.setState({
            list: this.state.list
        });

        /*<li className="ml10">场次：</li>
        <li>
            <TextInputComponent type="search" onInput={(season) => this.handleSeasonInput(season)} text={this.state.season} placeholder="请输入场次" />
        </li>
        <td>
            <a className="ui-admin-btn" onClick={(e) => this.handleStatusClick(e, index)}>
                {item.isshow ? '开启' : '关闭'}
            </a>
        </td>*/
    }

    render() {
        return (
            <div className="ui-admin">
                <div className="ui-admin-title">大宁集装箱迷你剧预约数据后台</div>
                <ul className="ui-admin-search mb15">
                    <li>日期：</li>
                    <li>
                        <TextInputComponent type="search" onInput={(date) => this.handleDateInput(date)} text={this.state.date} placeholder="请输入日期" />
                    </li>
                    <li className="ml10">
                        <BtnComponent type="search" readonly={false} text="查询" onClick={() => this.handleSearchClick()}/>
                    </li>
                    <li className="ml10 red">
                        （查询时请输入日期，如“0728”则显示7月28日的场次库存情况）
                    </li>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>场次</th>
                            <th>库存量</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map((item, index) => {
                        return (
                                <tr key={index}>
                                    <td>
                                        {item.season}
                                    </td>
                                    <td>
                                        {item.stock}
                                    </td>
                                </tr>
                            );
                        })}
                        <tr className={classnames(['ui-record',this.state.list.length === 0 ? '':'hide'])}>
                            <td colSpan="2">暂无记录</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

AdminComponent.defaultProps = {};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminComponent)
