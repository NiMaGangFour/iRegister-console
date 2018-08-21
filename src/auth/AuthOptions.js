import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';
import {API} from '../config';

export default class AuthOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: [],
            tableName: null
        }}
    componentWillMount() {
      // this.setState({
      //   tables:getData()
      // })
      // console.log(getData())
    }

    componentDidMount() {
      this.getData();
    }
     getData =()=> {
        // console.log(API.baseUri+API.getallTables)
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

    render() {
        return (
            <div className="join-us  nova-margin nova-padding nova-card cust-border">
                <div>大堂</div>
                {/*<i className="fas fa-qrcode fa-8x"></i>*/}
                <hr />
                <div className="row nova-margin">
                    {/*<div className="col-lg-4"><Link to={newToAvia} ><Button className="" bsStyle="success" > T1 </Button></Link>*/}

                    {/*</div>*/}
                    {/*<div className="col-lg-4"><Link to={newToOrdered} ><Button className="" bsStyle="danger" > T2 </Button></Link></div>*/}
                    {/*<div className="col-lg-4"><Button className="" bsStyle="warning" onClick={()=>{console.log("asdf")}}>T3</Button></div>*/}


                    {this.state.tables.map((value, key1) =>{
                      var newToAvia = {
                        pathname: '/home/Dishes/'+ value.id,
                      };
                      var newToOrdered = {
                        pathname: '/home/CheckDishes/'+ value.name,
                      };
                        return (
                            <div key={key1}>
                                <div className="">
                                    {value.status!== "Occupied" && value.status!== "Booked"?
                                        <div className="col-lg-4 nova-margin">
                                            <Link to={newToAvia} ><Button className="" bsStyle="success" > {value.name} </Button></Link>
                                        </div>:
                                        <div className="col-lg-4 nova-margin">
                                        {value.status !== "Occupied"?
                                            <div className="">
                                            <Button className="" bsStyle="warning" > {value.name} </Button>
                                            </div>
                                        :
                                            <div className="">
                                                <Link to={newToOrdered} ><Button className="" bsStyle="danger" > {value.name} </Button></Link>
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

                {/*<li><Link to='/auth/email'> <i className="fas fa-at"></i> 邮箱注册</Link></li>*/}
                {/*<li><Link to='/auth/google'><i className="fab fa-google-plus-g"></i> Google登陆</Link></li>*/}
                {/*<li><Link to='/'><i className="fab fa-facebook"></i> Facebook登陆</Link></li>*/}
                {/*<li><Link to='/'><i className="fab fa-weixin"></i> 微信登陆</Link></li>*/}
            </div>
        )
    }
}


// AuthOptions.defaultProps = {
//   var tableName = null;
// }
