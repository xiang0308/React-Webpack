/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:41:27
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Mobile from 'public/Mobile';
import Preloader from 'public/Preloader';
import Mask from 'public/Mask';
import Modal from 'public/Modal';
import Alert from 'public/Alert';
import Confirm from 'public/Confirm';
import Music from 'public/Music';
import './index.less';

let bgSrc = require('images/bg.mp3');

class MobileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        let { actions } = this.props;

        // actions.showAlert('aaa', 'ssss', function() {
        //     alert(111);
        // });
        // //
        // actions.showAlert('aaa2', function() {
        //     alert(222);
        // });

        // actions.showAlert('aaa3', 'sss3');

        // actions.showAlert('aaa4');
        //
        // actions.showConfirm('Are you sure?', function() {
        //     actions.showAlert('aaa5');
        // });

        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 1000);


        setTimeout(() => {
            actions.pauseMusic();
        }, 3000);
    }


    render() {
        let { children, preloader, alert, modal, confirm, actions, music } = this.props;

        return (
            <Mobile>
                <Mask show={alert.show || modal.show || confirm.show}></Mask>

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

                <Music src={bgSrc} play={music.play}></Music>
                <Preloader preloader={preloader}></Preloader>
            </Mobile>
        );
    }
}

MobileComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileComponent)
