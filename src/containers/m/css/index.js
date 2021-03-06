/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-29 10:56:17
*/
import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import CssLayout from 'public/CssLayout';
import CssFlex from 'public/CssFlex';
import CssAlign from 'public/CssAlign';
import './index.less';

class CssComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="m-css">
                <h3>1. 显示layout</h3>
                <div className="m-css-layout">
                    <CssLayout layout="1">1</CssLayout>
                    <CssLayout layout="2">2</CssLayout>
                    <CssLayout layout="3">3</CssLayout>
                    <CssLayout layout="4">4</CssLayout>
                    <CssLayout layout="5">5</CssLayout>
                    <CssLayout layout="6">6</CssLayout>
                    <CssLayout layout="7">7</CssLayout>
                    <CssLayout layout="8">8</CssLayout>
                    <CssLayout layout="9">9</CssLayout>
                </div>
                <hr />
                <h3>2. 显示flex</h3>
                <div className="m-css-flex">
                    <CssFlex flex="1">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </CssFlex>
                    <CssFlex flex="2">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </CssFlex>
                </div>
                <hr />
                <h3>3. 显示align</h3>
                <div className="m-css-align">
                    <CssAlign align="1">11111111</CssAlign>
                    <CssAlign align="2">11111111</CssAlign>
                    <CssAlign align="3">11111111</CssAlign>
                </div>
                <hr />
                <h3>4. 显示动效</h3>
                <div className="m-css-effect">
                    <Link className="m-css-effect-link" to={'/m/effect'}>effect</Link>
                </div>
            </div>
        );
    }
}

CssComponent.defaultProps = {};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CssComponent)
