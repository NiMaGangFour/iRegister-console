import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap'
import {API} from '../config'


export default class AuthOptions extends Component {
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

    sendName =(name)=> {
        var temp_name = name;
        this.state.props.tableName = name;

        this.setState({tableName: temp_name});

        console.log(this.state.props.tableName);
    }
    handleClickAvailableTable = (tableid) => {
      // this.props.parentChild(tableid);
    }

    handleClickOccupiedTable = () => {
      // this.props.parentChildOccupied();
    }


    render() {
        return (
            <div className="join-us  cust-margin3 nova-padding nova-card cust-border">
                <div>大堂</div>
                <hr />
                <div className="row nova-margin">
                  {console.log(this.state.tables)}

                    {this.state.tables.map((value, key1) =>{
                      var newToAvia = {
                        pathname: '/home/Dishes/'+ value.id,
                      };
                      // console.log(value.id)
                      var newToOrdered = {
                        pathname: '/home/CheckDishes/'+ value.id,

                        state: {
                          currentOrderID: value.currentOrderID,
                        }
                        // pathname: '/home/CheckDishes/',
                      };
                        return (
                            <div key={key1}>
                                <div className="">
                                    {value.status!== "2" && value.status!== "3" ?
                                        <div className="col-lg-4 nova-margin">
                                            <Link to={newToAvia} ><Button onClick={()=>{this.handleClickAvailableTable(value.id)}} bsStyle="success" > {value.name} </Button></Link>
                                        </div>:
                                        <div className="col-lg-4 nova-margin">
                                        {value.status !== "2" ?
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
        )
    }
}
