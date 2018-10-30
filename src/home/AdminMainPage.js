import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Table, Modal, Thumbnail,Grid ,Col, Row, Alert } from 'react-bootstrap'
import Personal from '../personal/Personal'
import AuthOptions from '../auth/AuthOptions'
import { Textfit } from 'react-textfit'
import ImageUploader from 'react-images-upload'

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
            NewdishNameValue: "",
            NewdishPriceValue: "",
            NewdishTypeValue: "",
            NewdishSubtypeValue: "",
            editorOpenAllowed: true,
            show: false,
            show2: false,
            showAlert: false,
            targetDish:[],
            pictures: []

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
              editorOpenAllowed: true,

              NewdishNameValue: "",
              NewdishPriceValue: "",
              NewdishTypeValue: "",
              NewdishSubtypeValue: "",
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

  //删除 唯一 对应 菜品信息
  deleteDish = (dish) => {
    console.log("删除 唯一 对应 菜品信息")
    fetch(API.baseUri+API.deleteDishInfo + "/" + dish.dishId)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
        console.log(json)
        this.getData()
    }).catch((error) => {
        console.log('error on .catch', error);
    })
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
  //对应添加菜品按钮   新增菜品信息
  addNewDishInfo = () => {
    fetch(API.baseUri+API.addNewDishInfo, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
              "NewdishNameValue": this.state.NewdishNameValue,
              "NewdishPriceValue": this.state.NewdishPriceValue,
              "NewdishTypeValue": this.state.NewdishTypeValue,
              "NewdishSubtypeValue": this.state.NewdishSubtypeValue,
          })
    } ).then(res =>{
        if(res.status===200) {
          // console.log(res.json())
          return res.json();
        }
        else console.log(res)
    }).then(json => {
      if (json.success === true){

        this.getData()
      }
    })
  }
  //监控新增菜品名字 改动
  handleChangeNewdishNameValue = (event) => {
    this.setState({NewdishNameValue: event.target.value});
  }
  //监控新增菜品价格 改动
  handleChangeNewdishPriceValue = (event) => {
    this.setState({NewdishPriceValue: event.target.value});
  }
  //监控新增菜品类别 改动
  handleChangeNewdishTypeValue = (event) => {
    this.setState({NewdishTypeValue: event.target.value});
  }
  //监控新增菜品细分类别 改动
  handleChangeNewdishSubtypeValue = (event) => {
    this.setState({NewdishSubtypeValue: event.target.value});
  }
  //控制按钮的 Disable 属性
  activeOrDisabled = () => {
    var buttonDisable = false;
    if (this.state.editorOpenAllowed === false){
      buttonDisable = true;
    }
    return buttonDisable
  }

  //对应 查看图片 按钮
  checkImg = (dish) => {
    this.setState({
      targetDish: dish,
      show: true,
     })
  }
  //对应 暂无图片 按钮  添加图片
  addImg = (dish) => {
    this.setState({
      targetDish: dish,
      show2: true,
     })
  }

  //对应 删除图片 按钮
  deleteImage = () => {
    fetch(API.baseUri+API.deleteImage + "/" + this.state.targetDish.dishId)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else console.log("Get data error ");
        }).then((json) =>{
        this.setState({
          show:false,
          showAlert:false
        })

        }).then(() =>{

        this.getData()
        }).catch((error) => {
          console.log('error on .catch', error);
    })
  }

 //对应 Modal 关闭功能
  handleHide = () => {
    this.setState({ show: false });
  }

 //对应 添加图片的Modal 关闭功能
  handleHide2 = () => {
    this.setState({ show2: false });
  }

  //关闭Alert
  handleDismiss = () => {
  this.setState({ showAlert: false });
  }

  //打卡Alert
  handleShow = () => {
    this.setState({ showAlert: true });
  }

  //判断 菜品图片是否存在
  verifyImage = (dish) => {
    var result = 0
    if (dish.abbreviation !== null) {
      result = 1
    }
    return result
  }



  //拖拽上传功能
  onDrop = (picture) => {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    })
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
                                            <div className="col-lg-5"  />
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.deleteDish(dish)}}>删除</Button>
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
                                            <div className="col-lg-1"  />
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.deleteDish(dish)}}>删除</Button>
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
                                            <div className="col-lg-1"/>
                                            {dish.available === 1 ?
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="success" onClick={() => {this.unavailable(dish)}}>已上架</Button>
                                            :
                                              <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.available(dish)}}>已下架</Button>
                                            }
                                            <div className="col-lg-1"/>
                                            <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {}}>删除</Button>
                                            {this.verifyImage(dish) === 1 ?
                                              <div>
                                                <div className="col-lg-1"/>
                                                <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="info" onClick={() => {this.checkImg(dish)}}>图片预览</Button>
                                              </div>
                                              :
                                              <div>
                                                <div className="col-lg-1"/>
                                                <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-2" bsSize="xsmall" bsStyle="danger" onClick={() => {this.addImg(dish)}}>暂无图片</Button>
                                              </div>
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
              <div className="col-lg-12 cust-border nova-card" >
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
                  <tbody>
                    <tr>
                      <td>
                        自动生成
                      </td>
                      <td>
                        <FormControl
                          type="text"
                          value={this.state.NewdishNameValue}
                          placeholder="菜品名称"
                          onChange={this.handleChangeNewdishNameValue}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="text"
                          value={this.state.NewdishPriceValue}
                          placeholder="菜品价格"
                          onChange={this.handleChangeNewdishPriceValue}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="text"
                          value={this.state.NewdishTypeValue}
                          placeholder="菜品类别"
                          onChange={this.handleChangeNewdishTypeValue}
                        />
                      </td>
                      <td>
                        <FormControl
                          type="text"
                          value={this.state.NewdishSubtypeValue}
                          placeholder="菜品细分类别"
                          onChange={this.handleChangeNewdishSubtypeValue}
                        />
                      </td>

                      <td>
                        <Button disabled={this.activeOrDisabled()} className="deleteButton col-lg-3"  bsStyle="info" onClick={() => {this.addNewDishInfo()}}>添加菜品</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
          </div>
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="">
                <center>图片预览</center>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Grid>
                <Row>
                  <Col md={1}/>
                  <Col md={4}>
                    <Thumbnail src={"http://api.shuweiyuan.com.au/img/" + this.state.targetDish.abbreviation + ".jpg"} alt="242x200">
                      <center><h3>{this.state.targetDish.name}</h3></center>

                        <center><Button bsStyle="primary" onClick={() => {this.handleShow()}}>删除图片</Button></center>

                       {this.state.showAlert === true ?
                        <div>
                          <hr/>
                          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                            <center><h3><b>需要您的再次确认</b></h3></center>
                              <div className="col-lg-2"/>
                              <Button bsStyle="danger" onClick={() => {this.deleteImage()}}>确认删除</Button>
                              <div className="col-lg-1"/>
                              <Button onClick={this.handleDismiss}>返回</Button>

                          </Alert>
                        </div>
                      :null}
                    </Thumbnail>
                  </Col>
                </Row>
              </Grid>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>关闭</Button>
            </Modal.Footer>
          </Modal>


          <Modal
            show={this.state.show2}
            onHide={this.handleHide2}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="">
                <center>图片预览</center>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Grid>
                <Row>
                  <Col md={1}/>
                  <Col md={4}>
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose images'
                      onChange={() => this.onDrop()}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                  />
                    <Thumbnail src={"http://api.shuweiyuan.com.au/img/" + this.state.targetDish.abbreviation + ".jpg"} alt="242x200">
                      <center><h3>{this.state.targetDish.name}</h3></center>


                        <center><Button bsStyle="primary" onClick={() => {this.handleShow()}}>111111111111</Button></center>
                    </Thumbnail>
                  </Col>
                </Row>
              </Grid>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide2}>关闭</Button>
            </Modal.Footer>
          </Modal>

        </div>
        )
    }
}
