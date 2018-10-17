import React, { Component } from 'react'
import { Button, Tabs, Tab, ButtonToolbar, FormControl, FormGroup, ControlLabel} from 'react-bootstrap'
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


export default class CheckBookings extends Component {
    constructor(props) {
        super(props);
        this.authOptions = React.createRef();
        this.state = {
          childValue:'',
          order: [],
          SDHPorder: [],
          alldishes: [],
          tableNum: null,
          sumTotal: 0,
          tableModifiedDishes:[],
          textareaValue: "",
          sdhpCalculatorInitiatNumber:null,

          startDate: moment()
        }
  }
  handleChangeDate = (date) => {
    this.setState({
      startDate: date
    });
  }

   componentDidMount() {
       this.getData()
   }

    componentWillReceiveProps(nextProps) {
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
            this.setState({alldishes: json})
        }).catch((error) => {
            console.log('error on .catch', error);
        });
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
        // console.log(this.state.order)
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

    deleteDish = (nameDish)=> {
        console.log(nameDish)
        var temp_post = [];
        for(let index in this.state.order){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.order[index].name !== nameDish){
                temp_post.push(this.state.order[index])
            }
        }this.setState({
            order:temp_post
        })
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

    handleChange = (event) => {
      this.setState({textareaValue: event.target.value});
    }

    bookTable = () => {
      fetch(API.baseUri+API.BookTable + "/" + this.props.match.params.tableid)
          .then((response) => {
              if (response.status === 200) {
                  return response.json()
              } else console.log("Get data error ");
          }).then((json) =>{
          console.log(json)
          window.location = '/home/CheckBookings/' + this.props.match.params.tableid
      }).catch((error) => {
          console.log('error on .catch', error);
      });
    }

    submitOrder = () => {
      var date = new Date();
      var time = date.toLocaleTimeString();
      // console.log(JSON.stringify(this.state.order))
      console.log(this.state.order)
      console.log(this.state.textareaValue)
      var order = this.state.order
      var SDHPorder = this.state.SDHPorder
      var totalorder = order.concat(SDHPorder)
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
                "totalPrice": this.SumUp(),
                "tableID": this.props.match.params.tableid,
                "comment":this.state.textareaValue,

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
          window.location = '/home/CheckDishes/' + this.props.match.params.tableid
          // window.location = '/'
        }
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

    activeOrDisabled = () => {
      // console.log(this.state.order.length)
      // console.log(this.SDHPNumberCalculatorInitiat())
      var verify = true;
      if ((this.SDHPNumberCalculatorInitiat() >= 5) || (this.state.order.length !== 0 && this.SDHPNumberCalculatorInitiat() === undefined)){
        verify = false;
      }
      return verify
    }

    bookTable = () => {
      fetch(API.baseUri+API.BookTable + "/" + this.props.match.params.tableid)
          .then((response) => {
              if (response.status === 200) {
                  return response.json()
              } else console.log("Get data error ");
          }).then((json) =>{
          console.log(json)
          window.location = '/home/CheckBookings/' + this.props.match.params.tableid
      }).catch((error) => {
          console.log('error on .catch', error);
      });
    }




render() {
  var toHomePage = {
   pathname: '/',
  }
  console.log(this.state.SDHPorder)
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
            <div className="">
                <div className="col-lg-9 cust-border nova-card" >
                  <center><h3>当前桌号: {this.props.match.params.tableid}</h3></center><br />
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="小吃" className="nova-padding">
                            <ButtonToolbar>
                              <div className="row">
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>

                                        {dish.type === "小吃" ?
                                          <div className="">
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                              </div>
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={2} title="凉菜" className="nova-padding">
                          <ButtonToolbar>
                              {this.state.alldishes.map((dish, i) =>{
                                  return (
                                    <div key={i}>
                                      {dish.type === "凉菜" ?
                                        <Button className=" cust-margin" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}>{dish.name}</Button>
                                      :null}
                                    </div>
                                  )
                              })}
                          </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={3} title="汤" className="nova-padding">
                          <ButtonToolbar>
                              {this.state.alldishes.map((dish, i) =>{
                                  return (
                                    <div key={i}>
                                      {dish.type === "汤" ?
                                        <Button className=" cust-margin" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}>{dish.name}</Button>
                                      :null}
                                    </div>
                                  )
                              })}
                          </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={4} title="麻辣香锅" className="nova-padding">
                            <ButtonToolbar>
                              <div className="row">
                                <h2>荤菜</h2>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "麻辣香锅" &&  dish.subtype === "荤菜"?
                                          <div className="">
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setSDHPOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                              </div>
                              <div className="row">
                                <h2>素菜</h2>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "麻辣香锅" &&  dish.subtype === "素菜"?
                                          <div className="">
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setSDHPOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                              </div>
                            </ButtonToolbar>
                        </Tab>
                    </Tabs>
                </div>
                <div className="col-lg-3 pull-right cust-border nova-card shopping-cart">
                    预定菜品列表
                    <hr />
                    <div>
                        <div>
                          {this.state.order.map((value, key1) =>{
                              return (
                                  <div key={key1}>
                                      <div>
                                          {value!==0?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7">{value.name}</div>
                                                  <div className="col-lg-1">x</div>
                                                  <div className="col-lg-1">{value.num}</div>
                                                  <div className="col-lg-2"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                                              </div>: null}
                                      </div>

                                  </div>
                              )})}
                        </div>
                    </div>
                    <div className="sdhpBorder">
                      {this.state.SDHPorder.length !== 0 ?
                      <h4>麻辣香锅菜品列表：</h4>:null}
                      {this.SDHPNumberCalculatorInitiat() < 5 ?
                        <h4 className="cust-text1" >少于5份麻辣香锅菜品数量!</h4>
                        :null
                      }
                      {this.state.SDHPorder.map((value, key1) =>{
                          return (
                              <div key={key1}>
                                  <div>
                                      {value!==0?
                                          <div className="row cust-margin5">
                                              <div className="col-lg-7">{value.name}</div>
                                              <div className="col-lg-1">x</div>
                                              <div className="col-lg-1">{value.num}</div>
                                              <div className="col-lg-2"><Button className="" bsStyle="danger" onClick={()=>{this.deleteSDHPDish(value.name)}}>删除</Button></div>
                                          </div>: null}
                                  </div>

                              </div>
                          )})}
                    </div>
                    <div>
                        <div className="row nova-margin">

                            <div className="col-lg-5">总价:</div>


                            <div className="col-lg-6">
                                <div>
                                  {this.SumUp() + "  " + "$AUD"}
                                </div>
                            </div>

                              <div>
                                <FormGroup controlId="formControlsTextarea">
                                  <FormControl componentClass="textarea"  value={this.state.textareaValue} onChange={this.handleChange} placeholder="填写备注信息：" />
                                </FormGroup>
                              </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 cust-border nova-card">

                  <form>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="请输入顾客姓名"
                      onChange={this.handleChange}
                    />
                  <br />
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="请输入顾客电话"
                      onChange={this.handleChange}
                    />
                  <br />

                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>用餐人数</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">None</option>
                        <option value="other">1</option>
                        <option value="other">2</option>
                        <option value="other">3</option>
                        <option value="other">4</option>
                        <option value="other">5</option>
                        <option value="other">6</option>
                        <option value="other">7</option>
                        <option value="other">8</option>
                      </FormControl>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>备注</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="请输入备注信息" />
                    </FormGroup>

                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>预定时间</ControlLabel>
                      <ControlLabel>
                        <Clock format={'h:mm:ss A'} timezone={'Australia/Sydney'} ticking={true}/>
                        <Clock format={'  dddd, MMMM Mo, YYYY'} timezone={'Australia/Sydney'}/>
                      </ControlLabel>
                    </FormGroup>
                    <Button className="col-lg-3" bsStyle="warning" onClick={()=>{this.bookTable()}}>预定桌位</Button>
                    <div className="col-lg-1"></div>
                    <Button className="col-lg-3" bsStyle="danger" onClick={()=>{this.cancleBookTable()}}>取消预订</Button>
                    <div className="col-lg-1"></div>
                    <Link to={toHomePage}><Button className="col-lg-3" onClick={()=>{}}>返回控制台</Button></Link>



                  </form>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    dateFormat="LLL"
                    timeCaption="time"
                    fixedHeight={true}
                    fixedWidth

                  />

                </div>

            </div>
          </div>

      </div>
    )
}
}
