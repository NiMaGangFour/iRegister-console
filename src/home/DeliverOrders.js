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
            deliveryDeliveryStatus: json[0].status,
            deliveryDeliveryFee: json[0].deliveryFee,
            customerAddress: json[0].address,
            customerPhoneNO: json[0].phone,
            customerName: json[0].customerName,
            customerComment: json[0].comment,

          })
          console.log(json)
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

  SumUpDeliveryOrder = (deliveryFee)=> {
    var tempArray = []
    var temp = this.state.deliveryDishes
    console.log(temp)
    for (let index in temp) {
      if (temp[index].DishCount > 0 ) {
        tempArray.push(temp[index])
      }
    }
      var total = tempArray.reduce((sum, order) =>{
          return ((sum + order.DishCount * order.price) * 100) / 100
      }, 0)
      var sum = Math.round(total  * 100) / 100

      var result = parseFloat(sum) + parseFloat(deliveryFee);
      console.log(sum)
      console.log(deliveryFee)
      return [result, sum];
  }

  render() {
    var toHomePage = {
      pathname: '/',
    };
      return (
          <div>
            <div className="col-lg-2 padding-tables">
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
              <div className="nova-card cust-border cust-margin2 col-lg-10">
                <center><b><h3>当前订单号:{this.props.match.params.orderid}</h3></b></center>
              </div>

              <div className="nova-card cust-border col-lg-10 cust-margin11">
                <div className="col-lg-10">
                  <div className="col-lg-3"/>
                  <div className="col-lg-6">菜品名称</div>
                  <div className="col-lg-1">数量</div>
                  <div className="col-lg-1">单价</div>
                </div>

                <div >
                  {this.state.deliveryDishes.map((value, i) =>{
                    return (
                      <div className="col-lg-10" key={i}>
                        <div className="col-lg-3"/>
                        <div className="col-lg-6">{value.name}</div>
                        <div className="col-lg-1">{value.DishCount}</div>
                        <div className="col-lg-1">{value.price}</div>
                      </div>
                    )
                  })
                }
                </div>
                    <hr />
                <div className=" col-lg-9">

                  <div className="col-lg-5"/>
                  <div className="col-lg-3">菜品总价:{this.SumUpDeliveryOrder(this.state.deliveryDeliveryFee)[1]}  $AUD </div>
                  <div className="col-lg-3">外卖费:{this.state.deliveryDeliveryFee}   $AUD</div>


                </div>
                <div className=" col-lg-9">
                  <hr />
                  <div className="col-lg-6"/>
                  <div className="col-lg-4"><b><h2>订单总价:{this.SumUpDeliveryOrder(this.state.deliveryDeliveryFee)[0]}  $AUD</h2></b></div>

                </div>
              </div>

              <div className="nova-card cust-border col-lg-10 cust-margin11">
                {console.log(this.state.customerComment)}
                {this.state.customerComment !== "" ?
                  <div className="nova-card" >
                    <center><h4>备注：{this.state.customerComment}</h4></center>
                </div>
                :
                <center><h4>备注：无</h4></center>
                }
              </div>
              <div className="nova-card cust-border col-lg-10 cust-margin11">
                <div className="col-lg-4"/>
                <div className="col-lg-6">
                  <div><h4>顾客姓名：{this.state.customerName}</h4></div>
                  <div><h4>顾客电话：{this.state.customerPhoneNO}</h4></div>
                  <div><h4>送餐地址：{this.state.customerAddress}</h4></div>
                </div>
              </div>

              <div className="nova-card cust-border col-lg-10">
                {this.state.deliveryDeliveryStatus !== "4" ?
                <div>
                  <Button className="col-lg-2 " bsSize="large" bsStyle="danger" onClick={() => {}}>厨房打印</Button>
                  <div className="col-lg-1"/>
                  <Button className="col-lg-2 " bsSize="large" bsStyle="success" onClick={()=>{}}>打包&打印小票</Button>
                  <div className="col-lg-1"/>
                  <Button className="col-lg-2 " bsSize="large" bsStyle="success" onClick={()=>{this.completeConfirm(this.props.match.params.orderid)}}>确认完成订单</Button>
                  <div className="col-lg-1"/>
                  <Link to={toHomePage}><Button className="col-lg-2" bsSize="large" onClick={()=>{}}>返回控制台</Button></Link>
                </div>
                :
                <div>
                  <div className="col-lg-4"/>
                  <Link to={toHomePage}><Button className="col-lg-2" bsSize="large" onClick={()=>{}}>返回控制台</Button></Link>
                </div>
               }

              </div>
            </div>
        </div>
      )
  }
  }
