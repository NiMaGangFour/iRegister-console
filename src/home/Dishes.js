import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';
import { Map } from 'immutable'
import { API } from '../config'

export default class Dishes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Dish: new Map({
                'A': 0,
                'B': 0,
                'C': 0,
                'D': 0,
                'E': 0,
            }),
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
            order: [],
            tableNum: null


    }}

   componentDidMount() {

       console.log(this.props)
}

    setOrder(POST) {
        // console.log(POST)

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




render() {
    // var x = this.props.match.params.tablenum;
    // this.setState({tableNum: x})
    return (
        <div>
            桌号: {this.props.match.params.tablenum}


        <div className="row">
            <div className="col-lg-9 cust-border nova-card" >
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="炒菜" className="nova-padding">

                        <ButtonToolbar>

                                {this.state.Menu.map((dish, i) =>{
                                    return (<Button bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}>{dish.name}</Button>)
                                })}


                        </ButtonToolbar>
                    </Tab>
                    <Tab eventKey={2} title="凉菜" className="nova-padding">
                        Tab 2 content
                    </Tab>
                    <Tab eventKey={3} title="汤" className="nova-padding">
                        Tab 3 content
                    </Tab>
                    <Tab eventKey={4} title="主食" className="nova-padding">
                        Tab 3 content
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
                        <Button className="" bsStyle="success" onClick={()=>{}}>提交订单</Button>
                    </div>
                </div>

            </div>

        </div>
        </div>
    )
}
}
