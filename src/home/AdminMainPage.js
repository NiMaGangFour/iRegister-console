import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Table } from 'react-bootstrap'
import Personal from '../personal/Personal'
import AuthOptions from '../auth/AuthOptions'
import { Textfit } from 'react-textfit'

export default class AdminMainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alldishes: [],
            dishIdValue: "",
            dishNameValue: "",
            dishPriceValue: "",
            dishTypeValue: "",
            dishSubtypeValue: "",
            editorOpenAllowed: true
        }
      }
    componentWillMount() {
    }

    componentDidMount() {
      this.getData()
    }

    getData() {
        //console.log(API.baseUri+API.getAllDishes)
        fetch(API.baseUri+API.getAllDishes)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            console.log(json)
            this.setState({
              alldishes: json,
              editorOpenAllowed: true
            })
        }).catch((error) => {
            console.log('error on .catch', error);
        });
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

  editor = (dish) => {
    dish.editorOpen = true
    var editorArrary = []
    editorArrary.push(dish)
    console.log(editorArrary)
    var temp = this.state.alldishes.map(obj => editorArrary.find(o => o.dishId === obj.dishId) || obj)
    console.log(temp)
    this.setState({
      alldishes:temp,
      dishIdValue: dish.dishId ,
      dishNameValue: dish.name,
      dishPriceValue: dish.price,
      dishTypeValue: dish.type,
      dishSubtypeValue: dish.subtype,
      editorOpenAllowed: false
    })
  }
    //对应取消编辑按钮 将特定 dish 中的 editorOpeng 的 key， value pair 删除
    editorOpenDelete = (dish) => {
    delete dish.editorOpen
    var templArrary = []
    //放入array以便于使用 代替功能
    templArrary.push(dish)
    console.log(templArrary)
    var temp = this.state.alldishes.map(obj => templArrary.find(o => o.dishId === obj.dishId) || obj)
    console.log(temp)
    this.setState({
      alldishes:temp,
      editorOpenAllowed: true
    })
  }
  //对应保存按钮   更新唯一指定 菜品
  updateDish = (dish) => {
    fetch(API.baseUri+API.updateDishInfo, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
              "dishIdValue": dish.dishId,
              "dishNameValue": this.state.dishNameValue,
              "dishPriceValue": this.state.dishPriceValue,
              "dishTypeValue": this.state.dishTypeValue,
              "dishSubtypeValue": this.state.dishSubtypeValue,
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
        this.getData()
      }
    })
  }

  //对应 已上架  按钮   实现菜品下架功能
  unavailable = (dish) => {
    fetch(API.baseUri+API.UnavailableDish + "/" + dish.dishId)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
        console.log("实现菜品下架功能")
        this.getData()
    }).catch((error) => {
        console.log('error on .catch', error);
    });
  }

  //对应 已下架  按钮   实现菜品上架功能
  available = (dish) => {
    fetch(API.baseUri+API.AvailableDish + "/" + dish.dishId)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
        console.log("实现菜品上架功能")
        this.getData()
    }).catch((error) => {
        console.log('error on .catch', error);
    });
  }

  //监控菜品名字 改动
  handleChangedishNameValue = (event) => {
    this.setState({dishNameValue: event.target.value});
  }
  //监控菜品价格 改动
  handleChangedishPriceValue = (event) => {
    this.setState({dishPriceValue: event.target.value});
  }
  //监控菜品类别 改动
  handleChangedishTypeValue = (event) => {
    this.setState({dishTypeValue: event.target.value});
  }
  //监控菜品细分类别 改动
  handleChangedishSubtypeValue = (event) => {
    this.setState({dishSubtypeValue: event.target.value});
  }
  //控制按钮的 Disable 属性
  activeOrDisabled = () => {
    console.log(this.state.editorOpenAllowed)
    var buttonDisable = false;
    if (this.state.editorOpenAllowed === false){
      buttonDisable = true;
    }
    return buttonDisable
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
                <center><b><h1>蜀味源</h1></b></center>
                <center><b><h1>菜单管理系统</h1></b></center>
                  <Tabs defaultActiveKey={5} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="小吃" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "小吃" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "小吃" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={2} title="凉菜" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "凉菜" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "凉菜" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={3} title="汤类" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "汤类" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "汤类" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }
                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={6} title="特色炒菜" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "特色炒菜" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "特色炒菜" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={7} title="海鲜" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "海鲜" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "海鲜" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={8} title="鸡" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "鸡" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "鸡" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={9} title="鸭" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "鸭" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "鸭" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={10} title="牛" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "牛" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "牛" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={11} title="羊" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "羊" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "羊" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={12} title="猪" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "猪" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "猪" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={13} title="面/米饭" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "面/米饭" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "面/米饭" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={14} title="甜点" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "甜点" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "甜点" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={15} title="卤味" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "卤味" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>

                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>
                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "卤味" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>

                    <Tab eventKey={4} title="麻辣香锅" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">菜品细分类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "麻辣香锅" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishSubtypeValue}
                                            placeholder={dish.subtype}
                                            onChange={this.handleChangedishSubtypeValue}
                                          />
                                        </td>
                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>

                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>

                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "麻辣香锅" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>{dish.subtype}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                    <Tab eventKey={5} title="特色烤鱼" className="nova-padding">
                      <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                            <th className="th-width-DishID">菜品编号</th>
                            <th className="th-width-DishName">菜品名称</th>
                            <th className="th-width-DishPrice">菜品单价</th>
                            <th className="th-width-DishType">菜品类别</th>
                            <th className="th-width-DishType">菜品细分类别</th>
                            <th className="th-width-DishType">功能按钮</th>
                          </tr>
                        </thead>
                            {this.state.alldishes.map((dish, i) =>{
                                return (
                                  <tbody key={i}>
                                    {dish.type === "特色烤鱼" && dish.hasOwnProperty("editorOpen") === true && dish.editorOpen === true ?
                                      <tr>
                                        <td>
                                          {dish.dishId}
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishNameValue}
                                            placeholder={dish.name}
                                            onChange={this.handleChangedishNameValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishPriceValue}
                                            placeholder={dish.price}
                                            onChange={this.handleChangedishPriceValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishTypeValue}
                                            placeholder={dish.type}
                                            onChange={this.handleChangedishTypeValue}
                                          />
                                        </td>
                                        <td>
                                          <FormControl
                                            type="text"
                                            value={this.state.dishSubtypeValue}
                                            placeholder={dish.subtype}
                                            onChange={this.handleChangedishSubtypeValue}
                                          />
                                        </td>
                                        <td>
                                          {this.activeOrDisabled() === true ?
                                            <div>

                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editorOpenDelete(dish)}}>取消编辑</Button>
                                            <div className="col-lg-1"  />
                                            <Button className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.updateDish(dish)}}>保存</Button>

                                            </div>
                                          :null}



                                        </td>
                                      </tr>
                                      :null}
                                      {dish.type === "特色烤鱼" && dish.hasOwnProperty("editorOpen") !== true ?
                                        <tr>
                                          <td>{dish.dishId}</td>
                                          <td>{dish.name}</td>
                                          <td>{dish.price}</td>
                                          <td>{dish.type}</td>
                                          <td>{dish.subtype}</td>
                                          <td>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="warning" onClick={() => {this.editor(dish)}}>编辑</Button>
                                            <div className="col-lg-1"  />
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }




                                          </td>
                                        </tr>
                                        :null}
                                  </tbody>
                                )
                            })}

                        </Table>
                    </Tab>
                  </Tabs>

              </div>
          </div>
        </div>
        )
    }
}
