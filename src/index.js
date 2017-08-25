/*
* @Author: wangxiang
* @Date:   2017-04-10 17:50:56
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-08-25 10:32:27
*/
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { Router, Route, hashHistory } from 'react-router';
import Mobile from './containers/m';
import MobileCss from './containers/m/css';
import MobileList from './containers/m/list';
import MobileForm from './containers/m/form';
import MobilePreloader from './containers/m/preloader';
import MobileModal from './containers/m/modal';
import MobileSwiper from './containers/m/swiper';
import MobileEffect from './containers/m/effect';
import Admin from './containers/pc/admin';
import NoMatch from './containers/NoMatch';

import 'styles/common.less';
import 'styles/animate.less';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/m" component={Mobile} >
                <Route path="css" component={MobileCss} />
                <Route path="list" component={MobileList} />
                <Route path="form" component={MobileForm} />
                <Route path="preloader" component={MobilePreloader} />
                <Route path="modal" component={MobileModal} />
                <Route path="swiper" component={MobileSwiper} />
                <Route path="effect" component={MobileEffect} />
            </Route>
            <Route path="/pc" component={PC}>
                <Route path="admin" component={Admin} />
            </Route>
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
), document.getElementById('app'));
