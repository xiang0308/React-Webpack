/*
* @Author: wangxiang
* @Date:   2017-04-21 10:05:51
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-24 18:41:17
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Swiper from 'swiper';
import CssFadeEffect from 'public/CssFadeEffect';
import './index.less';

class SwiperComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: false,
            initialSlide :0,
            noSwiping : true
        });
        // console.log(actions);
    }

    render() {
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <CssFadeEffect
                            active="true"
                            status="1"
                            direction="left"
                            duration="0.8"
                            delay="0"
                            mode="both"
                        >
                            11111
                        </CssFadeEffect>
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <CssFadeEffect
                            active="true"
                            status="1"
                            direction="left"
                            duration="0.8"
                            delay="0"
                            mode="both"
                        >
                            22222
                        </CssFadeEffect>
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        3
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        4
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        5
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        6
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        7
                    </div>
                </div>
                <div className="swiper-wrapper">
                    <div className="swiper-slide ">
                        8
                    </div>
                </div>
            </div>
        );
    }
}

SwiperComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SwiperComponent)
