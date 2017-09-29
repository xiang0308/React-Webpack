/*
* @Author: Wei Jie
* @Date:   2017-04-25 10:15:58
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-09-11 17:34:02
*/

'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import './index.less';

let bgSrc = require('./images/bg.mp3');

class MusicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let { play, actions } = this.props;
        let audioElement = this.refs.bgMusic;
        window.audioElement = audioElement;

        if (play) {
            this.play();
        } else {
            this.pause();
        }

        audioElement.addEventListener('canplaythrough', () => {
            actions.playMusic();
            this.play();
        }, false);

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                actions.playMusic();
                this.play();
            } else {
                actions.pauseMusic();
                this.pause();
            }
        }, false);

        document.addEventListener('webkitvisibilitychange', () => {
            if (document.visibilityState === 'visible') {
                actions.playMusic();
                this.play();
            } else {
                actions.pauseMusic();
                this.pause();
            }
        }, false);
    }

    componentWillUnmount() {
    }

    play() {
        this.refs.bgMusic.play();
    }

    pause() {
        this.refs.bgMusic.pause();
    }

    handleClick(e) {
        e.preventDefault();
        let {play, actions} = this.props;

        if (play) {
            actions.pauseMusic();
            this.pause();
        } else {
            actions.playMusic();
            this.play();
        }
    }

    render() {
        let { play } = this.props;

        return (
            <div className="music">
                <div className={
                    classnames(['cp-music trans', play ? 'cp-music-on rotate' : 'cp-music-off'])
                } onClick={(e) => this.handleClick(e)}></div>
                <audio loop ref="bgMusic" src={bgSrc} controls/>
            </div>
        );
    }
}

MusicComponent.defaultProps = {};

export default MusicComponent;
