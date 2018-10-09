import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap'
import { Map } from 'immutable'
import { API } from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          childValue: null,
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
            ]

        }}



    componentDidMount() {
      // this.getData();
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

    parentChildOccupied = (value) => {
      this.setState({
        childValue:value
      })
      console.log(value);
    }

    render() {
        const newToMenu = {
            // pathname: '/home/Dishes/'+ this.state.tableNum,
            pathname: '/',

        };
        return (
            <div>
              <div className="row">
                <div className="col-sm-12 col-lg-2">

                  <AuthOptions parentChildOccupied={this.parentChildOccupied} />
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
                     空白页面
              </div>
            </div>
          </div>
        )
    }
}
