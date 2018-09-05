import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';
import { Map } from 'immutable'
import { API } from '../config'


export default class DeliverOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {

            order: [
                {
                    "name": "A",
                    "price": 10,
                    "num": 1,

                },
                {
                    "name": "B",
                    "price": 20,
                    "num": 2,

                },
                {
                    "name": "C",
                    "price": 30,
                    "num": 1,

                }
            ],
            delivery: {
                "address": "47 asdfas, asdf, asdf",
                "phone": "0411111111",
                "receiver": "Ming"
            }
            ,

            orderID: null


        }}



    componentDidMount() {
        console.log(this.props)
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

    addNum = (nameDish)=> {
        var temp_post = [];
        for(let index in this.state.order){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.order[index].name === nameDish){

                var temp_dish = this.state.order[index];
                temp_dish.num = temp_dish.num +1;
                temp_post.push(temp_dish)
            }
            else {
                temp_post.push(this.state.order[index])
            }
        }this.setState({
            order:temp_post
        })
    }

    minusNum = (nameDish)=> {
        var temp_post = [];
        for(let index in this.state.order){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.order[index].name === nameDish){
                if (this.state.order[index].num === 1){
                    this.deleteDish(nameDish);
                }
                else {
                    var temp_dish = this.state.order[index];
                    temp_dish.num = temp_dish.num -1;
                    temp_post.push(temp_dish)
                }

            }
            else {
                temp_post.push(this.state.order[index])
            }
        }this.setState({
            order:temp_post
        })
    }


    render() {
        return (
            <div>
                外卖订单号: {this.props.match.params.order}
                <div className="row">
                    <div className="col-lg-9 cust-border nova-card" >
                        {<div>
                            <div>
                                {this.state.order.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0?
                                                    <div className="row nova-margin">
                                                        <div className="col-lg-4">{value.name}</div>
                                                        <div className="col-lg-1">X</div>
                                                        <div className="col-lg-2 row">
                                                            <Button className="" bsStyle="danger" onClick={()=>{this.minusNum(value.name)}}>-</Button>
                                                            {value.num}
                                                            <Button className="" bsStyle="danger" onClick={()=>{this.addNum(value.name)}}>+</Button>
                                                        </div>

                                                        <div className="col-lg-2"><Button className="" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                                                    </div>: null}
                                            </div>

                                        </div>
                                    )})}
                            </div>

                        </div>}

                        <div>
                            <div className="row nova-margin">
                                <div className="col-lg-3">总价: </div>
                                <div className="col-lg-2">{this.SumUp()}</div>
                            </div>

                        </div>
                        <div>
                            <div className="row nova-margin">
                                <div className="col-lg-3">地址: </div>
                                <div className="col-lg-2">{this.state.delivery.address}</div>
                            </div>

                        </div>
                        <div>
                            <div className="row nova-margin">
                                <div className="col-lg-3">电话: </div>
                                <div className="col-lg-2">{this.state.delivery.phone}</div>
                            </div>

                        </div>
                        <div>
                            <div className="row nova-margin">
                                <div className="col-lg-3">收货人: </div>
                                <div className="col-lg-2">{this.state.delivery.receiver}</div>
                            </div>

                        </div>

                        <div className="row nova-margin">
                            <Button className="" bsStyle="success" onClick={()=>{}}>返回控制台</Button>
                            {/*<Link to={newToMenu} ><Button className="" bsStyle="success" onClick={()=>{}}>加菜</Button></Link>*/}
                            <Button className="" bsStyle="success" onClick={()=>{}}>结账&打印</Button>
                            <Button className="" bsStyle="danger" onClick={()=>{}}>厨房重新打印</Button>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
