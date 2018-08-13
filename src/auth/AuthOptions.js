import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap';




export default class AuthOptions extends Component {



    render() {

        const newToAvia = {
            pathname: '/home/Dishes/'+ "T1",
            param1: "T1"
        };
        const newToOrdered = {
            pathname: '/home/CheckDishes/'+ "T2",
            param1: "T2"
        };
        return (
            <div className="join-us  nova-margin nova-padding nova-card cust-border">
                <div>大堂</div>
                {/*<i className="fas fa-qrcode fa-8x"></i>*/}
                <hr />
                <div className="row">
                    <div className="col-lg-4"><Link to={newToAvia} ><Button className="" bsStyle="success" > T1 </Button></Link>

                    </div>
                    <div className="col-lg-4"><Link to={newToOrdered} ><Button className="" bsStyle="danger" > T2 </Button></Link></div>
                    <div className="col-lg-4"><Button className="" bsStyle="warning" onClick={()=>{console.log("asdf")}}>T3</Button></div>


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
