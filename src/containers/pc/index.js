/*
* @Author: wangxiang
* @Date:   2017-07-24 17:55:12
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-07-25 16:25:36
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Mobile from 'public/Mobile';
import Preloader from 'public/Preloader';
import Mask from 'public/Mask';
import * as services from 'services';

import './index.less';

class MobileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount() {
        this.props.actions.hideModal();
    }

    componentDidMount() {
        let { actions } = this.props;
        actions.hidePreloader();
        this.setState({
            isLoading: false
        });
    }

    render() {
        let { children, preloader, alert, modal, confirm } = this.props;

        return (
            <Mobile width="1000">
                <Mask
                    show={alert.show || modal.show || confirm.show}>
                </Mask>

                {!this.state.isLoading && (
                    children
                )}

                <Preloader preloader={preloader}></Preloader>
            </Mobile>
        );
    }
}

MobileComponent.defaultProps = {};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileComponent)
