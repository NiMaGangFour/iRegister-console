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
            Ordered: [{
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
            order: []


    }}

    // //get 30 more posts
    // setOrder(POST){
    //     console.log(POST)
    //     if (this.state.Dish.get(POST) !== undefined)
    //     {
    //         var num = this.state.Dish.get(POST);
    //         var Local  = this.state.Dish.set(POST, num+1);
    //         this.setState({
    //             Dish: Local
    //         });
    //     }
    //
    //
    //     //console.log(this.state.OrderedDish.get('A'));
    // }

    //get 30 more posts
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
                //     if (this.state.order[i].name === POST.name){
                //     this.state.order[i].num = this.state.order[i].num+1
                //     console.log(this.state.order)
                //     return;
                // }
                // else {
                //     var newD={
                //         "name": POST.name,
                //         "price": POST.price,
                //         "num": 1
                //     }
                //     this.state.order.push(newD)
                //     console.log(this.state.order)
                //     return;
                // }

        }
        console.log(this.state.order)
            // var num = this.state.Dish.get(POST);
            // var Local  = this.state.Dish.set(POST, num+1);
            // this.setState({
            //     Dish: Local
            // });



        //console.log(this.state.OrderedDish.get('A'));
    }


render() {
    return (
        <div className="row">
            <div className="col-lg-9 cust-border nova-card" >
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="炒菜" className="nova-padding">

                        <ButtonToolbar>

                                {this.state.Ordered.map((dish, i) =>{
                                    return (<Button bsStyle="success" id = {dish.id} key={i} onClick={()=>{this.setOrder(dish)}}>{dish.name}</Button>)
                                })}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success" id="A" onClick={()=>{this.setOrder(document.getElementById("A").innerHTML)}}>A*/}

                            {/*</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success" id="B" onClick={()=>{this.setOrder(document.getElementById("B").innerHTML)}}>B</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success" id="C" onClick={()=>{this.setOrder(document.getElementById("C").innerHTML)}}>C</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success" id="D" onClick={()=>{this.setOrder(document.getElementById("D").innerHTML)}}>D</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success" id="E" onClick={()=>{this.setOrder(document.getElementById("E").innerHTML)}}>E</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success">Success</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success">Success</Button>*/}

                            {/*/!* Indicates a successful or positive action *!/*/}
                            {/*<Button bsStyle="success">Success</Button>*/}

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
                                                <div className="row">
                                                    <div className="col-lg-6">{value.name}</div>
                                                    <div className="col-lg-1">X</div>
                                                    <div className="col-lg-2">{value.num}</div>
                                                </div>: null}
                                        </div>

                                    </div>
                                )})}
                        </div>

                    </div>}
                    {/*{this.state.Dish.get('A')}*/}
                </div>
            </div>

        </div>
    )
}
}
