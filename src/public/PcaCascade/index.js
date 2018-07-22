/*
* @Author: wangxiang
* @Date:   2018-07-21 17:34:14
* @Last Modified by:   wangxiang
* @Last Modified time: 2018-07-22 14:53:23
*/
import React, { Component, PropTypes } from 'react';
import { ProvinceData } from './provinceData';
import './index.less';

// 封装省市区级联组件
class PcaCascadeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ProvinceData,   // 省市区级联数据源
            province: '选择省',
            city: '选择市',
            area: '选择区'
        }
    }

    /**
     * [getProvince 获取省数据源]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    getProvince(name){
        let i = 0,
            len = this.state.dataSource.length;
        for(; i < len; i++) {
            if(this.state.dataSource[i].name === name) {
                return this.state.dataSource[i];
            }
        }
    }

    /**
     * [getCity 获取市区数据源]
     * @param  {[type]} province [description]
     * @param  {[type]} cityname [description]
     * @return {[type]}          [description]
     */
    getCity(province, cityname) {
        let i = 0,
            len = province.sub.length;
        for(; i < len; i++) {
            if(province.sub[i].name === cityname) {
                return province.sub[i];
            }
        }
    }

    /**
     * [handleChange 级联联动操作]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleChange(event) {
        let targetname = event.target.getAttribute('name');
        if(targetname === 'province') {
            let province = this.getProvince(event.target.value);
            this.setState(state => {
                if (province) {
                    state.province = province.name;
                    state.city = province.sub[0].name;
                    state.area = province.sub[0].sub[0].name;
                    return state;
                }
            });
        } else if(targetname === 'city') {
            let province = this.getProvince(this.state.province);
            let city = this.getCity(province, event.target.value);
            this.setState(state => {
                if(city){
                    state.city = city.name;
                    state.area = city.sub[0].name;
                    return state;
                }
            });
        }
    }

    /**
     * [getProvinceComponent 获取省级组件]
     * @param  {[type]} pname [description]
     * @return {[type]}       [description]
     */
    getProvinceComponent(pname){
        return (
            this.checkStatus(this.props.isProvince) && <select name="province" defaultValue={pname}>
                {
                    this.state.dataSource.map(pca => {
                        return <option key={pca.name}  value={pca.name}>{pca.name}</option>
                    })
                }
            </select>
        );
    }

    /**
     * [getCityComponent 获取市级组件]
     * @param  {[type]} pname [description]
     * @param  {[type]} cname [description]
     * @return {[type]}       [description]
     */
    getCityComponent(pname, cname) {
        const province = this.getProvince(pname);
        return (
            this.checkStatus(this.props.isCity) && <select name="city" defaultValue={cname}>
                {
                    province.sub.map((city) => {
                        return <option key={city.name} value={city.name}>{city.name}</option>;
                    })
                }
            </select>
        );
    }

    /**
     * [getAreaComponent 获取区组件]
     * @param  {[type]} pname [description]
     * @param  {[type]} cname [description]
     * @param  {[type]} aname [description]
     * @return {[type]}       [description]
     */
    getAreaComponent(pname, cname, aname) {
        const province = this.getProvince(pname);
        const city = this.getCity(province, cname);
        return (
            this.checkStatus(this.props.isArea) && <select name="city" defaultValue={aname}>
                {
                    city.sub.map(function(area){
                      return <option key={area.name} value={area.name}>{area.name}</option>;
                    })
                }
            </select>
        );
    }

    checkStatus(status) {
        let str = String(status);

        if (str === 'true') {
            status = true;
        } else if (str === 'false') {
            status = false;
        } else if (str === 'undefined' || str === 'null') {
            status = true;
        } else {
            status = false;
        }

        return status;
    }

    render() {
        return (
            <div className="pac-cascade">
                <div className="pac-cascade-select" onChange={(e) => this.handleChange(e)}>
                    { this.getProvinceComponent(this.state.province) }
                    { this.getCityComponent(this.state.province, this.state.city) }
                    { this.getAreaComponent(this.state.province, this.state.city, this.state.area) }
                </div>
            </div>
        );
    }
}

PcaCascadeComponent.defaultProps = {};

export default PcaCascadeComponent;
