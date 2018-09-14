import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';
import { Map } from 'immutable'
import { API } from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'

export default class DeliverOrders extends Component {
  constructor(props) {
      super(props)
      this.authOptions = React.createRef();
      this.state = {
        deliveryDishes: []
      }}

  componentDidMount() {
    console.log(this.props)
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log(nextProps);
    if (nextProps.match.params.orderid !== this.props.match.params.orderid){
      this.props.match.params.orderid = nextProps.match.params.orderid
      this.getData()
    }
  }

  getData = () => {
    fetch(API.baseUri + API.getDeliveryOrderDetails + "/" + this.props.match.params.orderid)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
          console.log(json)
          this.setState({
            deliveryDishes: json,
          })
          console.log(this.state.deliveryDishes)
    }).catch((error) => {
        console.log('error on .catch', error);
    })
  }

  completeConfirm = (orderid) => {
    fetch(API.baseUri + API.CompleteDeliveryOrder + "/" + this.props.match.params.orderid)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
          console.log(json)
          if (json) {
            window.location = '/'
          }

    }).catch((error) => {
        console.log('error on .catch', error);
    })

  }





  render() {

      return (
          <div>
            <div className="row">
              <div className="col-sm-12 col-lg-2 ">

                <AuthOptions
                  ref={this.authOptions}
                  parentChildOccupied={this.parentChildOccupied}
                  />
                <Personal />

                <div className="site-info   cust-margin3 nova-padding nova-card cust-border">
                    <ul>
                        <li>Nova Software </li>
                        <li>Canberra House</li>
                        <li>+61 4 52542687</li>
                        <h5><li>info@novasoftware.com.au</li></h5>
                    </ul>
                </div>
              </div>

            <div className="row">
              <div className="nova-card cust-border cust-margin2 col-lg-9">
                <h4>当前订单号:{this.props.match.params.orderid}</h4>
              </div>

              <div className="nova-card cust-border col-lg-9">
                {this.state.comment !== "" ?
                  <div className="nova-card" >
                    <h4>备注：{this.state.comment}</h4>
                </div>:null
                }
                <div>
                  {this.state.deliveryDishes.map((value, i) =>{
                    return (
                      <div key={i}>
                        <div className="col-lg-6">{value.name}</div>
                        <div className="col-lg-1">x</div>
                        <div className="col-lg-1">{value.DishCount}</div>
                        <div className="col-lg-1">{value.address}</div>
                        <div className="col-lg-1">{value.customerName}</div>
                        <div className="col-lg-1">{value.customerName}</div>
                        <div className="col-lg-1">{value.customerName}</div>
                      </div>
                    )
                  })
                }
                <div className="col-lg-1">
                  <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.completeConfirm(this.props.match.params.orderid)}}>此单已完成</Button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
  }
