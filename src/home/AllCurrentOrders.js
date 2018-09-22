import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Table } from 'react-bootstrap'
import Personal from '../personal/Personal'
import AuthOptions from '../auth/AuthOptions'
import { Textfit } from 'react-textfit'

export default class AllCurrentOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allOrders: []
        }
      }
    componentWillMount() {
    }

    componentDidMount() {
      this.getData()
    }

    getData() {
        //console.log(API.baseUri+API.getAllDishes)
        fetch(API.baseUri+API.getAllOrders)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            console.log(json)
            this.setState({
              allOrders: json
            })
        }).catch((error) => {
            console.log('error on .catch', error);
        }).then(() =>{
          this.getAllTodayOrder()
        })
    }

    getAllTodayOrder = () => {
      var temAllTodayOrder = []
      //To do
    }



  getValidationState = () => {
    const length = this.state.valueAccount.length;
    if (length >= 5) return 'success';
    else if (length > 0 ) return 'warning';
    return null;
  }

  handleChangeAccount = (e) => {
    this.setState({ valueAccount: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ valuePassword: e.target.value });
  }

  verifyPasswordFieldType = () => {

    if (this.state.passwordFieldType === "Password"){
      this.setState({
        passwordFieldType: "text"
      })
    } else {
      this.setState({
        passwordFieldType: "Password"
      })
    }
  }

  toTerminalPage = () => {
    window.location = '/'
  }

  toAdminPage = () => {
    window.location = '/home/AdminMainPage/' + this.state.valueAccount
  }

    render() {

        return (
          <div className="row">
            <div className="col-sm-12 col-lg-12 nova-card cust-border  ">
              <div className="col-lg-12 cust-border nova-card" >
                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                      <Tab eventKey={1} title="小吃" className="nova-padding">
                        <h2>当前时间：<Clock format={'h:mm:ss A'} timezone={'Australia/Sydney'} ticking={true}/></h2>
                        <Clock format={'dddd, MMMM Mo, YYYY'} timezone={'Australia/Sydney'}/>

                        <Table striped bordered condensed hover>
                          <thead>
                            <tr>
                              <th className="th-width-DishID">订单编号</th>
                              <th className="th-width-DishID">订单类别</th>
                              <th className="th-width-DishName">订单菜品总览</th>
                              <th className="th-width-DishPrice">订单总价</th>
                              <th className="th-width-DishType">菜品类别</th>
                              <th className="th-width-DishType">功能按钮</th>
                            </tr>
                          </thead>



                          </Table>
                      </Tab>
                  </Tabs>
              </div>
          </div>
        </div>
        )
    }
}
