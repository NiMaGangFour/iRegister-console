import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';
import { Map } from 'immutable'
import { API } from '../config'


export default class CheckDishesDishes extends Component {
    constructor(props) {
        super(props)
        this.state = {

            Menu: [{
                "id": 1,
                "name": "A",
                "price": 10,
                "ava": true
            },
                {
                    "id": 2,
                    "name": "B",
                    "price": 20,
                    "ava": true
                },
                {
                    "id": 3,
                    "name": "C",
                    "price": 30,
                    "ava": true
                }

            ],
            order: [
                {
                    "name": "A",
                    "price": 10,
                    "num": 1
                },
                {
                    "name": "B",
                    "price": 20,
                    "num": 2
                },
                {
                    "name": "C",
                    "price": 30,
                    "num": 1
                }
            ],
            tableNum: null


        }}



    componentDidMount() {
        var x = this.props.match.params.table;
        this.setState({tableNum: x})
        console.log(this.props)


    }

    setOrder(POST) {


        if (this.state.order.length == 0) {
            var newD = {
                "name": POST.name,
                "price": POST.price,
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
                        "num": 1
                    }
                    let tempOrder = this.state.order
                    tempOrder.push(newD)
                    console.log(tempOrder)
                    this.setState({order: tempOrder})
                    console.log(this.state.order)
                    return;
                }


            }


        }
        console.log(this.state.order)




        //console.log(this.state.OrderedDish.get('A'));
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
        const newToMenu = {
            pathname: '/home/Dishes/'+ this.state.tableNum,
            param1: this.state.tableNum
        };
        return (

            <div>
                桌号: {this.state.tableNum}
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

                    <div className="row nova-margin">
                        <Button className="" bsStyle="success" onClick={()=>{}}>返回控制台</Button>
                        <Link to={newToMenu} ><Button className="" bsStyle="success" onClick={()=>{}}>加菜</Button></Link>
                        <Button className="" bsStyle="success" onClick={()=>{}}>结账&打印</Button>
                        <Button className="" bsStyle="danger" onClick={()=>{}}>厨房重新打印</Button>
                    </div>
                </div>


            </div>
            </div>
        )
    }
}
