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
            allOrders: [],
            currentTime: null,
            AllTodayUnfinishedOrdersWithOriginDishes: [],
            AllTodayUnfinishedOrdersWithModifiedDishes: [],
            TodayUnfinishedOrdersWithModifiedDishes: []
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
        this.getCurrentTime()
      })
    }

  getCurrentTime = () => {
    fetch(API.baseUri+API.getCurrentTime)
      .then((response) => {
          if (response.status === 200) {
              return response.json()
          } else console.log("Get data error ");
      }).then((json) =>{
      console.log(json)
      this.setState({
        currentTime: json
      })
    }).then(() =>{
      // console.log(stringJson)
      this.getAllTodayOrdersId()
      })
  }

  getAllTodayOrdersId = () => {
    var currentTime = this.state.currentTime
    var dateToday = currentTime.slice(0, currentTime.indexOf('T'))
    var time = currentTime.slice(currentTime.lastIndexOf('T') + 0).replace("T", "").replace("+1000", "").replace("+1100", "");
    // console.log(currentTime)
    // console.log(dateToday)
    // console.log(time)
    var tempAllTodayOrdersId = []
    var temp = this.state.allOrders
    for (let index in temp){
      if (temp[index].creatTime.slice(0, currentTime.indexOf('T')) === dateToday ) {
        tempAllTodayOrdersId.push(temp[index].id)
      }
    }
    // console.log(tempAllTodayOrdersId)
    this.getAllTodayOrdersWithOriginDishes(tempAllTodayOrdersId)
    this.getAllTodayOrdersWithModifiedDishes(tempAllTodayOrdersId)
  }

  getAllTodayOrdersWithOriginDishes = (OrdersId) => {
    console.log(OrdersId)
    var tempAllTodayOrdersWithOriginDishes = []
    for (let index in OrdersId){
      fetch(API.baseUri + API.getOrderDishes2 + "/" + OrdersId[index]).then((response) => {
        if (response.status === 200) {
          return response.json()
        } else
          console.log("Get data error ");
        }
      ).then((json) => {
        // console.log(json)
        tempAllTodayOrdersWithOriginDishes.push(json)
      }).then(() => {
        this.setState({
          AllTodayUnfinishedOrdersWithOriginDishes:tempAllTodayOrdersWithOriginDishes
        })

      }).catch((error) => {
        console.log('error on .catch', error);
      })
    }

  }

  getAllTodayOrdersWithModifiedDishes = (OrdersId) => {
    console.log(OrdersId)
    var tempAllTodayOrdersWithModifiedDishes = []
    for (let index in OrdersId){
      fetch(API.baseUri + API.getModDishesByOrderID + "/" + OrdersId[index]).then((response) => {
          console.log("zzzzzzzz")
        if (response.status === 200) {
          return response.json()
        } else
          console.log("Get data error ");
        }
      ).then((json) => {
        // console.log(json)
        tempAllTodayOrdersWithModifiedDishes.push(json)
      }).then(() => {
        this.setState({
          AllTodayUnfinishedOrdersWithModifiedDishes:tempAllTodayOrdersWithModifiedDishes
        })

      }).catch((error) => {
        console.log('error on .catch', error);
      })
    }
  }

  getModifiedWithOrderID = (orderID) => {
    var tempArray = []
    var result= []
    var temp = this.state.AllTodayUnfinishedOrdersWithModifiedDishes
    for (let index in temp)
    {
      if (temp[index][0] !== undefined) {

        console.log(temp[index][0].orderID)
        if(temp[index][0].orderID === orderID) {
          // console.log(temp[index])
          result.push(temp[index])
          // console.log(result)
        }
      }
    }
     return result
  }
  sumModifiedWithOrderID = (orderID) => {
    var tempArray = []
    var tempArrayExist = []
    var temp = this.state.AllTodayUnfinishedOrdersWithModifiedDishes
    var total = 0
    for (let index in temp)
    {
      if (temp[index][0] !== undefined) {
        // console.log(temp[index][0].orderID)
        if(temp[index][0].orderID === orderID) {
          tempArray.push(temp[index])
        }
      }
    }
    console.log(tempArray)

    if (tempArray.length !== 0) {
      for (let index in tempArray) {
        console.log(tempArray[index])
        for (let ind in tempArray[index]) {
          if (tempArray[index][ind].deleted === 0) {
            console.log(tempArray[index][ind])
            tempArrayExist.push(tempArray[index][ind])
          }
          console.log(tempArrayExist)
        }
      }
      total = tempArrayExist.reduce((sum, price) =>{
      return sum + price.num * price.price
      }, 0)
      return total;
    } else {
      return total;
    }
  }

  sumOriginWithOrderID = (orderID) => {
    var tempArray = []
    var tempArrayExist = []
    var temp = this.state.AllTodayUnfinishedOrdersWithOriginDishes
    var total = 0
    console.log(temp)
    for (let index in temp)
    {
      if (temp[index][0] !== undefined) {
        // console.log(temp[index][0].orderID)
        if(temp[index][0].orderID === orderID) {
          console.log(temp[index])
          tempArray.push(temp[index])
          console.log(tempArray)
        }
      }
    }
    console.log(tempArray)

    if (tempArray.length !== 0) {
      for (let index in tempArray) {
        console.log(tempArray[index])
        for (let ind in tempArray[index]) {
          if (tempArray[index][ind].deleted === 0) {
            console.log(tempArray[index][ind])
            tempArrayExist.push(tempArray[index][ind])
          }
          console.log(tempArrayExist)
        }
      }
      total = tempArrayExist.reduce((sum, price) =>{
      return sum + price.DishCount * price.price
      }, 0)
      return total;
    } else {
      return total;
    }
  }

  totalPrice = (orderID) => {
    var total = this.sumModifiedWithOrderID(orderID) + this.sumOriginWithOrderID(orderID)
    return total
  }

    render() {
      console.log(this.state.AllTodayUnfinishedOrdersWithOriginDishes)
      console.log(this.state.AllTodayUnfinishedOrdersWithModifiedDishes)

        return (
          <div className="col-lg-12 nova-card cust-border">
            <center><h3><b><Clock format={'dddd, MMMM Mo, YYYY'} timezone={'Australia/Sydney'}/></b></h3></center>
              <Tabs bsStyle="pills" defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="当前订单总览">
                  <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th className="th-width-DishID">订单编号</th>
                        <th className="th-width-DishID">菜品总览</th>
                        <th className="th-width-DishName">生成时间</th>
                        <th className="th-width-DishPrice">订单总价</th>
                        <th className="th-width-DishType">订单类别</th>

                      </tr>
                    </thead>
                    {this.state.AllTodayUnfinishedOrdersWithOriginDishes.map((array, i) =>{
                        return (
                             <tbody key={i}>
                               {array.length !== 0 && array[0].status !== "4" ?
                                 <tr>
                                   <td>
                                     {array[0].orderID}
                                     {console.log(array[0].orderID)}
                                   </td>
                                   <td>
                                     {array.map((order, i) =>{
                                         return (
                                           <div key={i}>
                                             {console.log(order)}
                                             {order.deleted === 0 ?
                                               <div>{order.name} 数量: ({order.DishCount})</div>
                                               :
                                               <div className="strikeThrough">{order.name} 数量: ({order.DishCount})</div>
                                             }

                                           </div>
                                         )
                                     })}

                                     {this.getModifiedWithOrderID(array[0].orderID).map((modifiedOrder, i) =>{
                                         return (
                                           <div key={i}>

                                             {modifiedOrder.map((order, i) =>{
                                                 return (
                                                   <div key={i}>
                                                     {order.deleted === 0 ?
                                                       <div>{order.name} 数量 ({order.num})</div>
                                                       :
                                                       <div className="strikeThrough">{order.name} 数量: ({order.DishCount})</div>
                                                     }

                                                   </div>
                                                 )
                                             })}
                                           </div>
                                         )
                                     })}

                                   </td>
                                   <td>
                                     {array[0].creatTime.slice(array[0].creatTime.lastIndexOf('T') + 0).replace("T", "").replace("+1000", "").replace("+1100", "")}  {array[0].creatTime.slice(0, array[0].creatTime.indexOf('T'))}
                                   </td>

                                   <td>
                                     {this.sumOriginWithOrderID(array[0].orderID)} + {this.sumModifiedWithOrderID(array[0].orderID)} = {this.totalPrice(array[0].orderID)}
                                   </td>

                                   <td>
                                     {array[0].OrderType === 1 ?
                                       <div>
                                         堂吃
                                       </div>
                                       :
                                       <div>
                                         外卖
                                       </div>}
                                   </td>
                                 </tr>
                               :null}
                             </tbody>
                        )
                    })}
                    </Table>
                </Tab>
                <Tab eventKey={2} title="当前堂吃订单">
                  <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th className="th-width-DishID">订单编号</th>
                        <th className="th-width-DishID">菜品总览</th>
                        <th className="th-width-DishName">生成时间</th>
                        <th className="th-width-DishPrice">订单总价</th>
                        <th className="th-width-DishType">订单类别</th>

                      </tr>
                    </thead>
                    {this.state.AllTodayUnfinishedOrdersWithOriginDishes.map((array, i) =>{
                        return (
                          <tbody key={i}>
                            {array.length !== 0  && array[0].status !== "4" && array[0].OrderType === 1 ?
                              <tr>
                                <td>
                                  {array[0].orderID}
                                  {console.log(array[0].orderID)}
                                </td>
                                <td>
                                  {array.map((order, i) =>{
                                      return (
                                        <div key={i}>
                                          {console.log(order)}
                                          {order.deleted === 0 ?
                                            <div>{order.name} 数量: ({order.DishCount})</div>
                                            :
                                            <div className="strikeThrough">{order.name} 数量: ({order.DishCount})</div>
                                          }

                                        </div>
                                      )
                                  })}

                                  {this.getModifiedWithOrderID(array[0].orderID).map((modifiedOrder, i) =>{
                                      return (
                                        <div key={i}>

                                          {modifiedOrder.map((order, i) =>{
                                              return (
                                                <div key={i}>
                                                  {order.deleted === 0 ?
                                                    <div>{order.name} 数量 ({order.num})</div>
                                                    :
                                                    <div className="strikeThrough">{order.name} 数量: ({order.DishCount})</div>
                                                  }

                                                </div>
                                              )
                                          })}
                                        </div>
                                      )
                                  })}

                                </td>
                                <td>
                                  {array[0].creatTime.slice(array[0].creatTime.lastIndexOf('T') + 0).replace("T", "").replace("+1000", "").replace("+1100", "")}  {array[0].creatTime.slice(0, array[0].creatTime.indexOf('T'))}
                                </td>

                                <td>
                                  {this.sumOriginWithOrderID(array[0].orderID)} + {this.sumModifiedWithOrderID(array[0].orderID)} = {this.totalPrice(array[0].orderID)}
                                </td>

                                <td>
                                  {array[0].OrderType === 1 ?
                                    <div>
                                      堂吃
                                    </div>
                                    :
                                    <div>
                                      外卖
                                    </div>}
                                </td>
                              </tr>
                            :null}
                          </tbody>
                        )
                    })}
                    </Table>
                </Tab>
                <Tab eventKey={3} title="当前外卖订单" >
                  <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th className="th-width-DishID">订单编号</th>
                        <th className="th-width-DishID">菜品总览</th>
                        <th className="th-width-DishName">生成时间</th>
                        <th className="th-width-DishPrice">订单总价</th>
                        <th className="th-width-DishType">订单类别</th>

                      </tr>
                    </thead>
                    {this.state.AllTodayUnfinishedOrdersWithOriginDishes.map((array, i) =>{
                        return (
                          <div>
                          {array.length !== 0 ?
                          <tbody key={i}>
                            {console.log(array[0])}
                            {array.length !== 0  &&  array[0].status !== "4" && array[0].OrderType === 2 ?
                              <tr>
                                <td>
                                  {array[0].orderID}
                                  {console.log(array[0].orderID)}
                                </td>
                                <td>
                                  {array.map((order, i) =>{
                                      return (
                                        <div key={i}>
                                          {console.log(order)}
                                          {order.deleted === 0 ?
                                            <div>{order.name} 数量: ({order.DishCount})</div>
                                            :
                                            <div className="strikeThrough">{order.name} 数量: ({order.DishCount})</div>
                                          }

                                        </div>
                                      )
                                  })}

                                  {this.getModifiedWithOrderID(array[0].orderID).map((modifiedOrder, i) =>{
                                      return (
                                        <div key={i}>

                                          {modifiedOrder.map((order, i) =>{
                                              return (
                                                <div key={i}>
                                                  {order.deleted === 0 ?
                                                    <div>{order.name} 数量 ({order.num})</div>
                                                    :
                                                    <div className="strikeThrough">{order.name} 数量: ({order.DishCount})</div>
                                                  }

                                                </div>
                                              )
                                          })}
                                        </div>
                                      )
                                  })}

                                </td>
                                <td>
                                  {array[0].creatTime.slice(array[0].creatTime.lastIndexOf('T') + 0).replace("T", "").replace("+1000", "").replace("+1100", "")}  {array[0].creatTime.slice(0, array[0].creatTime.indexOf('T'))}
                                </td>

                                <td>
                                  {this.sumOriginWithOrderID(array[0].orderID)} + {this.sumModifiedWithOrderID(array[0].orderID)} = {this.totalPrice(array[0].orderID)}
                                </td>

                                <td>
                                  {array[0].OrderType === 1 ?
                                    <div>
                                      堂吃
                                    </div>
                                    :
                                    <div>
                                      外卖
                                    </div>}
                                </td>
                              </tr>
                            :null}
                          </tbody>
                          :null}
                          </div>
                        )
                    })}
                    </Table>
                </Tab>
              </Tabs>

          </div>
        )
    }
}
