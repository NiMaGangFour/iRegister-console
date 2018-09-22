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
        deliveryDishes: [],
        customerAddress:null,
        customerPhoneNO: null,
        customerName:null,
        customerComment: []
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
    fetch(API.baseUri + API.getDeliveryOrderDetailswithOrder + "/" + this.props.match.params.orderid)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
          console.log(json)

          this.setState({
            deliveryDishes: json,
            customerAddress: json[0].address,
            customerPhoneNO: json[0].phone,
            customerName: json[0].customerName,
            customerComment: json[0].comment,
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

  SumUpDeliveryOrder = ()=> {
      var total = this.state.deliveryDishes.reduce((sum, order) =>{
          return sum + order.DishCount * order.price
      }, 0)
      return total;
  }



  render() {
    var toHomePage = {
      pathname: '/',
    };
      return (
          <div>
            <div className="">
              <div className="col-sm-12 col-lg-2 ">


                <Personal />
                <AuthOptions
                  ref={this.authOptions}
                  parentChildOccupied={this.parentChildOccupied}
                  />

                <div className="site-info   cust-margin3 nova-padding nova-card cust-border">
                    <ul>
                        <li>Nova Software </li>
                        <li>Canberra House</li>
                        <li>+61 4 52542687</li>
                        <h5><li>info@novasoftware.com.au</li></h5>
                    </ul>
                </div>
              </div>

            <div className="">
              <div className="nova-card cust-border cust-margin2 col-lg-9">
                <h4>当前订单号:{this.props.match.params.orderid}</h4>
              </div>

              <div className="nova-card cust-border col-lg-9 cust-margin11">
                <div className="">
                  <div className="col-lg-6">菜品名称</div>
                  <div className="col-lg-1"></div>
                  <div className="col-lg-1">数量</div>
                  <div className="col-lg-1">单价</div>
                </div>

                <div>
                  {this.state.deliveryDishes.map((value, i) =>{
                    return (
                      <div key={i}>
                        <div className="col-lg-6">{value.name}</div>
                        <div className="col-lg-1">x</div>
                        <div className="col-lg-1">{value.DishCount}</div>
                        <div className="col-lg-1">{value.price}</div>
                      </div>
                    )
                  })
                }
                </div>
                <div className=" col-lg-9">
                  <hr />
                    总价：{this.SumUpDeliveryOrder()}
                </div>
              </div>

              <div className="nova-card cust-border col-lg-9 cust-margin11">

                {this.state.customerComment !== "" ?
                  <div className="nova-card" >
                    <h4>备注：{this.state.customerComment}</h4>
                </div>:null
                }
              </div>
              <div className="nova-card cust-border col-lg-9 cust-margin11">
                <div><h4>顾客姓名：{this.state.customerName}</h4></div>
                <div><h4>顾客电话：{this.state.customerPhoneNO}</h4></div>
                <div><h4>送餐地址：{this.state.customerAddress}</h4></div>
                
              </div>
              <div className="nova-card cust-border col-lg-9">
                  <Button className="col-lg-3 button2" bsSize="large" bsStyle="warning" onClick={()=>{console.log("还没写")}}>返回控制台</Button>
                  <Button className="col-lg-3 button2" bsStyle="danger" onClick={() => {}}>厨房打印</Button>
                  <Button className="col-lg-3 button2" bsSize="large" bsStyle="success" onClick={()=>{this.completeConfirm(this.props.match.params.orderid)}}>打包&打印小票</Button>
                </div>
            </div>
          </div>
        </div>
      )
  }
  }
