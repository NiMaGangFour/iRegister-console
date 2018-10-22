import React, { Component } from 'react'
import { Button, Tabs, Tab, ButtonToolbar, FormControl, FormGroup, ControlLabel, ListGroupItem, ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { API } from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'
import { Textfit } from 'react-textfit'
import Clock from 'react-live-clock'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var Datetime = require('react-datetime');


export default class CheckBookingsDetails extends Component {
    constructor(props) {
        super(props);
        this.authOptions = React.createRef();
        this.state = {
          bookingTableDishes: [],
          bookingTableDetails: []
        }
  }

    componentWillMount() {

    }
   componentDidMount() {
      this.getData()
   }

    componentWillReceiveProps(nextProps) {
    }

    getData() {
      fetch(API.baseUri + API.getBookingTableDishes + "/" + this.props.match.params.tableid).then((response) => {
        if (response.status === 200) {
          return response.json()
        } else
          console.log("Get data error ");
        }
      ).then((json) => {
        console.log(json)

        this.setState({bookingTableDishes: json})
      }).catch((error) => {
        console.log('error on .catch', error);
      }).then(() => {
        fetch(API.baseUri + API.getOrderBookingDetailsbyTableID + "/" + this.props.match.params.tableid).then((response) => {
          if (response.status === 200) {
            return response.json()
          } else
            console.log("Get data error ");
          }
        ).then((json) => {
          console.log(json)

          this.setState({bookingTableDetails: json})
        }).catch((error) => {
          console.log('error on .catch', error);
        })
      })
    }

    setSDHPOrder = (POST) => {
        // console.log(POST)
        if (this.state.SDHPorder.length === 0) {
            var newD = {
                "name": POST.name,
                "price": POST.price,
                "DishID": POST.dishId,
                "num": 1,
                "type": POST.type
            }
            let tempSDHPOrder = this.state.SDHPorder
                tempSDHPOrder.push(newD)
            // console.log(tempOrder)
            this.setState({SDHPOrder: tempSDHPOrder})
            return;
        }
        else {
            for (let i = 0; i < this.state.SDHPorder.length; i++) {
                if (this.state.SDHPorder[i].name === POST.name) {
                    let tempSDHPOrder = this.state.SDHPorder
                    tempSDHPOrder[i].num = this.state.SDHPorder[i].num + 1

                    this.setState({SDHPorder: tempSDHPOrder})
                    // console.log(this.state.order)
                    return;
                }
                else if (i === this.state.SDHPorder.length-1 && this.state.SDHPorder[i].name !== POST.name){
                    var newD = {
                        "name": POST.name,
                        "price": POST.price,
                        "DishID": POST.dishId,
                        "num": 1,
                        "type": POST.type
                    }
                    let tempSDHPOrder = this.state.SDHPorder
                        tempSDHPOrder.push(newD)
                    // console.log(tempOrder)
                    this.setState({SDHPorder: tempSDHPOrder})
                    // console.log(this.state.order)
                    return;
                }
                }
        }

    }

    setOrder = (POST) => {
        // console.log(POST)
        if (this.state.order.length === 0) {
            var newD = {
                "name": POST.name,
                "price": POST.price,
                "DishID": POST.dishId,
                "num": 1,
                "type": POST.type
            }
            let tempOrder = this.state.order
                tempOrder.push(newD)
            // console.log(tempOrder)
            this.setState({order: tempOrder})
            return;
        }
        else {
            for (let i = 0; i < this.state.order.length; i++) {
                if (this.state.order[i].name === POST.name) {
                    let tempOrder = this.state.order
                    tempOrder[i].num = this.state.order[i].num + 1

                    this.setState({order: tempOrder})
                    // console.log(this.state.order)
                    return;
                }
                else if (i === this.state.order.length-1 && this.state.order[i].name !== POST.name){
                    var newD = {
                        "name": POST.name,
                        "price": POST.price,
                        "DishID": POST.dishId,
                        "num": 1,
                        "type": POST.type
                    }
                    let tempOrder = this.state.order
                        tempOrder.push(newD)
                    // console.log(tempOrder)
                    this.setState({order: tempOrder})
                    // console.log(this.state.order)
                    return;
                }
                }
        }
    }


    SumUp= ()=> {
        var total = this.state.order.reduce((sum, price) =>{
            return sum + price.num * price.price
        }, 0)
        var totalSDHP = this.state.SDHPorder.reduce((sum, price) =>{
            return sum + price.num * price.price
        }, 0)
        return total + totalSDHP;
    }

    deleteSDHPDish = (nameDish)=> {
        console.log(nameDish)
        var temp_post = [];
        for(let index in this.state.SDHPorder){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.SDHPorder[index].name !== nameDish){
                temp_post.push(this.state.SDHPorder[index])
            }
        }this.setState({
            SDHPorder:temp_post
        })
    }

    //上传预定信息
    submitBooking = () => {
      console.log("11111111111111111111")
      var date = new Date();
      var time = date.toLocaleTimeString();
      // console.log(JSON.stringify(this.state.order))
      console.log(this.state.order)
      console.log(this.state.textareaValue)
      var order = this.state.order
      var SDHPorder = this.state.SDHPorder
      var totalorder = order.concat(SDHPorder)
      console.log(totalorder)

      fetch(API.baseUri+API.Bookingneworder, {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "items": totalorder,

                "customerName": this.state.customerNameValue ,
                "customerPhoneNo": this.state.customerPhoneNOValue,
                "customerNumber": this.state.customerNumberValue,
                "bookingComment": this.state.customerCommentValue,
                "bookingDateTime": this.state.dateTime ,
                "totalPrice": this.SumUp(),
                "creatTime": time,
                "comment":this.state.textareaValue,
                "tableID": this.props.match.params.tableid,

            })
      } ).then(res =>{
          if(res.status===200) {
            // console.log(res.json())
            return res.json();
          }
          else console.log(res)
      }).then(json => {
        console.log(json.success)
        console.log(json)
        if (json.success === true){
          this.authOptions.current.getData();
          this.setState({
            order:[],
            SDHPorder:[]
          })
          // window.location = '/home/CheckDishes/' + this.props.match.params.tableid
          // window.location = '/'
        }
      })
    }

    //取消预定
    cancleBookTable = () => {
      fetch(API.baseUri+API.CancleBookTable + "/" + this.props.match.params.tableid)
          .then((response) => {
              if (response.status === 200) {
                  return response.json()
              } else console.log("Get data error ");
          }).then((json) =>{
          console.log(json)
          window.location = '/'
      }).catch((error) => {
          console.log('error on .catch', error);
      })
    }

    //对应初始点菜页面的麻辣香锅数量
    SDHPNumberCalculatorInitiat = () => {
      var tempSDHPorder = []
      var temp = this.state.SDHPorder
      var reducer = (accumulator, currentValue) => accumulator + currentValue;

      for (let index in temp) {
        if (temp[index].num > 0) {
          tempSDHPorder.push(temp[index].num)
        }
      }
      if(tempSDHPorder.length !== 0)
      {
        console.log(tempSDHPorder.reduce(reducer));
        var total = tempSDHPorder.reduce(reducer)
      }
      return total;
    }


render() {
  var toHomePage = {
   pathname: '/',
  }
    {console.log(this.state.bookingTableDetails)}
    return (
      <div>
          <div className="col-sm-12 col-lg-2 padding-tables">

            <AuthOptions
              ref={this.authOptions}
              parentChild={this.parentChild} />
            <Personal />

            <div className="site-info cust-margin3 nova-padding nova-card cust-border">
                <ul>
                    <li>Nova Software </li>
                    <li>Canberra House</li>
                    <li>+61 4 52542687</li>
                    <li>info@novasoftware.com.au</li>
                </ul>
            </div>

          </div>

          <div className="col-sm-12 col-lg-10 pull-right cust-margin-top padding-tables">

                <div className="col-lg-12 cust-border nova-card" >
                  <center><h3>当前桌号: {this.props.match.params.tableid}</h3></center><br />
                    {
                      this.state.bookingTableDishes.map((value, key1) => {
                        return (
                          <div key={key1} className="dishesUnderLine">
                            {
                               value.type !== "麻辣香锅" ?
                                    <div className="row nova-margin">
                                    <div className="col-lg-1" />
                                    <div className="col-lg-6">{value.name}</div>
                                    <div className="col-lg-1 cust-p-color">{value.num}</div>
                                    <div className="col-lg-1">{value.price}</div>
                                  </div>
                                : null
                            }
                        </div>)
                      })
                    }
                </div>
                <div className="col-lg-12 cust-border nova-card" >
                    {
                      this.state.bookingTableDetails.map((value, key1) => {
                        return (
                          <div key={key1} >

                            <div className="row nova-margin">
                              <div className="col-lg-1" />
                              <div className="col-lg-1"><b>菜品总价:{value.totalPrice}</b></div>
                            </div>
                        </div>)
                      })
                    }
                </div>
                {console.log(this.state.bookingTableDetails.comment)}
                {this.state.bookingTableDetails.comment !== undefined ?
                <div className="col-lg-12 cust-border nova-card" >
                    {
                      this.state.bookingTableDetails.map((value, key1) => {
                        return (
                          <div key={key1} >

                            <div className="row nova-margin">
                              <div className="col-lg-1" />
                              <div className="col-lg-1"><b>菜品备注:{value.comment}</b></div>
                            </div>
                        </div>)
                      })
                    }
                </div>
                :null}
                <div className="col-lg-7 cust-border nova-card" >
                    {
                      this.state.bookingTableDetails.map((value, key1) => {
                        return (
                          <div key={key1} >
                            <ListGroup>
                              <ListGroupItem>顾客姓名:<b>{value.customerName}</b></ListGroupItem>
                              <ListGroupItem>联系电话:<b>{value.customerPhoneNO}</b></ListGroupItem>
                            </ListGroup>
                        </div>)
                      })
                    }
                    {
                      this.state.bookingTableDetails.map((value, key1) => {
                        return (
                          <div key={key1} >
                            <ListGroup>
                              <ListGroupItem>顾客数量:<b><h3>{value.customerNumber}</h3></b></ListGroupItem>
                              <ListGroupItem>预定到店时间:<b><h3>{value.bookingDateTime}</h3></b></ListGroupItem>
                              <ListGroupItem>预定备注:<b><h3>{value.bookingComment}</h3></b></ListGroupItem>
                              <ListGroupItem>预定生成时间:<b><h3>{value.createTime}</h3></b></ListGroupItem>

                            </ListGroup>
                        </div>)
                      })
                    }
                </div>
                <div className="col-lg-5 cust-border nova-card" >

                </div>
          </div>

      </div>
    )
}
}
