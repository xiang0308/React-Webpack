/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:41:10
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import './index.less';

class PreloaderComponent extends React.Component {
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

    handleClick(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showPreloader();
    }

    render() {
        return (
            <div className="m-preload">
                <h3>显示preloader</h3>
                <div className="show-base-list">
                    <a href="" onClick={(e) => this.handleClick(e)}> btn </a>
                </div>
            </div>
        );
    }
}

PreloaderComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreloaderComponent)
