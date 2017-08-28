/*
* @Author: wangxiang
* @Date:   2017-07-28 18:14:39
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-28 18:16:30
*/

import React, { Component } from 'react';
import './index.less';

class MusicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let { play } = this.props;

        if (play) {
            this.play();
        } else {
            this.pause();
        }
    }

    componentWillUnmount() {
    }

    play() {
        this.refs.bgMusic.play();
    }

    pause() {
        this.refs.bgMusic.pause();
    }

    render() {
        let { src } = this.props;

        if (this.refs.bgMusic) { // not first
            this.componentDidMount();
        }

        return (
            <div className="music">
                <audio loop ref="bgMusic" src={src} controls/>
            </div>
        );
    }
}

MusicComponent.defaultProps = {
    // layout: PropTypes.string
};

export default MusicComponent;
