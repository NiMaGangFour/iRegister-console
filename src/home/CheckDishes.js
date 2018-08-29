import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs, Tab, ButtonToolbar } from 'react-bootstrap'
import { Map } from 'immutable'
import { API } from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'


export default class CheckDishesDishes extends Component {
    constructor(props) {
        super(props)
        this.authOptions = React.createRef();
        this.state = {
          childValue: null,
          tableDishes:[],
          thispropsmatchparamstableid:null,
          tableModifiedDishes:[],
          tableStatus: "Occupied"
        }}

    // componentWillMount(){
    //   this.setState({
    //     thispropsmatchparamstableid:this.props.match.params.tableid
    //   })
    //   console.log(this.props.match.params.tableid);
    // }

    componentDidMount() {
      this.getData();
      // console.log(this.props)
    }

    componentWillReceiveProps(){
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.tableid){
          this.props.match.params.tableid = nextProps.match.params.tableid
          this.getData();
        }
    }

    getData =()=> {
      // let key = "/home/CheckDishes/"+ this.props.match.params.tableid;
        // window.location.reload(true);
        console.log(this.props.match.params.tableid)
       fetch(API.baseUri+API.getTableDishes + "/" + this.props.match.params.tableid)
           .then((response) => {
               if (response.status === 200) {
                   return response.json()
               } else console.log("Get data error ");
           }).then((json) =>{
           console.log(json)
           this.setState({tableDishes: json})
           console.log(this.state.tableDishes[0].orderID)
       }).catch((error) => {
           console.log('error on .catch', error);
       });
   }

    SumUp= ()=> {
        var total = this.state.tableDishes.reduce((sum, price) =>{
            return sum + price.DishCount * price.price
        }, 0)
        return total;
    }

    deleteDish = (nameDish)=> {
        // console.log(nameDish)
        var temp_post = [];
        var temp_modified = {};
        for(let index in this.state.tableDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableDishes[index].name !== nameDish){
                temp_post.push(this.state.tableDishes[index])
            }
            else temp_modified = this.state.tableDishes[index]
        }
        // temp_modified.push(nameDish)
        this.setState({
            tableDishes:temp_post,
            // tableModifiedDishes:temp_modified
        })
        // console.log(temp_modified);
         this.updateModifiedDiesh(temp_modified);
    }

    updateModifiedDiesh = (temp_modified) => {
      // console.log(temp_modified);
      var temp_modifiedArray = [];
      var date = new Date();
      var time = date.toLocaleTimeString();
      temp_modified.createTime= time;

      temp_modifiedArray.push(temp_modified);
      console.log(temp_modifiedArray);

      fetch(API.baseUri+API.modDish, {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // [req.body.orderID, v[i].DishID, req.body.createTime, v[i].num]
        body: JSON.stringify({
                // "orderID": temp_modified[0].orderID,
                "items": temp_modifiedArray,
                // "createTime": time,
            })
      } ).then(res =>{
          if(res.status===200) {
            // console.log(res.json())
            return res.json();
          }
          else console.log(res)
      }).then(json => {
        // console.log(json)
        if (json.success === true){
          console.log(json.success)
          this.getModifiedData(temp_modifiedArray);
        }
        // console.log(this.state.tableModifiedDishes)
      })
      // console.log("updateModifiedDiesh");
    }

    getModifiedData =(temp_modifiedArray)=> {
      console.log(temp_modifiedArray[0].orderID)
       fetch(API.baseUri+API.getModDish + "/" + temp_modifiedArray[0].orderID)
           .then((response) => {
               if (response.status === 200) {
                   return response.json()
               } else console.log("Get data error ");
           }).then((json) =>{

           this.setState({tableModifiedDishes: json})
           console.log(this.state.tableModifiedDishes)
       }).catch((error) => {
           console.log('error on .catch', error);
       });
   }

    addNum = (nameDish)=> {
        var temp_post = [];
        for(let index in this.state.tableDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableDishes[index].name === nameDish){
                var temp_dish = this.state.tableDishes[index];
                temp_dish.DishCount = temp_dish.DishCount +1;
                temp_post.push(temp_dish)
            }
            else {
                temp_post.push(this.state.tableDishes[index])
            }
        }this.setState({
            tableDishes:temp_post
        })
    }

    minusNum = (nameDish)=> {
        var temp_post = [];
        for(let index in this.state.tableDishes){
            // console.log(this.state.myPosts[index].idPOST , idPost)
            if(this.state.tableDishes[index].name === nameDish){
                if (this.state.tableDishes[index].DishCount === 1){
                    this.deleteDish(nameDish);
                }
                else {
                    var temp_dish = this.state.tableDishes[index];
                    temp_dish.DishCount = temp_dish.DishCount -1;
                    temp_post.push(temp_dish)
                }
            }
            else {
                temp_post.push(this.state.tableDishes[index])
            }
        }this.setState({
            tableDishes:temp_post
        })
    }

    parentChildOccupied = (value) => {
      this.setState({
        childValue:value
      })
      console.log(value);
    }

    checkout = () => {
      fetch(API.baseUri+API.checkOut, {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "orderID": this.state.tableDishes[0].orderID,
                "tableID": this.props.match.params.tableid
            })
      } ).then(res =>{
          if(res.status===200) {
            // console.log(res.json())
            return res.json();
          }
          else console.log(res)
      }).then(json => {
        console.log(json)
        if (json.success === true){
          this.authOptions.current.getData();
          this.setState({
            tableDishes:[]
          })
          window.location = '/'
        }
      })
      console.log("checkOut");
    }
    render() {
        const newToMenu = {
            pathname: '/home/Dishes/'+ this.props.match.params.tableid,
        };

        var tableModifiedDishes =
        <div >
          {this.state.tableModifiedDishes.map((value, key1) =>{
            return (
                <div key={key1}>
                    <div>
                        {value!==0?
                            <div className="row nova-margin">
                                <div className="col-lg-4">{value.name}</div>
                                <div className="col-lg-1">X</div>
                                <div className="col-lg-2 row">
                                    -{value.num}
                                </div>
                            </div>: null}
                    </div>
                </div>
            )})}
          </div>

        return (
            <div>
              <div className="row">
                <div className="col-sm-12 col-lg-2">

                  <AuthOptions
                    ref={this.authOptions}
                    parentChildOccupied={this.parentChildOccupied}
                    />
                  <Personal />

                  <div className="site-info   nova-margin nova-padding nova-card cust-border">
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
                    <div className="col-lg-9 cust-border nova-card" >
                        {<div>
                            <div>
                                {this.state.tableDishes.map((value, key1) =>{
                                    return (
                                        <div key={key1}>
                                            <div>
                                                {value!==0?
                                                    <div className="row nova-margin">
                                                        <div className="col-lg-4">{value.name}</div>
                                                        <div className="col-lg-1">x</div>
                                                        <div className="col-lg-2 row">{value.DishCount}</div>

                                                        <div className="col-lg-2"><Button className="" bsStyle="danger" onClick={()=>{this.deleteDish(value.name)}}>删除</Button></div>
                                                    </div>: null}
                                            </div>
                                        </div>
                                    )})}
                            </div>
                        </div>}

                        <div>
                            <div className="cust-border2 cust-margin3">
                              {tableModifiedDishes}
                            </div>
                        </div>

                        <div>
                            <div className="row nova-margin">
                                <div className="col-lg-3">总价: </div>
                                <div className="col-lg-2">{this.SumUp()}</div>
                            </div>
                        </div>

                        <div className="row nova-margin">
                            <Button className="" bsStyle="success" onClick={()=>{}}>返回控制台</Button>
                            <Link to={{
                                pathname: '/home/Dishes/'+ this.props.match.params.tableid,
                                state:{
                                ss:9,
                                tableDishes: this.state.tableDishes,
                                tableModifiedDishes: this.state.tableModifiedDishes
                                }
                            }}><Button className="" bsStyle="success" onClick={()=>{}}>加菜</Button>
                          </Link>





                            <Button className="" bsStyle="success" onClick={()=>{this.checkout()}}>结账&打印</Button>
                            <Button className="" bsStyle="danger" onClick={()=>{}}>厨房重新打印</Button>

                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
