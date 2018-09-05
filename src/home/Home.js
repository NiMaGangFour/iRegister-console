import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup } from 'react-bootstrap'
import Personal from '../personal/Personal'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: [],
            tableName: null,
            sample: [
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
        }
      }
    componentWillMount() {
    }

    componentDidMount() {
      this.getData();
    }

     getData =()=> {
        fetch(API.baseUri+API.getallTables)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            console.log(json)
            this.setState({tables: json})
        }).catch((error) => {
            console.log('error on .catch', error);
        });
    }

    handleClickAvailableTable = (tableid) => {
      // this.props.parentChild(tableid);
    }

    handleClickOccupiedTable = (tableid) => {
      // this.props.parentChildOccupied(tableid);
    }
    currentTime = () => {

    }

    render() {
      var date = new Date();
      var time = date.toLocaleTimeString();
      const newToAvia = {
          pathname: '/home/DeliverOrders/'+ "D1",
          param1: "D1"
      };
      const newToOrdered = {
          pathname: '/home/DeliverOrders/'+ "D2",
          param1: "D2"
      };
        return (
          <div className="row">
            <div className="col-sm-12 col-lg-2">
              <div className="join-us  cust-margin3 nova-padding nova-card cust-border">
                  <div>大堂</div>
                  <hr />
                  <div className="row nova-margin">
                      {this.state.tables.map((value, key1) =>{
                        var newToAvia = {
                          pathname: '/home/Dishes/'+ value.id,
                        };
                        var newToOrdered = {
                          pathname: '/home/CheckDishes/'+ value.id,
                          state: {
                            currentOrderID: value.currentOrderID,
                          }
                        };
                          return (
                              <div key={key1}>
                                  <div className="">
                                      {value.status!== "2" && value.status!== "3"?
                                          <div className="col-lg-4 nova-margin">
                                              <Link to={newToAvia} ><Button onClick={()=>{this.handleClickAvailableTable(value.id)}} bsStyle="success" > {value.name} </Button></Link>
                                          </div>:
                                          <div className="col-lg-4 nova-margin">
                                          {value.status !== "2"?
                                              <div className="">
                                              <Button className="" bsStyle="warning" > {value.name} </Button>
                                              </div>
                                          :
                                              <div className="">
                                                  <Link to={newToOrdered} ><Button onClick={()=>{this.handleClickOccupiedTable(value.id)}} bsStyle="danger" > {value.name} </Button></Link>
                                              </div>
                                          }
                                          </div>
                                      }
                                  </div>

                              </div>
                          )})}
                      </div>
                  <div className="nova-padding">
                      <li>Green: Empty</li>
                      <li>Red: Occupied</li>
                      <li>Yellow: Reserved</li>
                  </div>
              </div>

              <Personal />
            </div>
            <div className="col-sm-12 col-lg-10 pull-right nova-card cust-border cust-margin2 ">
              <div className="center" >
                  <img src="/static/img/logo.png" />
              </div>
            <div className="center">
              <div><h1>蜀味源餐饮系统</h1><h5>Version 1.1</h5></div>

              <h2>当前时间：<Clock format={'h:mm:ss A'} timezone={'Australia/Sydney'} ticking={true}/></h2>
              <Clock format={'dddd, MMMM Mo, YYYY'} timezone={'Australia/Sydney'}/>
            </div>

          </div>
          </div>
        )
    }
}
