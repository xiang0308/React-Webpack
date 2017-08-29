/*
* @Author: wangxiang
* @Date:   2017-07-25 15:22:53
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:52:40
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import SearchComponent from 'business/Search';

import './index.less';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ui-search">
                <SearchComponent></SearchComponent>
            </div>
        );
    }
}

SearchInput.defaultProps = {};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchInput);
