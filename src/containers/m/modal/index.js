/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:41:03
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Modal from 'public/Modal';
import './index.less';

class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        // console.log(actions);
    }

    handleAlertText(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showAlert('a1-text');
    }

    handleAlertTextTitle(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showAlert('a2-text', 'a2-title');
    }

    handleAlertTextTitleCallback(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showAlert('a3-text', 'a3-title', function() {
            alert('a3-callback');
        });

    }

    handleAlertTextCallback(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showAlert('a4-text', function() {
            alert('a4-callback');
        });
    }

    handleConfirmOk(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showConfirm('c1-text', function() {
            alert('c1-ok');
        });
    }

    handleConfirmOkCancel(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showConfirm('c2-text', function() {
            alert('c2-ok');
        }, function() {
            alert('c2-cancel');
        });
    }

    handleConfirmTitleOk(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showConfirm('c3-text', 'c3-title', function() {
            alert('c3-ok');
        });
    }

    handleConfirmTitleOkCancel(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showConfirm('c4-text', 'c4-title', function() {
            alert('c4-ok');
        }, function() {
            alert('c4-cancel');
        });
    }

    handleClick(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.showModal();
    }

    handleClose(e) {
        let { actions } = this.props;

        e.preventDefault();

        actions.hideModal();
    }

    render() {
        let { modal } = this.props;

        return (
            <div className="m-modal">
                <h3>alert</h3>
                <p><a href="#" onClick={(e) => this.handleAlertText(e)} className="alert-text">Alert With Text</a></p>
                <p><a href="#" onClick={(e) => this.handleAlertTextTitle(e)} className="alert-text-title">Alert With Text and Title</a></p>
                <p><a href="#" onClick={(e) => this.handleAlertTextTitleCallback(e)} className="alert-text-title-callback">Alert With Text and Title and Callback</a></p>
                <p><a href="#" onClick={(e) => this.handleAlertTextCallback(e)} className="alert-text-callback">Alert With Text and Callback</a></p>
                <h3>confirm</h3>
                <p><a href="#" onClick={(e) => this.handleConfirmOk(e)} className="confirm-ok">Confirm with text and Ok callback</a></p>
                <p><a href="#" onClick={(e) => this.handleConfirmOkCancel(e)} className="confirm-ok-cancel">Confirm with text, Ok and Cancel callbacks</a></p>
                <p><a href="#" onClick={(e) => this.handleConfirmTitleOk(e)} className="confirm-title-ok">Confirm with text, title and Ok callback</a></p>
                <p><a href="#" onClick={(e) => this.handleConfirmTitleOkCancel(e)} className="confirm-title-ok-cancel">Confirm with text, title, Ok and Cancel callback</a></p>
                <h3>modal</h3>
                <p>
                    <a href="#" onClick={(e) => this.handleClick(e)}>Open Modal</a>
                </p>

                <Modal show={modal.show}>
                    modal
                    <a href="" onClick={(e) => this.handleClose(e)}>Close</a>
                </Modal>
            </div>
        );
    }
}

ModalComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalComponent)
