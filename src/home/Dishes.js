import React, { Component } from 'react';
import {Link} from 'react-router-dom'
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
          Fishorder: [],
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
            SDHPorder: [],
            Fishorder: [],
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

    setFishOrder = (POST) => {
        // console.log(POST)
        if (this.state.Fishorder.length === 0) {
            var newD = {
                "name": POST.name,
                "price": POST.price,
                "DishID": POST.dishId,
                "num": 1,
                "type": POST.type,
                "subtype": POST.subtype,
            }
            let tempFishorder = this.state.Fishorder
                tempFishorder.push(newD)
            // console.log(tempOrder)
            this.setState({Fishorder: tempFishorder})
            return;
        }
        else {
            for (let i = 0; i < this.state.Fishorder.length; i++) {
                if (this.state.Fishorder[i].name === POST.name) {
                    let tempFishorder = this.state.Fishorder
                    tempFishorder[i].num = this.state.Fishorder[i].num + 1

                    this.setState({Fishorder: tempFishorder})
                    // console.log(this.state.order)
                    return;
                }
                else if (i === this.state.Fishorder.length-1 && this.state.Fishorder[i].name !== POST.name){
                    var newD = {
                        "name": POST.name,
                        "price": POST.price,
                        "DishID": POST.dishId,
                        "num": 1,
                        "type": POST.type,
                        "subtype": POST.subtype,
                    }
                    let tempFishorder = this.state.Fishorder
                        tempFishorder.push(newD)
                    // console.log(tempOrder)
                    this.setState({Fishorder: tempFishorder})
                    // console.log(this.state.order)
                    return;
                }
                }
        }
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

    //将再次添加的菜品信息 生成并添加到 购物车
    setModifiedOrder = (POST) => {
      console.log(POST)

        if (this.state.tableModifiedDishes.length === 0) {
          console.log(this.props.location.state.tableDishes_orderID)
            var newD = {
              "orderID": this.props.location.state.tableDishes_orderID,
              "name": POST.name,
              "price": POST.price,
              "DishID": POST.dishId,
              "DishCount": 1,
              "type": POST.type,
              "subtype": POST.subtype,
            }
            let tempOrder = this.state.tableModifiedDishes
                tempOrder.push(newD)
            console.log(tempOrder)
            this.setState({tableModifiedDishes: tempOrder})
            return;
        }
        else {
            for (let i = 0; i < this.state.tableModifiedDishes.length; i++) {
                if (this.state.tableModifiedDishes[i].name === POST.name && this.state.tableModifiedDishes[i].type === POST.type) {
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
                      "type": POST.type,
                      "subtype": POST.subtype,
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
        var totalFish = this.state.Fishorder.reduce((sum, price) =>{
            return sum + price.num * price.price
        }, 0)
        return total + totalSDHP + totalFish;
    }
    SumUpModified = ()=> {
      console.log(this.props.location.state.tableDishes)
      var tempArray = []
      var temp = this.props.location.state.tableDishes
      for (let index in temp) {
        if (temp[index].deleted === 0 ) {
          tempArray.push(temp[index])
        }
      }
      console.log(tempArray)
        var total = tempArray.reduce((sum, price) =>{
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

    deleteFishDish = (nameDish)=> {
        console.log(nameDish)
        var temp_post = [];
        for(let index in this.state.Fishorder){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.Fishorder[index].name !== nameDish){
                temp_post.push(this.state.Fishorder[index])
            }
        }this.setState({
            Fishorder:temp_post
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
    getToken = () => {
        // Retrieves the user token from localStorage
        var user = localStorage.getItem('SHUWEIYUAN');
        var uu = JSON.parse(user);
        console.log(uu);
        return uu.Token
    }

    submitOrder = () => {
      var a = JSON.parse(localStorage.getItem("SHUWEIYUAN"));
      if(a && a.id !== null && a.id !== undefined){
          var date = new Date();
          var time = date.toLocaleTimeString();
          // console.log(JSON.stringify(this.state.order))
          console.log(this.state.order)
          console.log(this.state.textareaValue)
          var order = this.state.order
          var SDHPorder = this.state.SDHPorder
          var Fishorder = this.state.Fishorder
          var totalorder = order.concat(SDHPorder,Fishorder)
          console.log(totalorder)

          fetch(API.baseUri+API.neworder, {
              method: "POST",
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.getToken()
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
              else if(res.status===400){
                   window.location='/login'
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
        else {
          window.location='/login'
        }
    }

    parentChild = (value) => {
      this.setState({
        childValue:value
      })
      console.log(value);
    }
    //对应初始点菜页面的烤鱼数量
    checkFishExist = () => {
      var tempArray = []
      var temp = this.state.Fishorder
      for (let index in temp) {
        if (temp[index].subtype === "烤鱼" ) {
          tempArray.push(temp[index])
        }
      }
      console.log(tempArray)
      return tempArray.length
    }
    //对加菜页面的烤鱼数量
    checkFishExistLater = () => {
      var tempArray = []
      //从CheckDish 页面接收的 （非 原始）
      var temp3 = this.props.location.state.tableModifiedDishes
      for (let index in temp3) {
        if (temp3[index].subtype === "烤鱼" && temp3[index].deleted === 0 ) {
          tempArray.push(temp3[index])
        }
      }

      //从CheckDish 页面接收的 （原始）
      var temp = this.props.location.state.tableDishes
      for (let index in temp) {
        if (temp[index].subtype === "烤鱼" && temp[index].deleted === 0 ) {
          tempArray.push(temp[index])
        }
      }

      //在Dish页面 正在通过点击 新加的 （当前）
      var temp2 = this.state.tableModifiedDishes
      console.log(this.state.tableModifiedDishes)
      for (let index in temp2) {
        if (temp2[index].subtype === "烤鱼") {
          tempArray.push(temp2[index])
        }
      }
      console.log(tempArray.length)
      return tempArray.length
    }

    //对加菜页面的 烤鱼 + 烤鱼配菜 [未删除]数量
    checkFishDishesPositiveExistLater = () => {
      var tempArray = []
      //从CheckDish 页面接收的 首次添加的 (原始)
      var temp = this.props.location.state.tableDishes
      for (let index in temp) {
        if (temp[index].type === "特色烤鱼" && temp[index].deleted === 0 ) {
          tempArray.push(temp[index])
        }
      }
      //从CheckDish 页面接收的 (非 原始)
      var temp3 = this.props.location.state.tableModifiedDishes
      for (let index in temp3) {
        if (temp3[index].type === "特色烤鱼" && temp3[index].deleted === 0 ) {
          tempArray.push(temp3[index])
        }
      }
      //在Dish页面 正在通过点击 新加的 正在添加的 所以属于 （非 原始)
      var temp2 = this.state.tableModifiedDishes
      console.log(this.state.tableModifiedDishes)
      for (let index in temp2) {
        if (temp2[index].type === "特色烤鱼" ) {
          tempArray.push(temp2[index])
        }
      }
      console.log(tempArray.length)
      return tempArray.length
    }
    //对加菜页面的 烤鱼 + 烤鱼配菜 数量
    checkFishDishesLater = () => {
      var tempArray = []
      //从CheckDish 页面接收的 首次添加的 (原始)
      var temp = this.props.location.state.tableDishes
      for (let index in temp) {
        if (temp[index].type === "特色烤鱼"  ) {
          tempArray.push(temp[index])
        }
      }
      //从CheckDish 页面接收的 (非 原始)
      var temp3 = this.props.location.state.tableModifiedDishes
      for (let index in temp3) {
        if (temp3[index].type === "特色烤鱼"  ) {
          tempArray.push(temp3[index])
        }
      }
      //在Dish页面 正在通过点击 新加的 正在添加的 所以属于 （非 原始)
      var temp2 = this.state.tableModifiedDishes
      console.log(this.state.tableModifiedDishes)
      for (let index in temp2) {
        if (temp2[index].type === "特色烤鱼" ) {
          tempArray.push(temp2[index])
        }
      }
      console.log(tempArray.length)
      return tempArray.length
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
      console.log(total)
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

    //加菜页面 所有 没删除的  菜品数量
    NumberCalculatorLater = () => {
      var tempOrder = []
      var reducer = (accumulator, currentValue) => accumulator + currentValue;

      var temp = this.props.location.state.tableDishes
      for (let index in temp) {
        if (temp[index].deleted === 0) {
          tempOrder.push(temp[index].DishCount)
        }
      }

      var temp2 = this.props.location.state.tableModifiedDishes
      for (let index in temp2) {
        if (temp2[index].deleted === 0) {
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
      //(有香锅 有鱼 有/无菜) || （有香锅 没鱼 有/无菜）|| （没香锅 没鱼 有/无菜）|| （没香锅 有鱼 有/无菜）
      if ((this.SDHPNumberCalculatorInitiat() >= 5 && this.checkFishExist() !== 0)
       || (this.SDHPNumberCalculatorInitiat() >= 5 && this.state.Fishorder.length ===0)
       || (this.state.order.length !== 0 && this.SDHPNumberCalculatorInitiat() === undefined && this.state.Fishorder.length ===0)
       || (this.SDHPNumberCalculatorInitiat() === undefined && this.checkFishExist() !== 0)){
        verify = false;
      }
      return verify
    }

    activeOrDisabledModified = () => {

      //console.log(this.NumberCalculatorLater()) //普通的菜
      console.log(this.SDHPNumberCalculatorLater()) //香锅
      console.log(this.checkFishExistLater()) // 整条鱼
      console.log(this.checkFishDishesLater()) //整条鱼 + 烤鱼配菜
      var verify = true;
      if ((this.SDHPNumberCalculatorLater() >= 5 && this.checkFishExistLater() !== 0)
      || (this.SDHPNumberCalculatorLater() >= 5 && this.checkFishExistLater() === 0 && this.checkFishDishesPositiveExistLater() === 0)
      || (this.SDHPNumberCalculatorLater() === undefined  && this.checkFishExistLater() === 0)
      || (this.SDHPNumberCalculatorLater() === undefined && this.checkFishExistLater() !== 0)){
        verify = false;
      }
      return verify
    }

render() {

  var toBookingPage = {
   pathname: '/home/CheckBookings/' + this.props.match.params.tableid,
  }
  console.log(this.state.SDHPorder)
  console.log(this.state.alldishes)
  // console.log(Object.keys(this.props.location).length)
  console.log(this.props.location.hasOwnProperty("state"));
    return (
      <div>
        <div className="">
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
                  <center><b><h3>当前桌号: {this.props.match.params.tableid}</h3></b></center>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="小吃" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "小吃" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={2} title="凉菜" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "凉菜" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={3} title="汤类" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "汤类" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={6} title="特色炒菜" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "特色炒菜" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={7} title="海鲜" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "海鲜" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={8} title="鸡" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "鸡" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={9} title="鸭" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "鸭" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={10} title="牛" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "牛" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={11} title="羊" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "羊" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={12} title="猪" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "猪" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={13} title="面/米饭" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "面/米饭" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={14} title="甜点" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "甜点" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={15} title="卤味" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "卤味" && dish.available === 1 ?
                                          <div>
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
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
                                        {dish.type === "麻辣香锅" &&  dish.subtype === "荤菜" && dish.available === 1?
                                          <div className="">
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setSDHPOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
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
                                        {dish.type === "麻辣香锅" &&  dish.subtype === "素菜" && dish.available === 1?
                                          <div className="">
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setSDHPOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                              </div>
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={5} title="特色烤鱼" className="nova-padding">
                            <ButtonToolbar>
                              <div className="row">
                                <h2>烤鱼口味</h2>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "特色烤鱼" &&  dish.subtype === "烤鱼" && dish.available === 1 ?
                                          <div className="">
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setFishOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                          }
                                        </div>
                                        :null}
                                      </div>
                                    )
                                })}
                              </div>
                              <div className="row">
                                <h2>荤菜</h2>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "特色烤鱼" &&  dish.subtype === "荤菜" && dish.available === 1 ?
                                          <div className="">
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setFishOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
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
                                        {dish.type === "特色烤鱼" &&  dish.subtype === "素菜" && dish.available === 1 ?
                                          <div className="">
                                          {this.props.location.hasOwnProperty("state")!== true ?
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setFishOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
                                            :
                                            <Button className="button-menus col-lg-2" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setModifiedOrder(dish)}}><Textfit mode="multi">{dish.name}</Textfit>$ {dish.price}</Button>
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

                <div className="col-lg-3 pull-right nova-card shopping-cart">
                    <center><b><h3>购物车</h3></b></center>
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
                                                <div className="col-lg-7">{value.name}</div>
                                                <div className="col-lg-1"></div>
                                                <div className="col-lg-1">{value.num}</div>
                                                <div className="col-lg-2"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                                            </div>
                                              : null}
                                      </div>

                                  </div>
                              )})}
                        </div>
                        :
                        <div>
                          <div>
                            {this.state.tableModifiedDishes.map((value, key1) =>{
                                return (
                                    <div key={key1}>
                                        <div>
                                            {value!== 0 && value.type !== "麻辣香锅" && value.type !== "特色烤鱼"?
                                                <div className="row cust-margin5">
                                                    <div className="col-lg-7">{value.name} （当）</div>
                                                    <div className="col-lg-1"></div>
                                                    <div className="col-lg-1">{value.DishCount}</div>
                                                    <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删除</Button></div>
                                                </div>: null}
                                        </div>
                                    </div>)})
                            }
                            {this.props.location.state.tableDishes.map((value, key1) =>{
                                return (
                                    <div key={key1}>
                                      {console.log(this.props.location.state.tableDishes)}
                                        <div>
                                            {value!==0 && value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 0 ?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7">{value.name} （原）</div>
                                                  <div className="col-lg-1"></div>
                                                  <div className="col-lg-1">{value.DishCount}</div>
                                              </div>:null
                                            }

                                            {value!==0 && value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 1 ?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7 strikeThrough">{value.name}（原）</div>
                                                  <div className="col-lg-1 strikeThrough"></div>
                                                  <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                              </div>:null
                                            }
                                        </div>
                                    </div>
                                )})}
                                {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value.num > 0 && value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 0 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7">{value.name}（再）</div>
                                                        <div className="col-lg-1"></div>
                                                        <div className="col-lg-1">{value.num}</div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}
                                {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                { value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 1 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                        <div className="col-lg-1 strikeThrough"></div>
                                                        <div className="col-lg-1 cust-p-color strikeThrough"><p>{value.num}</p></div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}
                          </div>
                          {this.checkFishDishesLater() !== 0 ?
                            <div className="FishBorder">
                              <h4><b>特色烤鱼菜品列表：</b></h4>
                                {this.checkFishExistLater() === 0 ?
                                <h4 className="cust-text1" >未选择烤鱼口味！</h4>
                                :null}
                                {this.state.tableModifiedDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!== 0 && value.type !== "麻辣香锅" && value.type === "特色烤鱼"?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7">{value.name} （当 特色烤鱼）</div>
                                                        <div className="col-lg-1"></div>
                                                        <div className="col-lg-1">{value.DishCount}</div>
                                                        <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删除</Button></div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}
                              {this.props.location.state.tableDishes.map((value, key1) =>{
                                  return (
                                      <div key={key1}>
                                        {console.log(this.props.location.state.tableDishes)}
                                          <div>

                                            { value.type === "特色烤鱼" && value.deleted === 0 ?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7">{value.name} （原）</div>
                                                  <div className="col-lg-1"></div>
                                                  <div className="col-lg-1">{value.DishCount}</div>
                                              </div>:null
                                            }
                                            { value.type === "特色烤鱼" && value.deleted === 1 ?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7 strikeThrough">{value.name}（原）</div>
                                                  <div className="col-lg-1 strikeThrough"></div>
                                                  <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                              </div>:null
                                            }
                                          </div>
                                      </div>
                                  )})}

                                  {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                { value.type === "特色烤鱼" && value.deleted === 0 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7">{value.name}（再121）</div>
                                                        <div className="col-lg-1"></div>
                                                        <div className="col-lg-1">{value.num}</div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}
                                  {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                { value.type === "特色烤鱼" && value.deleted === 1 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                        <div className="col-lg-1 strikeThrough"></div>
                                                        <div className="col-lg-1 strikeThrough">{value.num}</div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}
                            </div>
                          :null}





                          {this.SDHPNumberCalculatorLater() > 0 && this.SDHPNumberCalculatorLater() < 5  ?
                            <div>
                              <div className="sdhpBorder">
                                <h4 className="cust-text1" >少于5份麻辣香锅菜品数量!</h4>
                                <h4><b>麻辣香锅菜品列表：({this.SDHPNumberCalculatorLater()})</b></h4>
                                  {this.state.tableModifiedDishes.map((value, key1) =>{
                                      return (
                                          <div key={key1}>
                                              <div>
                                                  {value!== 0 && value.type === "麻辣香锅" ?
                                                      <div className="row cust-margin5">
                                                          <div className="col-lg-7">{value.name}</div>
                                                          <div className="col-lg-1"></div>
                                                          <div className="col-lg-1">{value.DishCount}</div>
                                                          <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删</Button></div>
                                                      </div>: null}
                                              </div>
                                          </div>
                                      )})}
                                {this.props.location.state.tableDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0 && value.type === "麻辣香锅" && value.deleted === 0 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7">{value.name}</div>
                                                        <div className="col-lg-1"></div>
                                                        <div className="col-lg-1">{value.DishCount}</div>
                                                    </div>:null
                                                }
                                                {value!==0 && value.type === "麻辣香锅" && value.deleted === 1 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                        <div className="col-lg-1 strikeThrough"></div>
                                                        <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                                    </div>:null
                                                }
                                            </div>
                                        </div>
                                    )})}

                                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                            return (
                                                <div key={key1}>
                                                    <div>
                                                        {value.num > 0 && value.type === "麻辣香锅"?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-7">{value.name}</div>
                                                                <div className="col-lg-1"></div>
                                                                <div className="col-lg-1">{value.num}</div>
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
                                                                <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                                <div className="col-lg-1 strikeThrough"></div>
                                                                <div className="col-lg-1 cust-p-color strikeThrough">{value.num}</div>
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
                                <h4><b>麻辣香锅菜品列表：({this.SDHPNumberCalculatorLater()})</b></h4>
                                  {this.state.tableModifiedDishes.map((value, key1) =>{
                                      return (
                                          <div key={key1}>
                                              <div>
                                                  {value!== 0 && value.type === "麻辣香锅" ?
                                                      <div className="row cust-margin5">
                                                          <div className="col-lg-7">{value.name}(现添加)</div>
                                                          <div className="col-lg-1"></div>
                                                          <div className="col-lg-1">{value.DishCount}</div>
                                                          <div className="col-lg-1"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteModifiedDish(value.name)}}>删除</Button></div>
                                                      </div>: null}
                                              </div>
                                          </div>
                                      )})}

                                {this.props.location.state.tableDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0 && value.type === "麻辣香锅" && value.deleted === 0 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7">{value.name}</div>
                                                        <div className="col-lg-1"></div>
                                                        <div className="col-lg-1">{value.DishCount}</div>
                                                    </div>:null
                                                }

                                                {value!==0 && value.type === "麻辣香锅" && value.deleted === 1 ?
                                                    <div className="row cust-margin5">
                                                        <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                        <div className="col-lg-1 strikeThrough"></div>
                                                        <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                                    </div>:null
                                                }
                                            </div>

                                        </div>
                                    )})}

                                        {this.props.location.state.tableModifiedDishes.map((value, key1) =>{
                                            return (
                                                <div key={key1}>
                                                    <div>
                                                        {
                                                          value.num > 0 && value.type === "麻辣香锅" && value.deleted === 0 ?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-7">{value.name}</div>
                                                                <div className="col-lg-1"></div>
                                                                <div className="col-lg-1">{value.num}</div>
                                                            </div>:
                                                            null
                                                        }

                                                        {
                                                          value.num < 0 && value.type === "麻辣香锅" && value.deleted === 1 ?
                                                            <div className="row cust-margin5">
                                                                <div className="col-lg-7 strikeThrough">{value.name}</div>
                                                                <div className="col-lg-1 strikeThrough"></div>
                                                                <div className="col-lg-1 strikeThrough">{value.num}</div>
                                                            </div>:
                                                            null
                                                        }
                                                    </div>
                                                </div>
                                            )})}

                              </div>
                            </div>
                            :null
                          }
                        </div>
                      }
                    </div>

                    <div className="sdhpBorder">
                      {this.state.SDHPorder.length !== 0 ?
                      <h4><b>麻辣香锅菜品列表：({this.SDHPNumberCalculatorInitiat()})</b></h4>
                      :
                      null}

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
                                              <div className="col-lg-1"></div>
                                              <div className="col-lg-1">{value.num}</div>
                                              <div className="col-lg-2"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteSDHPDish(value.name)}}>删除</Button></div>
                                          </div>: null}
                                  </div>

                              </div>
                          )})}
                    </div>

                    {this.state.Fishorder.length !== 0 ?
                      <div className="FishBorder">
                        <div>
                          <h4><b>特色烤鱼菜品列表：</b></h4>
                          {this.checkFishExist() === 0 ?
                            <h4 className="cust-text1" >未选择烤鱼口味！</h4>
                            :null
                          }

                          {this.state.Fishorder.map((value, key1) =>{
                              return (
                                  <div key={key1}>
                                        {console.log(value.subtype)}
                                        {console.log(value)}
                                          {value.subtype === "烤鱼" ?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7">{value.name}</div>
                                                  <div className="col-lg-1"></div>
                                                  <div className="col-lg-1">{value.num}</div>
                                                  <div className="col-lg-2"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteFishDish(value.name)}}>删除</Button></div>
                                              </div>
                                              : null
                                          }
                                  </div>
                              )})}
                        </div>
                        <div>
                          {this.state.Fishorder.map((value, key1) =>{
                              return (
                                  <div key={key1}>
                                        {console.log(value.subtype)}
                                        {console.log(value)}
                                          {value.subtype !== "烤鱼" ?
                                              <div className="row cust-margin5">
                                                  <div className="col-lg-7">{value.name}</div>
                                                  <div className="col-lg-1"></div>
                                                  <div className="col-lg-1">{value.num}</div>
                                                  <div className="col-lg-2"><Button className="" bsSize="xsmall" bsStyle="danger" onClick={()=>{this.deleteFishDish(value.name)}}>删除</Button></div>
                                              </div>
                                              : null
                                          }
                                  </div>
                              )})}
                        </div>
                      </div>
                    :null
                   }

                    <div>
                        <div className="row nova-margin">

                            <div className="col-lg-5">总价:</div>


                            <div className="col-lg-6">
                              {this.props.location.hasOwnProperty("state") !== true ?
                                <div>
                                  {this.SumUp() + "  " + "$AUD"}
                                </div>:
                                <div>
                                  {this.SumUpEntirePrice() + "  " + "$AUD"}
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
                        <div>
                          {this.props.location.hasOwnProperty("state") === true ?
                            <div>
                              <div className="col-lg-4"/>
                              <div className="col-lg-5 padding">
                                <Button  bsStyle="success" disabled={this.activeOrDisabledModified()} onClick={()=>{this.updateModifiedDiesh()}}>确认加菜</Button>
                              </div>
                          </div>
                            :
                            <div className="row cust-margin8 padding">
                              <div className="col-lg-5 ">
                                <Link to={toBookingPage}><Button className="" bsStyle="warning" >预定桌位</Button></Link>
                              </div>
                              <div className="col-lg-5">
                                <Button className="" bsStyle="success" disabled={this.activeOrDisabled()} onClick={()=>{this.submitOrder()}}>提交订单</Button>
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
