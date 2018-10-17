import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {  Tabs, ListGroupItem, ListGroup, Button, Label, Tab } from 'react-bootstrap'
import { API } from '../config'
import DeliverOrders from '../home/DeliverOrders'

export default class Personal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          getDeliveryOrders:[],
          currentTime: null,
          dateToday:null,
          time:null
        }
    }

   componentDidMount() {
        this.getData()
        // this.getInitialState()
   }

   getData() {
       //console.log(API.baseUri+API.getAllDishes)
       fetch(API.baseUri+API.getDeliveryOrders)
           .then((response) => {
               if (response.status === 200) {
                   return response.json()
               } else console.log("Get data error ");
           }).then((json) =>{
           // console.log(json)
           this.setState({getDeliveryOrders: json})
       }).catch((error) => {
           console.log('error on .catch', error);
       }).then(() => {
         fetch(API.baseUri+API.getCurrentTime)
           .then((response) => {
               if (response.status === 200) {
                   return response.json()
               } else console.log("Get data error ");
           }).then((json) =>{
           console.log(json)
           this.setState({
             currentTime: json,
             dateToday: json.slice(0, json.indexOf('T')),
             time: json.slice(json.lastIndexOf('T') + 0).replace("T", "").replace("+1000", "")
           })
         })
       })
   }

    render() {
      return (
          <div className="profile  cust-margin3 nova-padding nova-card cust-border">
            <div className="div-centre"><h3>今日外卖订单</h3></div>
            <hr />
              <Tabs bsStyle="pills" defaultActiveKey={1} id="noanim-tab-example">
                <Tab eventKey={1} title="未完成订单">
                  <div>
                      <ListGroup>
                        {this.state.getDeliveryOrders.map((value, i) =>{
                          var ToDeliver = {
                            pathname: '/home/DeliverOrders/'+ value.id,
                          }
                            return (
                              <div className="cust-margin8" key={i}>
                              {value.creatTime.slice(0, value.creatTime.indexOf('T')) === this.state.dateToday && value.status !== "4" ?
                                <Link to={ToDeliver} >
                                  <ListGroupItem onClick={() => {}}>
                                    <center>单号{value.id} {value.creatTime.slice(value.creatTime.lastIndexOf('T') + 0).replace("T", "").replace("+0000", "").replace("+1100", "").replace("+1000", "").replace("Z", "")}</center>
                                    <center>
                                    {value.paymentStatus === "2" ?
                                    <Label bsStyle="success">已付款</Label>
                                    :<Label bsStyle="danger">未付款</Label>}
                                    {value.status === "2" ?
                                      <Label bsStyle="warning">等待配送</Label>
                                    :null}
                                    {value.status === "3" ?
                                      <Label bsStyle="warning">配送中</Label>
                                    :null}

                                  </center>
                                  </ListGroupItem>
                                </Link>
                              :null}

                              </div>
                            )
                        })}
                      </ListGroup>
                  </div>
                </Tab>
                <Tab eventKey={2} title="已完成订单">
                  <div>
                      <ListGroup>
                        {this.state.getDeliveryOrders.map((value, i) =>{
                          var ToDeliver = {
                            pathname: '/home/DeliverOrders/'+ value.id,
                          }
                            return (
                              <div className="cust-margin8" key={i}>
                              {value.creatTime.slice(0, value.creatTime.indexOf('T')) === this.state.dateToday && value.status === "4" ?
                                <Link to={ToDeliver} >
                                  <ListGroupItem onClick={() => {}}>
                                    <center>单号{value.id} {value.creatTime.slice(value.creatTime.lastIndexOf('T') + 0).replace("T", "").replace("+0000", "").replace("+1100", "").replace("+1000", "").replace("Z", "")}</center>
                                  </ListGroupItem>
                                </Link>
                              :null}

                              </div>
                            )
                        })}
                      </ListGroup>
                  </div>
                </Tab>
              </Tabs>

          </div>
      )
    }
}
