import React, { Component } from 'react';

import { Button, Tabs, Tab, ButtonToolbar, FormControl, FormGroup} from 'react-bootstrap';

import { API } from '../config';
import AuthOptions from '../auth/AuthOptions';
import Personal from '../personal/Personal';
import { Textfit } from 'react-textfit';

export default class Dishes extends Component {
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
          sdhpCalculatorInitiatNumber:null
        }
  }

   componentDidMount() {
       this.getData()
       this.getInitialState()
   }
    componentWillReceiveProps(nextProps) {
      console.log(this.props);
      console.log(nextProps);

        if (nextProps.match.params.tableid !== this.props.match.params.tableid){
          this.setState({
            order:[],
            SDHPorder: []
          })
        }
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

    //将再次添加的菜品信息 生成并添加到 购物车 分割线下方
    setModifiedOrder = (POST) => {

        if (this.state.tableModifiedDishes.length === 0) {
          console.log(this.props.location.state.tableDishes_orderID)
            var newD = {
              "orderID": this.props.location.state.tableDishes_orderID,
              "name": POST.name,
              "price": POST.price,
              "DishID": POST.dishId,
              "DishCount": 1,
              "type": POST.type
            }
            let tempOrder = this.state.tableModifiedDishes
                tempOrder.push(newD)
            console.log(tempOrder)
            this.setState({tableModifiedDishes: tempOrder})
            return;
        }
        else {
            for (let i = 0; i < this.state.tableModifiedDishes.length; i++) {
                if (this.state.tableModifiedDishes[i].name === POST.name) {
                    let tempOrder = this.state.tableModifiedDishes
                    tempOrder[i].DishCount = this.state.tableModifiedDishes[i].DishCount + 1

                    this.setState({tableModifiedDishes: tempOrder})
                    console.log(this.state.tableModifiedDishes)
                    return;
                }
                else if (i === this.state.tableModifiedDishes.length-1 && this.state.tableModifiedDishes[i].name !== POST.name){
                  console.log(this.props.location.state.tableDishes_orderID)
                    var newD = {
                      "orderID": this.props.location.state.tableDishes_orderID,
                      "name": POST.name,
                      "price": POST.price,
                      "DishID": POST.dishId,
                      "DishCount": 1,
                      "type": POST.type
                    }
                    let tempOrder = this.state.tableModifiedDishes
                        tempOrder.push(newD)
                    // console.log(tempOrder)
                    this.setState({tableModifiedDishes: tempOrder})
                    // console.log(this.state.order)
                    return;
                }
                }
        }
        console.log(this.state.tableModifiedDishes)
    }
    //将再次添加的菜品信息 上传至 数据库dishmode表
    updateModifiedDiesh = () => {
      console.log(this.state.tableModifiedDishes)
      if (this.state.tableModifiedDishes.length === 0){
        console.log(this.state.tableModifiedDishes)
        console.log(this.state.textareaValue)
        console.log(this.props.location.state.tableDishes_orderID)
        fetch(API.baseUri + API.addDish, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "items": this.state.tableModifiedDishes,
            "comment": this.state.textareaValue,
            "orderID": this.props.location.state.tableDishes_orderID
              })
        }).then(res =>{
            if(res.status===200) {
              return res.json();
            }
            else console.log(res)
        }).then(json => {
          console.log(json)
          // console.log(json)
          if (json){
            window.location = '/home/CheckDishes/' + this.props.match.params.tableid + "/" + this.props.location.state.tableDishes_orderID
            console.log(json.msg)
            console.log(this.props)
            // window.location = '/'
            // this.getModifiedData(temp_modifiedArray);
          }
          // console.log(this.state.tableModifiedDishes)
        })
      }
      else{
        var temp_modifiedArray = [];
        var date = new Date();
        var time = date.toLocaleTimeString();
        let tempTableModifiedDishes = this.state.tableModifiedDishes
        for (let i = 0; i < tempTableModifiedDishes.length; i++){
          tempTableModifiedDishes[i].createTime = time
          temp_modifiedArray.push(tempTableModifiedDishes[i])
        }
        console.log(temp_modifiedArray);
        console.log(this.state.tableModifiedDishes)
        // console.log(this.state.textareaValue)
        // console.log(this.props.location.state.tableDishes_orderID)

        fetch(API.baseUri + API.addDish, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          // [req.body.orderID, v[i].DishID, req.body.createTime, v[i].num]
          body: JSON.stringify({
                  // "orderID": temp_modified[0].orderID,
                  "items": temp_modifiedArray,
                  "comment": this.state.textareaValue,
                  "orderID": this.props.location.state.tableDishes_orderID
                  // "createTime": time,
              })
        } ).then(res =>{
            if(res.status===200) {
              // console.log(res.json())
              return res.json();
            }
            else console.log(res)
        }).then(json => {
          console.log(json)
          // console.log(json)
          if (json.success === true){
            console.log(json.msg)
            window.location = '/home/CheckDishes/' + this.props.match.params.tableid + "/" + this.props.location.state.tableDishes_orderID
            console.log(this.props.match.params.tableid)
            // window.location = '/'
            // this.getModifiedData(temp_modifiedArray);
          }
          // console.log(this.state.tableModifiedDishes)
        })
        // console.log("");
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
    SumUpModified = ()=> {
        var total = this.props.location.state.tableDishes.reduce((sum, price) =>{
            return sum + price.DishCount * price.price
        }, 0)
        return total;
    }

    SumUpLastTimeModified = ()=> {
      var tempLastTimeModifiedPositive = []
      var tempLastTimeModified = this.props.location.state.tableModifiedDishes
      for (let index in tempLastTimeModified)
      {
        if(tempLastTimeModified[index].num >= 0)
        tempLastTimeModifiedPositive.push(tempLastTimeModified[index])
      }

        var total = tempLastTimeModifiedPositive.reduce((sum, price) =>{
            return sum + price.num * price.price
        }, 0)
        return total;
    }
    SumUpCurrentModified = ()=> {
        var total = this.state.tableModifiedDishes.reduce((sum, price) =>{
            return sum + price.DishCount * price.price
        }, 0)
        return total;
    }

    SumUpEntirePrice = ()=> {
        var total = this.SumUpModified() + this.SumUpLastTimeModified() + this.SumUpCurrentModified();
        return total;
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

    deleteModifiedDish = (nameDish)=> {
        console.log(nameDish)
        var temp_post = [];
        for(let index in this.state.tableModifiedDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableModifiedDishes[index].name !== nameDish){
                temp_post.push(this.state.tableModifiedDishes[index])
            }
        }this.setState({
            tableModifiedDishes:temp_post
        })
    }

    handleChange = (event) => {
      this.setState({textareaValue: event.target.value});
    }



    getInitialState = () => {
      if (this.props.location.hasOwnProperty("state") === true){
        this.setState({
          textareaValue: this.props.location.state.comment
        })
        console.log(this.state.textareaValue)
      }

      // this.setState({
      //   textareaValue: this.props.location.state.comment
      // })
      // console.log("getInitialState")
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

      fetch(API.baseUri+API.postOrder, {
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
                "comment":this.state.textareaValue

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

    parentChild = (value) => {
      this.setState({
        childValue:value
      })
      console.log(value);
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

    //对应加菜页面的麻辣香锅总数结算
    SDHPNumberCalculatorLater = () => {
      var tempSDHPorder = []
      var reducer = (accumulator, currentValue) => accumulator + currentValue;
      if (this.props.location.hasOwnProperty("state") === true ){
        //结算首次添加的麻辣香锅数量 （数量全为正数）
        var temp = this.props.location.state.tableDishes
        for (let index in temp){
          if (temp[index].type === "麻辣香锅" && temp[index].DishCount > 0) {
            tempSDHPorder.push(temp[index].DishCount)
          }
        }
        //结算当前添加的麻辣香锅数量
        var temp2 = this.state.tableModifiedDishes
        for (let index in temp2){
          if (temp2[index].type === "麻辣香锅" && temp2[index].DishCount > 0) {
            tempSDHPorder.push(temp2[index].DishCount)
          }
        }
        //结算更改过的的麻辣香锅数量
        var temp3 = this.props.location.state.tableModifiedDishes
        for (let index in temp3){
          if (temp3[index].type === "麻辣香锅" && temp3[index].num > 0) {
            tempSDHPorder.push(temp3[index].num)
          }
        }
        //结算 总麻辣香锅的数量  （不包含已删除的麻辣香锅）
        if(tempSDHPorder.length !== 0)
        {
          var total = tempSDHPorder.reduce(reducer)
        }
          return total;
      }
    }

    //加菜页面的其他菜品数量 （不包括已删除的菜品）
    NumberCalculatorLater = () => {
      var tempOrder = []
      var reducer = (accumulator, currentValue) => accumulator + currentValue;

      var temp = this.props.location.state.tableDishes
      for (let index in temp) {
        if (temp[index].DishCount > 0) {
          tempOrder.push(temp[index].DishCount)
        }
      }

      var temp2 = this.props.location.state.tableModifiedDishes
      for (let index in temp2) {
        if (temp2[index].num > 0) {
          tempOrder.push(temp2[index].num)
        }
      }

      var temp3 = this.state.tableModifiedDishes
      for (let index in temp3) {
        if (temp3[index].DishCount > 0) {
          tempOrder.push(temp3[index].DishCount)
        }
      }

      if(tempOrder.length !== 0)
      {
        console.log(tempOrder.reduce(reducer));
        var total = tempOrder.reduce(reducer)
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

    activeOrDisabledModified = () => {
      var verify = true;
      if ((this.SDHPNumberCalculatorLater() >= 5) || (this.NumberCalculatorLater() !== 0 && this.SDHPNumberCalculatorLater() === undefined)){
        verify = false;
      }
      return verify
    }

render() {


  console.log(this.state.SDHPorder)
  // console.log(this.props.location)
  // console.log(Object.keys(this.props.location).length)
  console.log(this.props.location.hasOwnProperty("state"));
    return (
      <div>
        <div className="">
          <div className="col-sm-12 col-lg-2">

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

          <div className="col-sm-12 col-lg-10 pull-right">
                桌号: {this.props.match.params.tableid}<br />
              {this.props.location.hasOwnProperty("state") === true ?
                <div>
                  {"存在 this.props.location.state.tableDishes_orderID"}
                </div>:null}




            <div className="">
                <div className="col-lg-9 cust-border nova-card" >
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="小吃" className="nova-padding">
                            <ButtonToolbar>
                              <div className="row">
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "小吃" ?
                                          <div className="">
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                            :
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                          }
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
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setSDHPOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                            :
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                          }
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
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setSDHPOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                            :
                                            <div className="col-lg-2"><Button className="button-menus" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button></div>
                                          }
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
                    购物车
                    <hr />
                    <div>
                      {this.props.location.hasOwnProperty("state") !== true ?
                        <div>
                          {this.state.order.map((value, key1) =>{
                              return (
                                  <div key={key1}>
                                      <div>
                                          {value!==0?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-6">{value.name}</div>
                                                  <div className="col-lg-1">x</div>
                                                  <div className="col-lg-1">{value.num}</div>
                                                  <div className="col-lg-2"><Button className="" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                                              </div>: null}
                                      </div>

                                  </div>
                              )})}
                        </div>:
                        <div>
                          <div>
                            {this.props.location.state.tableDishes.map((value, key1) =>{
                                return (
                                    <div key={key1}>
                                        <div>
                                            {value!==0 && value.type !== "麻辣香锅"?
                                                <div className="row cust-margin5">
                                                    <div className="col-lg-6">{value.name}</div>
                                                    <div className="col-lg-1">x</div>
                                                    <div className="col-lg-1">{value.DishCount}</div>
                                                </div>:null
                                                }
                                        </div>

                                    </div>
                                )})}
                          </div>
                          {this.SDHPNumberCalculatorLater() > 0 && this.SDHPNumberCalculatorLater() < 5  ?
                            <div>
                              <div className="sdhpBorder">
                                <h4 className="cust-text1" >少于5份麻辣香锅菜品数量!</h4>
                                <h4>麻辣香锅菜品列表：({this.SDHPNumberCalculatorLater()})</h4>
                                {this.props.location.state.tableDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0 && value.type === "麻辣香锅"?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-6">{value.name}</div>
                                                        <div className="col-lg-1">x</div>
                                                        <div className="col-lg-1">{value.DishCount}</div>
                                                    </div>:null
                                                    }
                                            </div>

                                        </div>
                                    )})}
                                    {this.state.tableModifiedDishes.map((value, key1) =>{
                                        return (
                                            <div key={key1}>
                                                <div>
                                                    {value!== 0 && value.type === "麻辣香锅" ?
                                                        <div className="row cust-margin5">
                                                            <div className="col-lg-6">{value.name}</div>
                                                            <div className="col-lg-1">x</div>
                                                            <div className="col-lg-1"><p className="">{value.DishCount}</p></div>
                                                            <div className="col-lg-1"><Button className="" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删</Button></div>
                                                        </div>: null}
                                                </div>
                                            </div>
                                        )})}
                                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                            return (
                                                <div key={key1}>
                                                    <div>
                                                        {value.num > 0 && value.type === "麻辣香锅"?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-6">{value.name}</div>
                                                                <div className="col-lg-1">x</div>
                                                                <div className="col-lg-1"><p className="">{value.num}</p></div>
                                                            </div>: null}
                                                    </div>
                                                </div>
                                            )})}
                                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                            return (
                                                <div key={key1}>
                                                    <div>
                                                        {value.num < 0 && value.type === "麻辣香锅" ?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-6">{value.name}</div>
                                                                <div className="col-lg-1">x</div>
                                                                <div className="col-lg-1 cust-p-color"><p>{value.num}</p></div>
                                                            </div>: null}
                                                    </div>
                                                </div>
                                            )})}
                              </div>
                            </div>
                            :null
                          }
                          {this.SDHPNumberCalculatorLater() >= 5 ?
                            <div>
                              <div className="sdhpBorder">
                                <h4>麻辣香锅菜品列表：({this.SDHPNumberCalculatorLater()})</h4>
                                {this.props.location.state.tableDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0 && value.type === "麻辣香锅"?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-6">{value.name}</div>
                                                        <div className="col-lg-1">x</div>
                                                        <div className="col-lg-1">{value.DishCount}</div>
                                                    </div>:null
                                                    }
                                            </div>

                                        </div>
                                    )})}
                                    {this.state.tableModifiedDishes.map((value, key1) =>{
                                        return (
                                            <div key={key1}>
                                                <div>
                                                    {value!== 0 && value.type === "麻辣香锅" ?
                                                        <div className="row cust-margin5">
                                                            <div className="col-lg-6">{value.name}</div>
                                                            <div className="col-lg-1">x</div>
                                                            <div className="col-lg-1"><p className="">{value.DishCount}</p></div>
                                                            <div className="col-lg-1"><Button className="" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删</Button></div>
                                                        </div>: null}
                                                </div>
                                            </div>
                                        )})}
                                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                            return (
                                                <div key={key1}>
                                                    <div>
                                                        {value.num > 0 && value.type === "麻辣香锅"?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-6">{value.name}</div>
                                                                <div className="col-lg-1">x</div>
                                                                <div className="col-lg-1"><p className="">{value.num}</p></div>
                                                            </div>: null}
                                                    </div>
                                                </div>
                                            )})}
                                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                            return (
                                                <div key={key1}>
                                                    <div>
                                                        {value.num < 0 && value.type === "麻辣香锅" ?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-6">{value.name}</div>
                                                                <div className="col-lg-1">x</div>
                                                                <div className="col-lg-1 cust-p-color"><p>{value.num}</p></div>
                                                            </div>: null}
                                                    </div>
                                                </div>
                                            )})}
                              </div>
                            </div>
                            :null
                          }

                          <div className="cust-border2 ">
                            {console.log(this.props.location.state.tableModifiedDishes)}
                            {console.log(this.props.location.state.tableDishes)}
                            {console.log(this.state.tableModifiedDishes)}

                            {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                return (
                                    <div key={key1}>
                                        <div>
                                            {value.num > 0 && value.type !== "麻辣香锅"?
                                                <div className="row cust-margin5">
                                                    <div className="col-lg-6">{value.name}</div>
                                                    <div className="col-lg-1">x</div>
                                                    <div className="col-lg-1"><p className="">{value.num}</p></div>
                                                </div>: null}
                                        </div>
                                    </div>
                                )})}

                                {this.state.tableModifiedDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!== 0 && value.type !== "麻辣香锅" ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-6">{value.name}</div>
                                                        <div className="col-lg-1">x</div>
                                                        <div className="col-lg-1"><p className="cust-p-color2">{value.DishCount}</p></div>
                                                        <div className="col-lg-1"><Button className="" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删</Button></div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}

                                    {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                        return (
                                            <div key={key1}>
                                                <div>
                                                    {value.num < 0 && value.type !== "麻辣香锅" ?
                                                        <div className="row cust-margin5">
                                                            <div className="col-lg-6">{value.name}</div>
                                                            <div className="col-lg-1">x</div>
                                                            <div className="col-lg-1 cust-p-color"><p>{value.num}</p></div>
                                                        </div>: null}
                                                </div>
                                            </div>
                                        )})}
                          </div>

                        </div>
                      }
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
                                              <div className="col-lg-6">{value.name}</div>
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
                            <div className="col-lg-3">总价: </div>
                            <div className="col-lg-2">
                              {this.props.location.hasOwnProperty("state") !== true ?
                                <div>
                                  #{this.SumUp()}
                                </div>:
                                <div>
                                  originalPrice-{this.SumUpModified()}<br />
                                  lastModified-{this.SumUpLastTimeModified()}<br />
                                  currentModified-{this.SumUpCurrentModified()}<br />
                                  total-{this.SumUpEntirePrice()}
                                </div>
                              }
                            </div>
                            {this.props.location.hasOwnProperty("state") !== true ?
                              <div>
                                <FormGroup controlId="formControlsTextarea">
                                  <FormControl componentClass="textarea"  value={this.state.textareaValue} onChange={this.handleChange} placeholder="填写备注信息：" />
                                </FormGroup>
                              </div>:
                              <div>
                                <FormGroup controlId="formControlsTextarea">
                                  <FormControl componentClass="textarea"  value={this.state.textareaValue} onChange={this.handleChange} placeholder="填写备注信息：" />
                                </FormGroup>
                              </div>
                            }

                        </div>
                        <div className="row nova-margin">
                          {this.props.location.hasOwnProperty("state") === true ?
                            <div>
                              <Button className="" bsStyle="success" disabled={this.activeOrDisabledModified()} onClick={()=>{this.updateModifiedDiesh()}}>确认加菜</Button>
                            </div>:
                            <div className="row">
                              <div className="col-lg-6">
                                <Button bsStyle="warning" onClick={()=>{this.bookTable()}}>预定桌位</Button>
                              </div>
                              <div className="col-lg-6">
                                <Button bsStyle="success" disabled={this.activeOrDisabled()} onClick={()=>{this.submitOrder()}}>提交订单</Button>
                              </div>
                            </div>
                          }



                        </div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    )
}
}
