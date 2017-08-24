/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:40:58
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import ListView from 'public/ListView';
import './index.less';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        // console.log(actions);
    }
    handleRender(list) {
        this.setState({
            list
        });
    }
    handleLoad(data) {
        return new Promise(function(resolve) {
            setTimeout(function () {
                let data2 = [];
                let len = data.length;

                for (var i = 0; i < 50; i ++) {
                    data2[i] = i + 1 + len;
                }

                resolve(data2.sort(() => {
                    return Math.random() - 0.5;
                }));

            }, 2000 * Math.random());
        });
    }

    render() {
        return (
            <div className="m-list">
                <h3>显示list</h3>
                <div className="m-list-list">
                    <ListView
                        allowPull={true}
                        allowScroll={true}
                        handleLoad={(data, callback) => this.handleLoad(data, callback)}
                        handleRender={(list) => this.handleRender(list)}>
                        {this.state.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item}
                                </li>
                            )
                        })}
                    </ListView>
                </div>
            </div>
        );
    }
}

ListComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListComponent)
