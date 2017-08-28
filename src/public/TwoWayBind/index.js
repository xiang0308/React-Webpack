/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:17:06
*/

const TwoWayBind = {
    // form start
    getFormVal(formName) {
        let rtv;
        let fc = this.formConfig();
        let formType = fc.validation[formName].type;


        switch (formType) {
            case 'checkbox':
                rtv = this.state.field[formName + '_list'].filter((item) => {
                    return this.state.field[formName + '_map'][item.val];
                }).map((item) => {
                    return item.val;
                });
                break;
            case 'file':
                rtv = this.state.field[formName].src;
                break;
            default:
                rtv = this.state.field[formName];
                break;
        }

        return rtv;
    },
    setFormVal(formName, val) {
        let beforeField = this.state.field;

        this.setState({
            field: Object.assign({}, beforeField, {
                [formName]: val
            })
        });
    },
    changeFormField(e, formName, formType, formCheckboxValue) {
        let val;

        switch (formType) {
            case 'checkbox':
                val = this.state.field[formName + '_map'];

                val[formCheckboxValue] = e.target.checked;
                break;
            case 'file':
                val = e;
                break;
            default:
                val = e.target.value;
                break;
        }
        this.setFormVal(formName, val);
        this.validationFormField(formName, val)
    },
    updateFormValidation(formName, $errorObj, $errorMsgObj) {
        let $error = this.state.$error;
        let $errorMsg = this.state.$errorMsg;

        $error[formName] = $errorObj;
        $errorMsg[formName] = $errorMsgObj;

        this.setState({
            $error,
            $errorMsg
        });
    },
    validationForm() {
        let rtv = false;
        let fc = this.formConfig();
        // let oldValidationStateMap = this.state.validationStateMap || {};

        let submitField = fc.submitField;

        submitField.forEach((item) => {
            let isError = this.validationFormField(item, this.getFormVal(item));
            if (isError) {
                rtv = true;
            }
        });

        return rtv;
    },
    handleSubmit(e) {
        // let elForm = e.target;
        let fc = this.formConfig();
        let rtv = {};

        e.preventDefault();
        if (this.validationForm()) {
            return false;
        }

        fc.submitField.map((item) => {
            rtv[item] = this.getFormVal(item);
        });

        this.submit(rtv);

    },
    validationFormField(formName, formVal) {
        let fc = this.formConfig();
        let vd = fc.validation[formName];
        let $error = '';
        let $errorMsg = '';

        if (vd) {
            if (vd.isRequired) {
                if (vd.type === 'checkbox') {
                    if (formVal.length === 0) {
                        $error = 'isRequired';
                        $errorMsg = '请选择';
                    }
                } else if (vd.type === 'select') {
                    if (formVal === '') {
                        $error = 'isRequired';
                        $errorMsg = '请选择';
                    }
                } else if (vd.type === 'radio') {
                    if (formVal === '') {
                        $error = 'isRequired';
                        $errorMsg = '请选择';
                    }
                } else if (vd.type === 'file') {
                    if (formVal === '') {
                        $error = 'isRequired';
                        $errorMsg = '请上传';
                    }
                } else {
                    if (formVal === '') {
                        $error = 'isRequired';
                        $errorMsg = '请输入';
                    }
                }
            }

            /*
             *
             *
             * */

            if ((vd.isRequired || formVal) && !$error && vd.isNoCn) {
                if (!/^[a-zA-Z0-9]+$/.test(formVal)) {
                    $error = 'isNoCn';
                    $errorMsg = '必须为英文或数字';
                }
            }

            if ((vd.isRequired || formVal) && !$error && vd.isNumeric) {
                if (!/^\d+$/.test(formVal)) {
                    $error = 'isNumeric';
                    $errorMsg = '必须为数字';
                }
            }

            if ((vd.isRequired || formVal) && !$error && vd.isUrl) {
                if (!/^http/.test(formVal)) {
                    $error = 'isUrl';
                    $errorMsg = '请输入http开头网址';
                }
            }

            if ((vd.isRequired || formVal) && !$error && vd.isLength) {
                if (formVal.length !== vd.isLength) {
                    $error = 'isLength';
                    $errorMsg = '输入' + vd.isLength + '位';
                }
            }
            if ((vd.isRequired || formVal) && !$error && vd.maxLength) {
                if (formVal.length > vd.maxLength) {
                    $error = 'maxLength';
                    $errorMsg = '最大输入' + vd.maxLength + '位';
                }
            }
        }


        this.updateFormValidation(formName, $error, $errorMsg);

        return $error;
    }
};

export default TwoWayBind;
