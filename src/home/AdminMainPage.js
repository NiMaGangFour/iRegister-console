import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import Clock from 'react-live-clock'
import { Button, Tabs, Tab, ButtonGroup, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Table } from 'react-bootstrap'
import Personal from '../personal/Personal'
import AuthOptions from '../auth/AuthOptions'
import { Textfit } from 'react-textfit'

export default class AdminMainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alldishes: []
        }
      }
    componentWillMount() {
    }

    componentDidMount() {
      this.getData()
    }

    getData() {
        //console.log(API.baseUri+API.getAllDishes)
        fetch(API.baseUri+API.getAllDishes)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            console.log(json)
            this.setState({alldishes: json})
        }).catch((error) => {
            console.log('error on .catch', error);
        });
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
    window.location = '/home/AdminMainPage/' + this.state.valueAccount
  }

    render() {

        return (
          <div className="row">
            <div className="col-sm-12 col-lg-12 nova-card cust-border cust-margin2 ">
              <div className="col-lg-12 cust-border nova-card" >
                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                      <Tab eventKey={1} title="小吃" className="nova-padding">
                        <Table striped bordered condensed hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Username</th>
                            </tr>
                          </thead>
                              {this.state.alldishes.map((dish, i) =>{
                                  return (
                                    <div key={i}>
                                      {dish.type === "小吃" ?
                                        <tbody>
                                          <tr>
                                            <td>dish.dishId</td>
                                            <td>dish.name</td>
                                            <td>dish.price</td>
                                            <td>dish.type</td>
                                          </tr>
                                        </tbody>
                                      :null}
                                    </div>
                                  )
                              })}
                          </Table>
                      </Tab>
                  </Tabs>
              </div>
          </div>
        </div>
        )
    }
}
