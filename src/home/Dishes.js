import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';
import { Map } from 'immutable';
import { API } from '../config';
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'

export default class Dishes extends Component {
    constructor(props) {
        super(props);
        this.authOptions = React.createRef();
        this.state = {
          childValue:'',
          order: [],
          alldishes: [],
          tableNum: null,
          sumTotal: 0
    }

    // this.submitOrder = this.submitOrder.bind(this);
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
            // console.log(json)
            this.setState({alldishes: json})
        }).catch((error) => {
            console.log('error on .catch', error);
        });
    }

    setOrder(POST) {
        // console.log(POST)
        if (this.state.order.length == 0) {
            var newD = {
                "name": POST.name,
                "price": POST.price,
                "DishID": POST.dishId,
                "num": 1
            }
            let tempOrder = this.state.order
                tempOrder.push(newD)
            console.log(tempOrder)
            this.setState({order: tempOrder})
            return;
        }
        else {
            for (let i = 0; i < this.state.order.length; i++) {
                if (this.state.order[i].name === POST.name) {
                    let tempOrder = this.state.order
                    tempOrder[i].num = this.state.order[i].num + 1

                    this.setState({order: tempOrder})
                    console.log(this.state.order)
                    return;
                }
                else if (i == this.state.order.length-1 && this.state.order[i].name !== POST.name){
                    var newD = {
                        "name": POST.name,
                        "price": POST.price,
                        "DishID": POST.dishId,
                        "num": 1
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
        console.log(this.state.order)
    }

    SumUp= ()=> {
        var total = this.state.order.reduce((sum, price) =>{
            return sum + price.num * price.price
        }, 0)
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

    submitOrder = () => {
      var date = new Date();
      var time = date.toLocaleTimeString();
      console.log(JSON.stringify(this.state.order))

      fetch(API.baseUri+API.postOrder, {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "items": this.state.order,
                "creatTime": time,
                "totalPrice": this.SumUp(),
                "tableID": this.props.match.params.tableid
            })
      } ).then(res =>{
          if(res.status===200) {
            // console.log(res.json())
            return res.json();
          }
          else console.log(res)
      }).then(json => {
        console.log(json.success)
        if (json.success === true){
          this.authOptions.current.getData();
          this.setState({
            order:[]
          })
          window.location = '/'
        }
      })
    }

    parentChild = (value) => {
      this.setState({
        childValue:value
      })
      console.log(value);
    }

render() {
  console.log(this.props);
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 col-lg-2">

            <AuthOptions
              ref={this.authOptions}
              parentChild={this.parentChild} />
            <Personal />

            <div className="site-info   nova-margin nova-padding nova-card cust-border">
                <ul>
                    <li>Nova Software </li>
                    <li>Canberra House</li>
                    <li>+61 4 52542687</li>
                    <li>info@novasoftware.com.au</li>
                </ul>
            </div>

          </div>

          <div className="col-sm-12 col-lg-10 pull-right">
                桌号: {this.props.match.params.tableid}

            <div className="row">
                <div className="col-lg-9 cust-border nova-card" >
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="小吃" className="nova-padding">
                            <ButtonToolbar>
                                {this.state.alldishes.map((dish, i) =>{
                                    return (
                                      <div key={i}>
                                        {dish.type === "小吃" ?
                                          <Button className=" cust-margin" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}>{dish.name}<br/>$ {dish.price}</Button>
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
                        <Tab eventKey={4} title="主食" className="nova-padding">
                          <ButtonToolbar>
                              {this.state.alldishes.map((dish, i) =>{
                                  return (
                                    <div key={i}>
                                      {dish.type === "主食" ?
                                        <Button className=" cust-margin" bsSize="large" bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}>{dish.name}</Button>
                                      :null}
                                    </div>
                                  )
                              })}
                          </ButtonToolbar>
                        </Tab>
                    </Tabs>
                </div>
                <div className="col-lg-3 pull-right cust-border nova-card">
                    购物车
                    <div>
                        {<div>
                            <div>
                                {this.state.order.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0?
                                                    <div className="row nova-margin">
                                                        <div className="col-lg-6">{value.name}</div>
                                                        <div className="col-lg-1">X</div>
                                                        <div className="col-lg-1">{value.num}</div>
                                                        <div className="col-lg-2"><Button className="" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                                                    </div>: null}
                                            </div>

                                        </div>
                                    )})}
                            </div>

                        </div>}
                        {/*{this.state.Dish.get('A')}*/}
                    </div>
                    <div>
                        <div className="row nova-margin">
                            <div className="col-lg-3">总价: </div>
                            <div className="col-lg-2">{this.SumUp()}</div>
                        </div>
                        <div className="row nova-margin">


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
