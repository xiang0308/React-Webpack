/*
* @Author: wangxiang
* @Date:   2017-04-26 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-06-16 17:19:36
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from 'actions';
import Mobile from 'public/Mobile';
import Preloader from 'public/Preloader';
import Mask from 'public/Mask';
import Modal from 'public/Modal';
import Alert from 'public/Alert';
import Confirm from 'public/Confirm';
import Music from 'public/Music';
import Orientation from 'public/Orientation';
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
        let ryApi = services.ApiService;
        window.openid = this.props.location.query.openid;
        this.onOrientationChange();

        /**********  获取分享JS-SDK应用程序签名信息 **********/
        if (window.openid) {
            actions.showPreloader();
            ryApi
                .appInfo()
                .then(res => {
                    let appInfoConfig = res.result || {};
                    if (appInfoConfig.appId) {
                        services
                            .wxConfig(appInfoConfig)
                            .then(() => {
                                // 背景音乐需要主动触发下，不然不会加载播放
                                window.audioElement.load();
                                window.audioElement.play();
                                // ryApi.maidian({
                                //     openid: window.openid,
                                //     type: '1'
                                // });
                            })
                            .always(() => {
                                actions.hidePreloader();
                            });
                    } else {
                        actions.hidePreloader();
                    }
                    this.setState({
                        isLoading: false
                    });
            });
        } else {
            window.audioElement.load();
            window.audioElement.play();
            this.setState({
                isLoading: false
            });
        }
    }

    onOrientationChange() {
        let { actions, music } = this.props;

        $(window).on('orientationchange', () => {
            setTimeout(()=>{
                let ww = $(window).width(),
                    wh = $(window).height();
                if (ww > wh) {
                    this.setState({ isLandscape: true });
                    actions.pauseMusic();
                    window.audioElement.pause();
                } else {
                    this.setState({ isLandscape: false });
                    if (music.play) {
                        actions.playMusic();
                        window.audioElement.play();
                    } else {
                        actions.pauseMusic();
                        window.audioElement.pause();
                    }
                }
            }, 300);
        });
    }

    render() {
        let { children, preloader, alert, modal, confirm, actions, music } = this.props;

        return (
            <Mobile>
                <Mask
                    show={alert.show || modal.show || confirm.show}
                    onClick={() => this.handleClose()}>
                </Mask>
                {this.state.isLandscape && <Orientation></Orientation>}
                {!this.state.isLoading && (
                    children
                )}
                <Modal show={alert.show}>
                    <Alert
                        actions={actions}
                        show={alert.show}
                        title={alert.title}
                        text={alert.text}
                        callback={alert.callback}
                    >
                    </Alert>
                </Modal>
                <Modal show={confirm.show}>
                    <Confirm
                        actions={actions}
                        show={confirm.show}
                        title={confirm.title}
                        text={confirm.text}
                        callback={confirm.callback}
                        cancel={confirm.cancel}
                    >
                    </Confirm>
                </Modal>
                <Music
                    actions={ actions }
                    play={ music.play }
                >
                </Music>
                <Preloader preloader={ preloader }></Preloader>
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
