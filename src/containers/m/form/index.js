/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:40:52
*/
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import ReactMixin from 'react-mixin';
import TwoWayBind from 'public/TwoWayBind';
import FormControl from 'public/FormControl';
import './index.less';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: {
                name: '',
                code: ''
            },
            $errorMsg: {},
            $error: {}
        }
    }

    formConfig() {
        return {
            validation: {
                name: {
                    isRequired: true,
                    maxLength: 50
                },
                code: {
                    isRequired: true,
                    isNumeric: true,
                    isLength: 6
                }
            },
            submitField:  ['name', 'code']
        };
    }


    submit() {
        console.log(arguments[0]);
    }

    componentWillMount() {
    }

    componentDidMount() {
        // console.log(actions);
    }

    render() {
        return (
            <div className="m-form">
                <h3>显示form</h3>
                <div className="show-base-form">
                    <form className="pure-form pure-form-stacked" onSubmit={e => this.handleSubmit(e)}>
                        <fieldset>
                            <legend>A Stacked Form</legend>

                            <label htmlFor="name">Name</label>
                            <FormControl
                                id="name"
                                type="text"
                                value={this.state.field.name}
                                onChange={(e) => this.changeFormField(e, 'name')}
                                placeholder="Name" />
                            <span className="pure-form-message">
                                {this.state.$errorMsg.name}
                            </span>

                            <label htmlFor="code">Code</label>
                            <FormControl
                                id="code"
                                type="number"
                                value={this.state.field.code}
                                onChange={(e) => this.changeFormField(e, 'code')}
                                placeholder="Code" />
                            <span className="pure-form-message">
                                {this.state.$errorMsg.code}
                            </span>

                            <button type="submit">Sign in</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

FormComponent.defaultProps = {
};

ReactMixin(FormComponent.prototype, TwoWayBind);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent)
