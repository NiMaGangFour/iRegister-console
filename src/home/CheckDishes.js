import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap'
import { Map } from 'immutable'
import { API } from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'


export default class CheckDishesDishes extends Component {
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
            ],
            tableDishes:[],
            thispropsmatchparamstableid:null

        }}

    // componentWillMount(){
    //   this.setState({
    //     thispropsmatchparamstableid:this.props.match.params.tableid
    //   })
    //   console.log(this.props.match.params.tableid);
    // }

    componentDidMount() {
      this.getData();
      // console.log(this.props)
    }

    componentWillReceiveProps(){
      this.getData();
    }

    getData =()=> {
      // let key = "/home/CheckDishes/"+ this.props.match.params.tableid;
        // window.location.reload(true);
       fetch(API.baseUri+API.getTableDishes + "/" + this.props.match.params.tableid)
           .then((response) => {
               if (response.status === 200) {
                   return response.json()
               } else console.log("Get data error ");
           }).then((json) =>{
           console.log(json)
           this.setState({tableDishes: json})
       }).catch((error) => {
           console.log('error on .catch', error);
       });

   }

    SumUp= ()=> {
        var total = this.state.tableDishes.reduce((sum, price) =>{
            return sum + price.DishCount * price.price
        }, 0)
        return total;
    }

    deleteDish = (nameDish)=> {
        console.log(nameDish)
        var temp_post = [];
        for(let index in this.state.tableDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableDishes[index].name !== nameDish){
                temp_post.push(this.state.tableDishes[index])
            }
        }this.setState({
            tableDishes:temp_post
        })
    }

    addNum = (nameDish)=> {
        var temp_post = [];
        for(let index in this.state.tableDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableDishes[index].name === nameDish){
                var temp_dish = this.state.tableDishes[index];
                temp_dish.DishCount = temp_dish.DishCount +1;
                temp_post.push(temp_dish)
            }
            else {
                temp_post.push(this.state.tableDishes[index])
            }
        }this.setState({
            tableDishes:temp_post
        })
    }

    minusNum = (nameDish)=> {
        var temp_post = [];
        for(let index in this.state.tableDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableDishes[index].name === nameDish){
                if (this.state.tableDishes[index].DishCount === 1){
                    this.deleteDish(nameDish);
                }
                else {
                    var temp_dish = this.state.tableDishes[index];
                    temp_dish.DishCount = temp_dish.DishCount -1;
                    temp_post.push(temp_dish)
                }

            }
            else {
                temp_post.push(this.state.tableDishes[index])
            }
        }this.setState({
            tableDishes:temp_post
        })
    }

    // parentChildOccupied = (value) => {
    //   this.setState({
    //     childValue:value
    //   })
    //   console.log(value);
    // }

    parentChildOccupied = () => {
      // this.getData();
    }

    render() {
        const newToMenu = {
            // pathname: '/home/Dishes/'+ this.state.tableNum,
            // pathname: '/',
            pathname: '/home/Dishes/'+ this.props.match.params.tableid,

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
                     桌号: {this.props.match.params.tableid}
                <div className="row">
                    <div className="col-lg-9 cust-border nova-card" >
                        {<div>
                            <div>
                                {this.state.tableDishes.map((value, key1) =>{

                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0?
                                                    <div className="row nova-margin">
                                                        <div className="col-lg-4">{value.name}</div>
                                                        <div className="col-lg-1">X</div>
                                                        <div className="col-lg-2 row">
                                                            <Button className="" bsStyle="danger" onClick={()=>{this.minusNum(value.name)}}>-</Button>
                                                            {value.DishCount}
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
            </div>
          </div>
        )
    }
}
