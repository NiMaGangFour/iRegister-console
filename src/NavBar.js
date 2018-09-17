import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Nav, Navbar, NavItem, MenuItem, SplitButton, DropdownButton}  from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import Clock from 'react-live-clock'

export default class NavBar extends Component{
    ToAdminLogin = () => {
      window.location = '/home/AdminLogin/'
    }
    render(){
      var ToAdminLogin = {
        pathname: '/home/AdminLogin/'
      }
        return(
            <nav className=" navbar-default">
                <div className="container-fluid">
                    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                    <div className="">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">蜀味源</Link>
                        </div>

                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">控制台</a></li>
                                <li><Link to="/tieba">当前订单</Link></li>
                                <li className=""><a href="#">已点订单</a></li>
                                {/* <li><a href="#">乱七八糟</a></li> */}
                            </ul>
                            <form className="navbar-form navbar-left">
                                {/*<div className="input-group">*/}
                                    {/*<input type="text" className="form-control" placeholder="搜索您的问题..." />*/}
                                    {/*<div className="input-group-btn">*/}
                                        {/*<button className="btn btn-default btn-nova" type="button">&nbsp;&nbsp;<i className="fas fa-search"></i>&nbsp;&nbsp;</button>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            </form>
                            <ul className="nav navbar-nav navbar-right">
                                <li ><i className="fas fa-clock fa-1x message"><span className=""><Clock format={'h:mm:ss A'} timezone={'Australia/Sydney'} ticking={true}/></span></i></li>
                                <li><a href="#">
                                    <div className="user_logo_nav">
                                        <img src="/static/img/user-icon.png" />

                                    </div>
                                </a></li>
                                <DropdownButton
                                  className="fas fa-list-alt fa-1x message "
                                  title=""
                                  key=""
                                  id=""
                                >
                                  <MenuItem eventKey="1">功能1</MenuItem>
                                  <MenuItem eventKey="2">功能2</MenuItem>
                                  <MenuItem onClick={()=>{this.ToAdminLogin()}} eventKey="3">ADMIN界面</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey="4">注销用户</MenuItem>
                                </DropdownButton>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- /.navbar-collapse --> */}
                </div>
                {/* <!-- /.container-fluid --> */}
            </nav>

        )
    }
}
