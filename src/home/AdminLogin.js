import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import Personal from '../personal/Personal'
import AuthOptions from '../auth/AuthOptions'

export default class AdminLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueAccount: '',
            valuePassword: '',
            tableName: null,
            passwordFieldType: "Password"
        }
      }
    componentWillMount() {
    }

    componentDidMount() {

    }

    getValidationState = () => {
    const length = this.state.valueAccount.length;
    if (length >= 5) return 'success';
    else if (length > 0 ) return 'warning';

    return null;
  }

  handleChangeAccount = (e) => {
    this.setState({ valueAccount: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ valuePassword: e.target.value });
  }

  verifyPasswordFieldType = () => {

    if (this.state.passwordFieldType === "Password"){
      this.setState({
        passwordFieldType: "text"
      })
    } else {
      this.setState({
        passwordFieldType: "Password"
      })
    }
  }

  toTerminalPage = () => {
    window.location = '/'
  }

  toAdminPage = () => {
    window.location = '/home/AdminMainPage/'
  }

    render() {

        return (
          <div className="row">
            <div className="col-sm-12 col-lg-12 nova-card cust-border cust-margin13 ">



              <div className="cust-adminLogin">
                <form>
                  <FormGroup
                     controlId="formBasicText"
                     validationState={this.getValidationState()}
                   >
                   <ControlLabel>Administrator账号：</ControlLabel>
                   <FormControl
                     type="text"
                     value={this.state.valueAccount}
                     placeholder="请填写Admin账号"
                     onChange={this.handleChangeAccount}
                   />
                 </FormGroup>
                </form>
                <form>
                   <FormGroup
                      validationState={this.getValidationState()}
                    >
                    <ControlLabel>密码：</ControlLabel>
                    <FormControl
                      type={this.state.passwordFieldType}
                      value={this.state.valuePassword}
                      placeholder="请填写Admin密码"
                      onChange={this.handleChangePassword}
                    />
                    <input type="checkbox" onClick={() => {this.verifyPasswordFieldType()}}/>  Show Password
                    </FormGroup>
                  </form>
              <div className="col-lg-3 ">
              <Button className="div-login-admin" bsSize="large" bsStyle="warning" onClick={()=>{this.toTerminalPage()}}>返回控制台</Button>
              <Button className="div-login-admin" bsSize="large" bsStyle="danger" onClick={()=>{this.toAdminPage()}}>登陆</Button>
              </div>
            </div>


          </div>
        </div>
        )
    }
}
