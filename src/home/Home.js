import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup } from 'react-bootstrap'
import Personal from '../personal/Personal'
import AuthOptions from '../auth/AuthOptions'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: [],
            tableName: null,
        }
      }
    componentWillMount() {
    }

    componentDidMount() {
      this.getData();
    }

     getData =()=> {
        fetch(API.baseUri+API.getallTables)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            console.log(json)
            this.setState({tables: json})
        }).catch((error) => {
            console.log('error on .catch', error);
        });
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        var user = localStorage.getItem('SHUWEIYUAN');
        var uu = JSON.parse(user);
        console.log(uu);
        return uu.Token
    }

    handleClickAvailableTable = (tableid) => {
      // this.props.parentChild(tableid);
    }

    handleClickOccupiedTable = (tableid) => {
      // this.props.parentChildOccupied(tableid);
    }
    currentTime = () => {

    }

    render() {

        return (
          <div className="">
            <div className="col-sm-12 col-lg-2 padding-tables">
              <AuthOptions />

              <Personal />
            </div>
            <div className="col-sm-12 col-lg-10 pull-right nova-card cust-border cust-margin2 ">
            <div className="console-logo">
              <div className="center" >
                  <img src="/static/img/logo.png" />
              </div>
            <div className="center">
              <div><h1>蜀味源餐饮管理系统</h1><h5>版本编号（Version 1.16 Beta）</h5></div>

              <h2>当前时间：<Clock format={'h:mm:ss A'} timezone={'Australia/Sydney'} ticking={true}/></h2>
              <Clock format={'dddd, MMMM Mo, YYYY'} timezone={'Australia/Sydney'}/>
            </div>
            </div>

          </div>
          </div>
        )
    }
}
