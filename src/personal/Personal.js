import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {  Tabs, ListGroupItem, ListGroup } from 'react-bootstrap'
import { API } from '../config'
import DeliverOrders from '../home/DeliverOrders'

export default class Personal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          getDeliveryOrders:[],
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
       });
   }

    render() {
      return (

          <div className="profile  cust-margin3 nova-padding nova-card cust-border">

              <div className="div-centre"><h3>外卖订单</h3></div>
              <hr />
              <div>
                  <ListGroup>
                    {this.state.getDeliveryOrders.map((value, i) =>{
                      // console.log(value)
                      var ToDeliver = {
                        pathname: '/home/DeliverOrders/'+ value.id,
                      }
                        return (
                          <div className="cust-margin8" key={i}>
                                <Link to={ToDeliver} ><ListGroupItem onClick={() => {}}> 单号{value.id} （{value.creatTime.slice(value.creatTime.lastIndexOf('T') + 0).replace("T", "").replace("+1000", "").replace("Z", "")}）</ListGroupItem></Link>
                          </div>
                        )
                    })}
                  </ListGroup>

              </div>
          </div>
      )
    }
}
