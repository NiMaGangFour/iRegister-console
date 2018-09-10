import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import { Button, Tabs, Tab, ButtonGroup, ListGroupItem, ListGroup } from 'react-bootstrap'
import { API } from '../config'


export default class Personal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          getDeliveryOrders:[],
            order: [
                {
                    "id": "123",
                    "price": 10,
                    "num": 1
                },
                {
                    "id": "124",
                    "price": 20,
                    "num": 2
                },
                {
                    "id": "125",
                    "price": 30,
                    "num": 1
                }
            ],
        }
    }


   componentDidMount() {
        this.getData()
        // this.getInitialState()
   }

   getData() {
       //console.log(API.baseUri+API.getAllDishes)
       fetch(API.baseUri+API.getDeliveryOrders)
           .then((response) => {
               if (response.status === 200) {
                   return response.json()
               } else console.log("Get data error ");
           }).then((json) =>{
           console.log(json)
           this.setState({getDeliveryOrders: json})
       }).catch((error) => {
           console.log('error on .catch', error);
       });
   }

    render() {
      // console.log(this.state.getDeliveryOrders)
      const newToAvia = {
          pathname: '/home/DeliverOrders/'+ "D1",
          param1: "D1"
      };
      const newToOrdered = {
          pathname: '/home/DeliverOrders/'+ "D2",
          param1: "D2"
      };
      return (

          <div className="profile  cust-margin3 nova-padding nova-card cust-border">
              外卖
              <hr />
              <div>
                  <ListGroup>
                    {this.state.getDeliveryOrders.map((dish, i) =>{
                        return (
                          <div key={i}>
                              <ListGroupItem  header={dish.id} onClick={() => {}}>{dish.creatTime}</ListGroupItem>
                          </div>
                        )
                    })}
                  </ListGroup>
              </div>
          </div>
      )
    }
}
