import React, { Component } from 'react'
import { Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API } from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'

export default class Dishes extends Component {
    constructor(props) {
        super(props);
        this.authOptions = React.createRef();
        this.state = {
          childValue:'',
          order: [],
          alldishes: [],
          tableNum: null,
          sumTotal: 0,
          tableModifiedDishes:[],
          textareaValue: ""
        }
  }

    cancleBookTable = () => {
      fetch(API.baseUri+API.CancleBookTable + "/" + this.props.match.params.tableid)
          .then((response) => {
              if (response.status === 200) {
                  return response.json()
              } else console.log("Get data error ");
          }).then((json) =>{
          console.log(json)
          window.location = '/'
      }).catch((error) => {
          console.log('error on .catch', error);
      });
    }

render() {

  // console.log(this.props.location)
  // console.log(Object.keys(this.props.location).length)
  var toHomePage = {
    pathname: '/',
  };

    return (
      <div>
        <div className="row">
          <div className="col-sm-12 col-lg-2">

            <AuthOptions
              ref={this.authOptions}
              parentChild={this.parentChild} />
            <Personal />

            <div className="site-info cust-margin3 nova-padding nova-card cust-border">
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
              <div className="col-lg-9 cust-border nova-card">
                <div  >
                    <h1>{this.props.match.params.tableid}号桌已被预定</h1>
                </div>
                <div>
                  <Button className="button2" bsStyle="danger" onClick={()=>{this.cancleBookTable()}}>取消预订</Button>
                  <Link to={toHomePage} ><Button className="button2" bsStyle="warning" onClick={()=>{}}>返回控制台</Button></Link>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
}
}
