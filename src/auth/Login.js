import React, { Component } from 'react'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {cyan300} from 'material-ui/styles/colors';
import './auth.css'
import {API} from "../config";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan300,
    },
    appBar: {
        height: 50,
    },
})

export default class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // postid:'',
            email: '',
            password: '',
            status: 'normal',
            Emailerror: '',
            PWerror: '',
            mode1: false,
            open: false
        }
    }

    componentWillMount() {
        this.getToken()
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        var user = localStorage.getItem('SHUWEIYUAN');
        var uu = JSON.parse(user);
        console.log(JSON.parse(user));
        if (JSON.parse(user) === null) {
          console.log("需要验证")
        }
        else {
          window.location = '/Home'
        }
    }

    handleEmail = (email) => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if ( re.test(email) ) {
          // this is a valid email address
          return true
      }
      else {
          // invalid email.
          return false
      }
  }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
        if (this.state.email){
            this.setState({
                Emailerror: ''
            })
        }

    }
    handleUserPWChange = (event) => {
        this.setState({
            password: event.target.value
        })
        if (this.state.password){
            this.setState({
                PWerror: ''
            })
        }
    }



    //Submit 点击  登陆
    handleSubmit=()=> {
        console.log(this.state.email);
        console.log(this.state.password);

        if (!this.state.email){
            this.setState({
                //status: 'failed',
                Emailerror: 'Username is required'
            })
        }
        // else if (!this.handleEmail(this.state.email)){
        //     this.setState({
        //         //status: 'failed',
        //         Emailerror: 'It is not an Email'
        //     })
        // }
        else if(!this.state.password){
            this.setState({
                Emailerror: '',
                PWerror: 'Password is required'
            })
        }
        else {
            this.setState({
                status: 'normal',
                PWerror: '',
                mode1: true
            })
            var url = API.baseUri + API.login;
            fetch(url, {
                //credentials: 'include',
                method: "POST",
                headers: {
                    //     'Content-Type':'multipart/form-data',
                    //     'Content-Type':'application/x-www-form-urlencoded',
                    //     'Content-Disposition': 'form-data',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    // this.state.UserID,
                    "name": this.state.email,
                    "password": this.state.password,
                })
            }).then(res => {
                    if (res.status === 200) {
                        this.setState({status: 'success'})
                        return res.json()
                    } else {
                        this.setState({
                            status: 'failed',
                            mode1: false})
                    }
                }
            ).then(json => {
                //console.log(json.email)
                if (this.state.status === "success") {
                    localStorage.setItem('SHUWEIYUAN', JSON.stringify(json))
                    window.location = '/Home';
                }
                else {
                    this.setState({
                        open: true,
                        email: '',
                        password: '',
                    })
                }
            }).catch(error => {
                console.error(error)
            })
        }
    }


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div className="nova-card nova-padding">
                <MuiThemeProvider theme={muiTheme}>
                    <div className="col">
                        <AppBar
                            title="LOGIN"
                        />
                        <div className="row">
                            <div className="col-md-4"/>
                            <div className="col-md-4">
                                <TextField

                                    value={this.state.email}
                                    hintText="Enter your username"
                                    floatingLabelText="Username"
                                    onChange = {this.handleEmailChange}
                                    errorText= {this.state.Emailerror}
                                />
                            </div>
                            <div className="col-md-4"/>
                        </div>

                        <div className="row">
                            <div className="col-md-4"/>
                            <div className="col-md-4">
                                <TextField

                                    type="password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    value={this.state.password}
                                    onChange = {this.handleUserPWChange}
                                    errorText= {this.state.PWerror}
                                />
                            </div>
                            <div className="col-md-4"/>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-5"/>
                            <div className="col-md-2">
                                <RaisedButton label="登陆" primary={true} onClick={() => this.handleSubmit()}/>
                            </div>
                            <div className="col-md-3">
                                {this.state.mode1 ? <CircularProgress/> :<div/> }

                            </div>

                        </div>
                        <div>
                            <Dialog
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                            >
                                Incorrect email or password, please try again.
                            </Dialog>
                        </div>
                        <br/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }




}
