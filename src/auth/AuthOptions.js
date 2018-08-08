import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class AuthOptions extends Component {
    render() {
        return (
            <div className="join-us  nova-margin nova-padding nova-card cust-border">
                <div>大堂</div>
                {/*<i className="fas fa-qrcode fa-8x"></i>*/}
                <hr />
                <div className="row">
                    <div className="col-lg-4"><img src="/static/img/green.png" height="40"/>T1

                    </div>
                    <div className="col-lg-4"><img src="/static/img/red.png" height="40"/>T2</div>
                    <div className="col-lg-4"><img src="/static/img/yellowtable.jpg" height="40"/>T3</div>


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
