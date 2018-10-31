import React, { Component } from 'react'
import { Button, Tabs, Tab, ButtonToolbar, FormControl, FormGroup, ControlLabel, ListGroupItem, ListGroup, Table} from 'react-bootstrap'
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
      this.getData()
   }

   //随着桌号的变更 进行数据重读
   componentWillReceiveProps(nextProps) {
     console.log(nextProps)
     console.log(nextProps.match.params.tableid)
     if (nextProps.match.params.tableid) {
       this.props.match.params.tableid = nextProps.match.params.tableid
       this.getData();
     }
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

    //取消预定
    cancleBookTable = () => {
      fetch(API.baseUri+API.CancleBookTable + "/" + this.props.match.params.tableid)
          .then((response) => {
              if (response.status === 200) {
                  return response.json()
              } else console.log("Get data error ");
          }).then((json) =>{
          console.log(json)
          window.location = '/home'
      }).catch((error) => {
          console.log('error on .catch', error);
      })
    }

    //继承第-步：改变桌子状态
    inherit = () => {

      fetch(API.baseUri+API.InheritBookingDishes + "/" + this.props.match.params.tableid)
          .then((response) => {
              if (response.status === 200) {
                  return response.json()
              } else console.log("Get data error ");
          }).then((json) =>{
          console.log(json)
          this.submitOrder()
      }).catch((error) => {
          console.log('error on .catch', error);
      })
    }

    //继承第二步： 上传菜品信息 后台执行 “/newoder”
    submitOrder = () => {
      var date = new Date();
      var time = date.toLocaleTimeString();
      var order = this.state.bookingTableDishes
      // var SDHPorder = this.state.SDHPorder
      // var Fishorder = this.state.Fishorder
      var totalorder = order
      console.log(totalorder)

      fetch(API.baseUri+API.neworder, {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "items": totalorder,
                "creatTime": time,
                "totalPrice": this.state.bookingTableDetails[0].totalPrice,
                "tableID": this.props.match.params.tableid,
                "comment":this.state.bookingTableDetails[0].comment,
            })
      } ).then(res =>{
          if(res.status===200) {
            // console.log(res.json())
            return res.json();
          }
          else console.log(res)
      }).then(json => {
         console.log(json.success)
        // console.log(json)
        if (json.success === true){
          this.authOptions.current.getData();
          this.setState({
            bookingTableDishes:[],
            bookingTableDetails:[]
          })
          window.location = '/home/CheckDishes/' + this.props.match.params.tableid
          // window.location = '/'
        }
      })
    }

    //普通菜品是否存在
    dishExist = () => {
      var tempArray = []
      var temp = this.state.bookingTableDishes
      for (let index in temp) {
        if (temp[index].type !== "麻辣香锅" && temp[index].type !== "特色烤鱼") {
          tempArray.push(temp[index].DishCount)
        }
      }
      return tempArray.length
    }

    //麻辣香锅菜品是否存在
    SDHPdishExist = () => {
      var tempArray = []
      var temp = this.state.bookingTableDishes
      for (let index in temp) {
        if (temp[index].type === "麻辣香锅") {
          tempArray.push(temp[index].DishCount)
        }
      }
      return tempArray.length
    }

    //特色烤鱼菜品是否存在
    FishdishExist = () => {
      var tempArray = []
      var temp = this.state.bookingTableDishes
      for (let index in temp) {
        if (temp[index].type === "特色烤鱼") {
          tempArray.push(temp[index].DishCount)
        }
      }
      return tempArray.length
    }

    //特色烤鱼菜品是否存在
    CommentExist = () => {
      var verifyExist = 0
      console.log(this.state)
      if (this.state.bookingTableDetails.length !== 0) {
        if (this.state.bookingTableDetails[0].comment !== "") {
          console.log(this.state.bookingTableDetails[0].comment)
          verifyExist = 1
          return verifyExist
        }

      }
      else {
        return verifyExist
      }
    }

    getDateTime = () => {
      var time = this.state.bookingTableDetails.bookingDateTime
      var time2 = time.slice(time.lastIndexOf('T') + 0).replace("Z", "").replace("T", "").replace("+1000", "")
    }


render() {
  var toHomePage = {
   pathname: '/home',
  }
    {console.log(this.state.bookingTableDishes)}
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

          <div className="col-lg-10 cust-border nova-card cust-margin-top">
            <center><h3>当前桌号: {this.props.match.params.tableid}</h3></center><br />

          {this.dishExist() !== 0 ?
              <div className="col-lg-4 cust-border nova-card" >
                <center><h3><b>普通菜品列表: </b></h3></center>
                  {
                    this.state.bookingTableDishes.map((value, key1) => {
                      return (
                        <div key={key1} className="dishesUnderLine">
                          {
                             value.type !== "麻辣香锅" && value.type !== "特色烤鱼" ?
                                <div className="row nova-margin">
                                  <div className="col-lg-1" />
                                  <div className="col-lg-6">{value.name}</div>
                                  <div className="col-lg-1">{value.num}</div>
                                  <div className="col-lg-1">{value.price}</div>
                                </div>
                              : null
                          }
                      </div>)
                    })
                  }
              </div>
            :null}

          {this.SDHPdishExist() !== 0 ?
              <div className="col-lg-4 cust-border nova-card" >
                <center><h3><b>麻辣香锅菜品列表: </b></h3></center>
                  {
                    this.state.bookingTableDishes.map((value, key1) => {
                      return (
                        <div key={key1} className="dishesUnderLine">
                          {
                             value.type === "麻辣香锅" ?
                                <div className="row nova-margin">
                                  <div className="col-lg-1" />
                                  <div className="col-lg-6">{value.name}</div>
                                  <div className="col-lg-1">{value.num}</div>
                                  <div className="col-lg-1">{value.price}</div>
                                </div>
                              : null
                          }
                      </div>)
                    })
                  }
              </div>
            :null}

          {this.FishdishExist() !== 0 ?
              <div className="col-lg-4 cust-border nova-card" >
                <center><h3><b>烤鱼菜品列表: </b></h3></center>
                  {
                    this.state.bookingTableDishes.map((value, key1) => {
                      return (
                        <div key={key1} className="dishesUnderLine">
                          {
                             value.type === "特色烤鱼" ?
                                <div className="row nova-margin">
                                  <div className="col-lg-1" />
                                  <div className="col-lg-6">{value.name}</div>
                                  <div className="col-lg-1">{value.num}</div>
                                  <div className="col-lg-1">{value.price}</div>
                                </div>
                              : null
                          }
                      </div>)
                    })
                  }
              </div>
            :null}
            {console.log(this.state.bookingTableDetails)}
                <div className="col-lg-12 cust-border nova-card" >
                    {
                      this.state.bookingTableDetails.map((value, key1) => {

                        {console.log(value.bookingComment)}
                        return (
                          <div key={key1} className="row nova-margin" >
                              <div className="col-lg-5" />
                              <div className="col-lg-1"><b>菜品总价：</b></div>
                              <div className="col-lg-2"><b>$AUD{value.totalPrice}</b></div>
                                {this.CommentExist() === 1 ?
                                <div>
                                  <div className="col-lg-1" />
                                  <div className="col-lg-1"><b>菜品备注：</b></div>
                                  <div className="col-lg-5"><b>{value.comment}</b></div>
                                </div>
                                :null}

                        </div>)
                      })
                    }
                </div>
          </div>

          <div className="col-lg-10 cust-border nova-card cust-margin-top">
            <div className="col-lg-2 "/ >
            <div className="col-lg-7 cust-border nova-card" >
                  {
                    this.state.bookingTableDetails.map((value, key1) => {
                      return (
                        <div key={key1} >
                          <Table striped bordered condensed hover>
                          <tbody>
                            <tr>
                              <td>顾客信息:</td>
                              <td>姓名：{value.customerName}</td>
                              <td>电话：{value.customerPhoneNO}</td>
                            </tr>
                            <tr>
                              <td>顾客数量:</td>
                              <td colSpan="2">{value.customerNumber}位</td>
                            </tr>
                            <tr>
                              <td colSpan="3"></td>
                            </tr>
                            <tr>
                              <td>预定到店时间:</td>
                              <td>{(value.bookingDateTime.slice(value.bookingDateTime.lastIndexOf('T') + 0)).slice(0, (value.bookingDateTime.slice(value.bookingDateTime.lastIndexOf('T') + 0)).indexOf('.')).replace("T", "")}</td>
                              <td>{value.bookingDateTime.slice(0, value.bookingDateTime.indexOf('T'))}</td>
                            </tr>
                            <tr>
                              <td>预定备注:</td>
                              <td colSpan="2">{value.bookingComment}</td>
                            </tr>
                            <tr>
                              <td>预定生成时间:</td>
                              <td>{value.createTime.slice(value.createTime.lastIndexOf('T') + 0).replace("Z", "").replace("T", "").replace("+1100", "")}</td>
                              <td>{value.createTime.slice(0, value.createTime.indexOf('T'))}</td>
                            </tr>
                          </tbody>
                          </Table>

                          <div>

                            <Button className="col-lg-3" bsSize="large" bsStyle="danger" onClick={()=>{this.cancleBookTable()}}>取消预订</Button>
                            <div className="col-lg-1"></div>
                            <Button className="col-lg-3" bsSize="large" bsStyle="success" onClick={()=>{this.inherit()}}>继承菜品</Button>
                            <div className="col-lg-1"></div>
                            <Link to={toHomePage}><Button className="col-lg-3" bsSize="large" bsStyle="default" onClick={()=>{}}>返回控制台</Button></Link>
                          </div>
                      </div>)
                    })
                  }

            </div>
          </div>
      </div>
    )
}
}
