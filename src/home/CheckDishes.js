import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button, Modal, Label, FormGroup, ControlLabel, FormControl, SplitButton, MenuItem} from 'react-bootstrap'

import {API} from '../config'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'

export default class CheckDishesDishes extends Component {

  constructor(props) {
    super(props)
    this.authOptions = React.createRef();
    this.state = {
      childValue: null,
      tableDishes: [],
      thispropsmatchparamstableid: null,
      tableModifiedDishes: [],
      tableStatus: "Occupied",
      tableDishes_orderID: null,
      comment: "",
      show: false,
      memberExist: null,
      memberPhoneNum: '',
      memberPoints: null,
      memberDiscount: 0,
      discount: 0,
      sumAfterRedeem: null,
      redeemablePoints: 0,
      valueAccount: '',
      discountAdminVerification: false,
      passwordFieldType: "Password",
      discountOptions: null
    }
  }

  componentDidMount() {
    this.getData();
    this.getModifiedData();
    // console.log(this.props)
  }

  //将新传入的props赋值给现存的props
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.match.params.tableid || nextProps.match.params.orderid) {
      this.props.match.params.tableid = nextProps.match.params.tableid
      this.props.match.params.orderid = nextProps.match.params.orderid
      this.getData();
      this.getModifiedData();
      console.log(this.props.match.params.orderid)
    }
  }
  //获取对应桌号的 点菜信息
  getData = () => {
    console.log(this.props)
    this.setState({tableDishes: []})
    console.log(this.props)
    console.log(this.state.tableDishes)
    fetch(API.baseUri + API.getallTables).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else
        console.log("Get data error ");
      }
    ).then((json) => {
      console.log(json)
      console.log(this.props.match.params.tableid)
      console.log(json[this.props.match.params.tableid - 1].currentOrderID)
      this.setState({
        tableDishes_orderID: json[this.props.match.params.tableid - 1].currentOrderID
      })
    }).catch((error) => {
      console.log('error on .catch', error);
    }).then(() => {
      fetch(API.baseUri + API.getTableDishes + "/" + this.props.match.params.tableid).then((response) => {
        if (response.status === 200) {
          return response.json()
        } else
          console.log("Get data error ");
        }
      ).then((json) => {
        console.log(json)
        console.log(json[0].orderID)
        this.setState({tableDishes: json})
      }).catch((error) => {
        console.log('error on .catch', error);
      }).then(() => {
        console.log(this.state.tableDishes_orderID)
        fetch(API.baseUri + API.getOrderComment + "/" + this.state.tableDishes_orderID).then((response) => {
          if (response.status === 200) {
            return response.json()
          } else
            console.log("Get data error ");
          }
        ).then((json) => {
          console.log(json[0].comment)
          this.setState({comment: json[0].comment})
        }).catch((error) => {
          console.log('error on .catch', error);
        });
      })
    })
  }
  //计算点菜总价
  SumUp = () => {
    var total = this.state.tableDishes.reduce((sum, price) => {
      return sum + price.DishCount * price.price
    }, 0)
    return total;
  }

  //计算改动菜品总价
  SumUpModified = () => {
    var temTableModifiedDishesNumPositive = []
    var temTableModifiedDishes = this.state.tableModifiedDishes
    for (let index in temTableModifiedDishes) {
      if (temTableModifiedDishes[index].num > 0)
        temTableModifiedDishesNumPositive.push(temTableModifiedDishes[index])
    }

    var total = temTableModifiedDishesNumPositive.reduce((sum, price) => {
      return sum + price.num * price.price
    }, 0)
    console.log(temTableModifiedDishesNumPositive)
    console.log(temTableModifiedDishes)
    return total;
  }

  SumUpEntirePrice = () => {
    var total = this.SumUp() + this.SumUpModified();
    return total;
  }

  //删除 新增菜品
  deleteModifiedDish = (nameDish) => {
    console.log(this.state.tableModifiedDishes)
    // console.log(nameDish)
    var temp_post = [];
    var temp_deletedModifiedDish = {};
    for (let index in this.state.tableModifiedDishes) {
      // console.log(this.state.myPosts[index].idPOST , idPost)
      if (this.state.tableModifiedDishes[index].name !== nameDish) {
        temp_post.push(this.state.tableModifiedDishes[index])
      } else {
        this.state.tableModifiedDishes[index].num = -this.state.tableModifiedDishes[index].num
        temp_deletedModifiedDish = this.state.tableModifiedDishes[index]
        console.log(this.state.tableModifiedDishes[index])
      }
    }
    this.setState({tableModifiedDishes: temp_post})
    console.log(temp_deletedModifiedDish);
    this.updateDeletedModifiedDiesh(temp_deletedModifiedDish);
  }

  //将已经删除了的 新增菜品 上传 数据库dishMod表
  updateDeletedModifiedDiesh = (temp_deletedModifiedDish) => {

    var temp_deletedModifiedDishArray = [];
    var date = new Date();
    var time = date.toLocaleTimeString();
    temp_deletedModifiedDish.createTime = time;

    temp_deletedModifiedDishArray.push(temp_deletedModifiedDish);
    console.log(temp_deletedModifiedDishArray);

    fetch(API.baseUri + API.deleteModDish, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // [req.body.orderID, v[i].DishID, req.body.createTime, v[i].num]
      body: JSON.stringify({"items": temp_deletedModifiedDishArray})
    }).then(res => {
      if (res.status === 200) {
        // console.log(res.json())
        return res.json();
      } else
        console.log(res)
    }).then(json => {
      // console.log(json)
      if (json.success === true) {
        console.log(json.success)
        this.getModifiedData();
      }
      // console.log(this.state.tableModifiedDishes)
    })
    // console.log("updateModifiedDiesh");
  }

  //删除已点的菜
  deleteDish = (nameDish) => {
    console.log(this.state.tableDishes)
    // console.log(nameDish)
    var temp_post = [];
    var temp_modified = {};
    for (let index in this.state.tableDishes) {
      // console.log(this.state.myPosts[index].idPOST , idPost)
      if (this.state.tableDishes[index].name !== nameDish) {
        temp_post.push(this.state.tableDishes[index])
      } else {
        this.state.tableDishes[index].DishCount = -this.state.tableDishes[index].DishCount
        temp_modified = this.state.tableDishes[index]
        console.log(this.state.tableDishes[index])
      }
    }
    this.setState({tableDishes: temp_post})
    console.log(temp_modified);
    this.updateModifiedDiesh(temp_modified);
  }
  //将已经删除了的菜 上传 到数据库dishMod表
  updateModifiedDiesh = (temp_modified) => {

    var temp_modifiedArray = [];
    var date = new Date();
    var time = date.toLocaleTimeString();
    temp_modified.createTime = time;

    temp_modifiedArray.push(temp_modified);
    console.log(temp_modifiedArray);

    fetch(API.baseUri + API.modDish, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // [req.body.orderID, v[i].DishID, req.body.createTime, v[i].num]
      body: JSON.stringify({"items": temp_modifiedArray})
    }).then(res => {
      if (res.status === 200) {
        // console.log(res.json())
        return res.json();
      } else
        console.log(res)
    }).then(json => {
      // console.log(json)
      if (json.success === true) {
        console.log(json.success)
        this.getModifiedData();
      }
      // console.log(this.state.tableModifiedDishes)
    })
    // console.log("updateModifiedDiesh");
  }
  //从数据库dishMod表中 获取 改动菜的信息
  getModifiedData = () => {
    console.log(this.props.match.params.tableid)
    fetch(API.baseUri + API.getModDishes + "/" + this.props.match.params.tableid).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else
        console.log("Get data error ");
      }
    ).then((json) => {
      console.log(json)

      this.setState({tableModifiedDishes: json})
      console.log(this.state.tableModifiedDishes)
    }).catch((error) => {
      console.log('error on .catch', error);
    });
  }

  addNum = (nameDish) => {
    var temp_post = [];
    for (let index in this.state.tableDishes) {
      // console.log(this.state.myPosts[index].idPOST , idPost)
      if (this.state.tableDishes[index].name === nameDish) {
        var temp_dish = this.state.tableDishes[index];
        temp_dish.DishCount = temp_dish.DishCount + 1;
        temp_post.push(temp_dish)
      } else {
        temp_post.push(this.state.tableDishes[index])
      }
    }
    this.setState({tableDishes: temp_post})
  }

  minusNum = (nameDish) => {
    var temp_post = [];
    for (let index in this.state.tableDishes) {
      // console.log(this.state.myPosts[index].idPOST , idPost)
      if (this.state.tableDishes[index].name === nameDish) {
        if (this.state.tableDishes[index].DishCount === 1) {
          this.deleteDish(nameDish);
        } else {
          var temp_dish = this.state.tableDishes[index];
          temp_dish.DishCount = temp_dish.DishCount - 1;
          temp_post.push(temp_dish)
        }
      } else {
        temp_post.push(this.state.tableDishes[index])
      }
    }
    this.setState({tableDishes: temp_post})
  }

  //对应按钮 “结账打印” 并刷新table状态为Available
  checkout = () => {
    console.log(this.state.tableDishes_orderID)
    console.log(this.props.match.params.tableid)
    console.log(this.sumAfterRedeem())
    console.log("Phone" + this.state.memberPhoneNum)
    fetch(API.baseUri + API.checkOut, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "orderID": this.state.tableDishes_orderID, "tableID": this.props.match.params.tableid,
        // "originalPrice": this.SumUpEntirePrice(),
        "finalPrice": this.sumAfterRedeem(),
        "phone": this.state.memberPhoneNum
      })
    }).then(res => {
      if (res.status === 200) {
        // console.log(res.json())
        return res.json();
      } else
        console.log(res)
    }).then(json => {
      console.log(json)
      if (json.success === true) {
        this.authOptions.current.getData();
        this.setState({tableDishes: [], tableModifiedDishes: []})
        // window.location = '/'
      }
    })
    console.log("checkOut");
  }



  SDHPNumberCalculator = () => {
    var tempSDHPorder = []
    var reducer = (accumulator, currentValue) => accumulator + currentValue;

    //结算首次点单麻辣香锅数量
    var temp = this.state.tableDishes
    for (let index in temp) {
      if (temp[index].type === "麻辣香锅") {
        tempSDHPorder.push(temp[index].DishCount)
      }
    }
    //结算再次添加的麻辣香锅数量 （不包含已删除麻辣香锅）
    var temp = this.state.tableModifiedDishes
    for (let index in temp) {
      if (temp[index].type === "麻辣香锅" && temp[index].num > 0) {
        tempSDHPorder.push(temp[index].num)
      }
    }

    if (tempSDHPorder.length !== 0) {
      console.log(tempSDHPorder.reduce(reducer));
      var total = tempSDHPorder.reduce(reducer)
    } else {
      var total = 0;
    }
    return total;
  }

  //监听会员号码输入框input的实时value
  handleChange = (event) => {
    this.setState({
      memberPhoneNum: event.target.value,
      memberExist: null,
      memberPoints: null
    });
  }
  // memberPhoneNum
  //pointsInfo     phone,    /redeem    phone, orderID
  //检查会员积分
  checkMembershipPoint = () => {
    console.log(this.state.memberPhoneNum)
    fetch(API.baseUri + API.pointsInfo, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"phone": this.state.memberPhoneNum})
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else
        console.log(res)
    }).then(json => {
      console.log(json)
      if (json.success === true) {
        console.log("会员电话存在")
        // console.log(json.msg.redeemablePoints)
        this.setState({
          memberExist: true,
          memberPoints: json.msg.points,
          memberDiscount: json.msg.discount,
          redeemablePoints: (json.msg.redeemablePoints * 100)
        })
        console.log(this.state.redeemablePoints)
      } else {
        this.setState({memberExist: false})
      }
    })
  }

  redeemMembershipPoint = () => {
    console.log(this.state.memberPhoneNum)
    console.log(this.state.tableDishes_orderID)
    fetch(API.baseUri + API.redeem, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"phone": this.state.memberPhoneNum, "orderID": this.state.tableDishes_orderID})
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else
        console.log(res)
    }).then(json => {
      console.log(json)
      if (json.success === true) {
        console.log(json.discount.discount)
        this.setState({discount: json.discount.discount})

        // console.log(json.msg.redeemablePoints)
      } else if (json.success === false) {
        console.log(json.msg)
      }
    })
  }

  activeOrDisabledRedeemButton = () => {
    console.log("activeOrDisabledRedeemButton")
    var disabled = true;
    if (this.state.memberPoints >= 100) {
      disabled = false;
    }
    return disabled
  }

  sumAfterRedeem = () => {
    var sum = this.SumUpEntirePrice()
    if (this.state.discount !== null) {
      sum = this.SumUpEntirePrice() - this.state.discount
      console.log(sum)
    }
    return sum
  }

  memberPointsCalculatorAfterRedeem = () => {
    var sum = this.state.memberPoints - this.state.redeemablePoints
    return sum
  }
  memberPointsCalculatorAfterCheckout = () => {
    var sum = this.state.memberPoints - this.state.redeemablePoints + this.sumAfterRedeem()
    return sum
  }
  //0416983772
  //0416579887
  //0451487754
  handleChangeAccount = (e) => {
    this.setState({ valueAccount: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ valuePassword: e.target.value });
  }

  discountOptions = (num) => {
    this.setState({ discountOptions: num });
    console.log(num)
  }

  discountedPrice = () => {
    console.log((this.state.discountOptions/100))
    var discountedPrice = (this.SumUpEntirePrice() * (this.state.discountOptions/100))
    return discountedPrice
  }

  getValidationState = () => {
  const length = this.state.valueAccount.length;
  if (length >= 5) return 'success';
  else if (length > 0 ) return 'warning';

  return null;
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

  verifyAuthentication = () => {
    const adminAccount = "admin"
    const adminPassWord = "admin"
    if(this.state.valueAccount === adminAccount && this.state.valuePassword === adminPassWord) {
      console.log("Admin登陆成功")
      this.setState({
        discountAdminVerification: true
      })
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
      valueAccount: [],
      discount: 0,
      memberPhoneNum: '',
      valuePassword: '',
      memberExist: null


    });
  }

  handleShow = () => {
    this.setState({show: true});
  }


  render() {
    console.log(this.state.tableDishes)
    console.log(this.props);
    const newToMenu = {
      pathname: '/home/Dishes/' + this.props.match.params.tableid
    };

    var tableModifiedDishes = <div>
      <div >
        {console.log(this.state.tableModifiedDishes)}
        {
          this.state.tableModifiedDishes.map((value, key1) => {
            return (<div key={key1}>
              <div className="dishesUnderLine">
                {
                  value.num > 0 && value.type !== "麻辣香锅"
                    ? <div className="row nova-margin">
                        <div className="col-lg-4">{value.name}</div>
                        <div className="col-lg-1">x</div>
                        <div className="col-lg-1 ">{value.num}</div>
                        {
                          value.num > 0
                            ? <div className="col-lg-1">
                                <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                    this.deleteModifiedDish(value.name)
                                  }}>删除</Button>
                              </div>
                            : null
                        }
                      </div>
                    : null
                }
              </div>
            </div>)
          })
        }
      </div>
      <div className="cust-border2 cust-margin2">
        {
          this.state.tableModifiedDishes.map((value, key1) => {
            return (<div key={key1}>
              <div className="dishesUnderLine">
                {
                  value.num < 0 && value.type !== "麻辣香锅"
                    ? <div className="row nova-margin">
                        <div className="col-lg-4">{value.name}</div>
                        <div className="col-lg-1">x</div>
                        <div className="col-lg-1 cust-p-color">{value.num}</div>
                      </div>
                    : null
                }
              </div>

            </div>)
          })
        }
      </div>

    </div>

    return (<div>
      <div className="row">
        <div className="col-sm-12 col-lg-2 ">

          <AuthOptions ref={this.authOptions} parentChildOccupied={this.parentChildOccupied}/>
          <Personal/>

          <div className="site-info   cust-margin3 nova-padding nova-card cust-border">
            <ul>
              <li>Nova Software
              </li>
              <li>Canberra House</li>
              <li>+61 4 52542687</li>
              <h5>
                <li>info@novasoftware.com.au</li>
              </h5>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="nova-card cust-border cust-margin2 col-lg-9">
            <h4>当前桌号: {this.props.match.params.tableid}</h4>
            <div className="col-sm-12 col-lg-6 ">
              <div className="row">
                <div className="cust-border nova-card">
                  {
                    <div>
                        <div >
                          {
                            this.state.tableDishes.map((value, key1) => {
                              {
                                console.log(value)
                              }
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value !== 0 && value.type !== "麻辣香锅"
                                      ? <div className="row nova-margin ">
                                          <div >
                                            <div className="col-lg-4">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1">{value.DishCount}</div>
                                            <div className="col-lg-1">
                                              <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                  this.deleteDish(value.name)
                                                }}>删除</Button>
                                            </div>
                                          </div>
                                        </div>
                                      : null
                                  }
                                </div>
                              </div>)
                            })
                          }
                        </div>
                      </div>
                  }

                  <div>
                    <div className="cust-border2 cust-margin2">
                      {tableModifiedDishes}
                    </div>

                  </div>
                </div>

              </div>
            </div>
            {console.log(this.state.tableDishes)}
            {console.log(this.SDHPNumberCalculator())}
            {
              this.SDHPNumberCalculator() > 0 && this.SDHPNumberCalculator() < 5
                ? <div className="col-sm-12 col-lg-6 ">
                    <div className="row">
                      <div className="cust-border nova-card">
                        <div>
                          <h4 className="">麻辣香锅菜品数量: ({this.SDHPNumberCalculator()})</h4>
                          <h4 className="cust-text1">少于5份麻辣香锅菜品数量!</h4>
                        </div>
                        <div className="">
                          {
                            this.state.tableDishes.map((value, key1) => {
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value !== 0 && value.type === "麻辣香锅"
                                      ? <div className="row nova-margin ">
                                          <div >
                                            <div className="col-lg-4">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1">{value.DishCount}</div>
                                            <div className="col-lg-1">
                                              <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                  this.deleteDish(value.name)
                                                }}>删除</Button>
                                            </div>
                                          </div>
                                        </div>
                                      : null
                                  }
                                </div>
                              </div>)
                            })
                          }
                          <div >
                            {console.log(this.state.tableModifiedDishes)}
                            {
                              this.state.tableModifiedDishes.map((value, key1) => {
                                return (<div key={key1}>
                                  <div className="dishesUnderLine">
                                    {
                                      value.num > 0 && value.type === "麻辣香锅"
                                        ? <div className="row nova-margin">
                                            <div className="col-lg-4">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1 ">{value.num}</div>
                                            {
                                              value.num > 0
                                                ? <div className="col-lg-1">
                                                    <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                        this.deleteModifiedDish(value.name)
                                                      }}>删除</Button>
                                                  </div>
                                                : null
                                            }
                                          </div>
                                        : null
                                    }
                                  </div>
                                </div>)
                              })
                            }
                          </div>
                          <div className="cust-border2 cust-margin2">
                            <div >
                              {console.log(this.state.tableModifiedDishes)}
                              {
                                this.state.tableModifiedDishes.map((value, key1) => {
                                  return (<div key={key1}>
                                    <div className="dishesUnderLine">
                                      {
                                        value.num < 0 && value.type === "麻辣香锅"
                                          ? <div className="row nova-margin">
                                              <div className="col-lg-4">{value.name}</div>
                                              <div className="col-lg-1">x</div>
                                              <div className="col-lg-1 cust-p-color">{value.num}</div>
                                              {
                                                value.num > 0
                                                  ? <div className="col-lg-1">
                                                      <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                          this.deleteModifiedDish(value.name)
                                                        }}>删除</Button>
                                                    </div>
                                                  : null
                                              }
                                            </div>
                                          : null
                                      }
                                    </div>
                                  </div>)
                                })
                              }
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                : null
            }

            {
              this.SDHPNumberCalculator() >= 5
                ? <div className="col-sm-12 col-lg-6 ">
                    <div className="row">
                      <div className="cust-border nova-card">
                        <div>
                          <h4 className="">麻辣香锅菜品数量: ({this.SDHPNumberCalculator()})</h4>
                        </div>
                        <div className="">
                          {
                            this.state.tableDishes.map((value, key1) => {
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value !== 0 && value.type === "麻辣香锅"
                                      ? <div className="row nova-margin ">
                                          <div >
                                            <div className="col-lg-4">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1">{value.DishCount}</div>
                                            <div className="col-lg-1">
                                              <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                  this.deleteDish(value.name)
                                                }}>删除</Button>
                                            </div>
                                          </div>
                                        </div>
                                      : null
                                  }
                                </div>
                              </div>)
                            })
                          }
                          <div >
                            {console.log(this.state.tableModifiedDishes)}
                            {
                              this.state.tableModifiedDishes.map((value, key1) => {
                                return (<div key={key1}>
                                  <div className="dishesUnderLine">
                                    {
                                      value.num > 0 && value.type === "麻辣香锅"
                                        ? <div className="row nova-margin">
                                            <div className="col-lg-4">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1 ">{value.num}</div>
                                            {
                                              value.num > 0
                                                ? <div className="col-lg-1">
                                                    <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                        this.deleteModifiedDish(value.name)
                                                      }}>删除</Button>
                                                  </div>
                                                : null
                                            }
                                          </div>
                                        : null
                                    }
                                  </div>
                                </div>)
                              })
                            }
                          </div>
                          <div className="cust-border2 cust-margin2">
                            <div >
                              {console.log(this.state.tableModifiedDishes)}
                              {
                                this.state.tableModifiedDishes.map((value, key1) => {
                                  return (<div key={key1}>
                                    <div className="dishesUnderLine">
                                      {
                                        value.num < 0 && value.type === "麻辣香锅"
                                          ? <div className="row nova-margin">
                                              <div className="col-lg-4">{value.name}</div>
                                              <div className="col-lg-1">x</div>
                                              <div className="col-lg-1 cust-p-color">{value.num}</div>
                                              {
                                                value.num > 0
                                                  ? <div className="col-lg-1">
                                                      <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                          this.deleteModifiedDish(value.name)
                                                        }}>删除</Button>
                                                    </div>
                                                  : null
                                              }
                                            </div>
                                          : null
                                      }
                                    </div>
                                  </div>)
                                })
                              }
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                : null
            }

          </div>

          {this.state.comment !== "" ?
            <div className="nova-card cust-border col-lg-9">
             <div className="nova-card">
               <h4>备注：{this.state.comment}</h4>
             </div>
           </div>:null
          }

          <div className="nova-card cust-border col-lg-9">
            <div>
              <div className="row nova-margin">
                <div className="col-lg-3">总价:
                </div>
                <div className="col-lg-2">{this.SumUp()}</div>
                <div className="col-lg-2">{this.SumUpModified()}</div>
                <div className="col-lg-2 cust-p-color2">{this.SumUpEntirePrice()}</div>
              </div>
            </div>
            <div className="row nova-margin cust-margin7">
              <Button className="col-lg-3 button2" bsStyle="success" onClick={() => {}}>返回控制台</Button>

              <Link to={{
                  pathname: '/home/Dishes/' + this.props.match.params.tableid,
                  state: {
                    comment: this.state.comment,

                    tableDishes_orderID: this.state.tableDishes_orderID,
                    tableDishes: this.state.tableDishes,
                    tableModifiedDishes: this.state.tableModifiedDishes
                  }
                }}>
                <Button className="col-lg-3 button2 " bsStyle="success" onClick={() => {}}>加菜</Button>
              </Link>

              <Button className="col-lg-3 button2" bsStyle="success" onClick={() => {
                  this.handleShow()
                }}>结账&打印</Button>
              <Button className="col-lg-3 button2" bsStyle="warning" onClick={() => {}}>厨房打印</Button>

            </div>
          </div>
        </div>
      </div>

      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton="closeButton">
            <Modal.Title>{this.props.match.params.tableid}号桌菜品总预览</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal">
            <h4>菜品列表：</h4>
            <div className="col-sm-12 col-lg-12 ">
              <div className="row">
                <div className=" nova-card">
                  {
                    <div>
                        <div >
                          {
                            this.state.tableDishes.map((value, key1) => {
                              {
                                console.log(value)
                              }
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value !== 0 && value.type !== "麻辣香锅"
                                      ? <div className="row nova-margin ">
                                          <div >
                                            <div className="col-lg-4">{value.name}</div>
                                            <div className="col-lg-1">x</div>
                                            <div className="col-lg-1">{value.DishCount}</div>

                                          </div>
                                        </div>
                                      : null
                                  }
                                </div>
                              </div>)
                            })
                          }
                        </div>
                      </div>
                  }

                  <div>
                    <div className="cust-border2 cust-margin2">
                      <div>
                        <div >
                          {console.log(this.state.tableModifiedDishes)}
                          {
                            this.state.tableModifiedDishes.map((value, key1) => {
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value.num > 0 && value.type !== "麻辣香锅"
                                      ? <div className="row nova-margin">
                                          <div className="col-lg-4">{value.name}</div>
                                          <div className="col-lg-1">x</div>
                                          <div className="col-lg-1 ">{value.num}</div>
                                        </div>
                                      : null
                                  }
                                </div>
                              </div>)
                            })
                          }
                        </div>
                        <div className="cust-border2 cust-margin2">
                          {
                            this.state.tableModifiedDishes.map((value, key1) => {
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value.num < 0 && value.type !== "麻辣香锅"
                                      ? <div className="row nova-margin">
                                          <div className="col-lg-4">{value.name}</div>
                                          <div className="col-lg-1">x</div>
                                          <div className="col-lg-1 cust-p-color">{value.num}</div>
                                        </div>
                                      : null
                                  }
                                </div>

                              </div>)
                            })
                          }
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </Modal.Body>
          <hr/>

          <Modal.Body className="modal">
            <div className="col-sm-12 col-lg-12 ">
              <div className="row">
                <div className=" nova-card">
                  <div></div>

                  <div className="">
                    {
                      this.state.tableDishes.map((value, key1) => {
                        return (<div key={key1}>
                          <div className="dishesUnderLine">
                            {
                              value !== 0 && value.type === "麻辣香锅"
                                ? <div className="row nova-margin ">
                                    <div >
                                      <div className="col-lg-4">{value.name}</div>
                                      <div className="col-lg-1">x</div>
                                      <div className="col-lg-1">{value.DishCount}</div>
                                    </div>
                                  </div>
                                : null
                            }
                          </div>
                        </div>)
                      })
                    }
                    <div >
                      {console.log(this.state.tableModifiedDishes)}
                      {
                        this.state.tableModifiedDishes.map((value, key1) => {
                          return (<div key={key1}>
                            <div className="dishesUnderLine">
                              {
                                value.num > 0 && value.type === "麻辣香锅"
                                  ? <div className="row nova-margin">
                                      <div className="col-lg-4">{value.name}</div>
                                      <div className="col-lg-1">x</div>
                                      <div className="col-lg-1 ">{value.num}</div>
                                    </div>
                                  : null
                              }
                            </div>
                          </div>)
                        })
                      }
                    </div>
                    <div className="cust-border2 cust-margin2">
                      <div >
                        {console.log(this.state.tableModifiedDishes)}
                        {
                          this.state.tableModifiedDishes.map((value, key1) => {
                            return (<div key={key1}>
                              <div className="dishesUnderLine">
                                {
                                  value.num < 0 && value.type === "麻辣香锅"
                                    ? <div className="row nova-margin">
                                        <div className="col-lg-4">{value.name}</div>
                                        <div className="col-lg-1">x</div>
                                        <div className="col-lg-1 cust-p-color">{value.num}</div>
                                        {
                                          value.num > 0
                                            ? <div className="col-lg-1">
                                                <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                    this.deleteModifiedDish(value.name)
                                                  }}>删除</Button>
                                              </div>
                                            : null
                                        }
                                      </div>
                                    : null
                                }
                              </div>
                            </div>)
                          })
                        }
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </Modal.Body>

          <Modal.Body className="modal">
            <hr/>
            <h4 className="modal2">总价：{this.SumUpEntirePrice()}
              $AUD</h4>
          </Modal.Body>
          <Modal.Footer>
            <div >
              <div className="col-lg-6 pull-left div-MembershipPoints">
                <form className="" action="/action_page.php">
                  会员号码:
                  <input type="text" placeholder="请输入会员号码" name="LastName" onChange={this.handleChange} value={this.state.memberPhoneNum}/>
                  {
                    this.state.memberExist === true && this.state.discount === 0 && this.state.memberPoints < 100
                      ? <div>

                            <Label className="cust-label" bsStyle="info">当前拥有积分：{this.state.memberPoints}分</Label><br/>


                            <Label className="cust-label" bsStyle="danger">兑换积分不足</Label>

                        </div>
                      : null
                  }
                  {
                    this.state.memberExist === true && this.state.discount === 0 && this.state.memberPoints >= 100
                      ? <div>

                            <Label className="cust-label" bsStyle="info">当前拥有积分：{this.state.memberPoints}分</Label>


                            <Label className="cust-label" bsStyle="info">共计可兑换：${this.state.memberDiscount}AUD</Label>
                        
                        </div>
                      : null
                  }

                  {
                    this.state.memberExist === true && this.state.discount !== 0
                      ? <div>
                          <h3>
                            <Label className="label-MembershipPoints" bsStyle="info">剩余积分： {this.memberPointsCalculatorAfterRedeem()}
                              分</Label>
                          </h3>
                          <h3>
                            <Label className="label-MembershipPoints" bsStyle="info">结账之后积分：{this.memberPointsCalculatorAfterCheckout()}
                              分</Label>
                          </h3>

                        </div>
                      : null
                  }

                  {
                    this.state.memberExist === false
                      ? <div>
                          <Label bsStyle="danger">此号码没有会员权限</Label>
                        </div>
                      : null
                  }
                </form>

                <Button onClick={this.checkMembershipPoint}>查询积分</Button>
                {
                  this.state.memberPoints >= 100 && this.state.discount === 0
                    ? <Button onClick={this.redeemMembershipPoint}>兑换积分</Button>
                    : null
                }
                {
                  this.state.memberPoints >= 100 && this.state.discount !== 0
                    ? <Button bsStyle="success">兑换成功</Button>
                    : null
                }

                {
                  this.state.discount !== 0
                    ? <div>
                        <Label>总价：{this.SumUpEntirePrice()}</Label>
                        <Label>- {this.state.discount} = </Label>
                        <Label bsStyle="danger">{this.sumAfterRedeem()}$AUD</Label>
                      </div>
                    : null
                }
              </div>

              <div className="col-lg-6 pull-left div-MembershipPoints">
                <p>调价管理</p>
                {console.log(this.discountAdminVerification)}
                {this.state.discountAdminVerification === false ?
                  <div>
                  <form>
                    <FormGroup
                       controlId="formBasicText"
                       validationState={this.getValidationState()}
                     >
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
                       controlId="formBasicText1"
                        validationState={this.getValidationState()}
                      >
                      <FormControl
                        type={this.state.passwordFieldType}
                        value={this.state.valuePassword}
                        placeholder="请填写Admin密码"
                        onChange={this.handleChangePassword}
                      />
                      <input type="checkbox" onClick={() => {this.verifyPasswordFieldType()}}/>  Show Password
                      </FormGroup>
                      <Button onClick={() => {this.verifyAuthentication()}}>登陆</Button>
                  </form>
                </div>
                :
                <div>
                  <p>打折</p>
                   {this.state.discountOptions === null ?
                     <div>
                       <SplitButton
                         title="折扣选择"
                         bsStyle="default"
                         id="dropdown-no-caret">
                         <MenuItem onClick={() => {this.discountOptions(90)}}>打九折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(0)}}>打全折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(80)}}>打八折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(70)}}>打七折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(60)}}>打六折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(50)}}>打五折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(40)}}>打四折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(30)}}>打三折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(20)}}>打两折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(10)}}>打一折</MenuItem>
                       </SplitButton>
                       <p className="cust-font">折前总价：{this.SumUpEntirePrice()}</p>
                     </div>
                     :
                     <div>
                       <SplitButton
                         title={this.state.discountOptions}
                         bsStyle="default"
                         id="dropdown-no-caret">
                         <MenuItem  onClick={() => {this.discountOptions(null)}}>取消打折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(90)}}>打九折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(0)}}>打全折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(80)}}>打八折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(70)}}>打七折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(60)}}>打六折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(50)}}>打五折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(40)}}>打四折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(30)}}>打三折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(20)}}>打两折</MenuItem>
                         <MenuItem onClick={() => {this.discountOptions(10)}}>打一折</MenuItem>
                       </SplitButton>
                       <p className="cust-font">折后总价：{this.SumUpEntirePrice()} * {this.state.discountOptions}% = {this.discountedPrice()}</p>
                     </div>
                   }
                </div>
              }
              </div>
            </div>
            <div className="col-lg-12 div-checkout-button">
              <Button onClick={this.handleClose}>返回</Button>
              <Button onClick={this.checkout}>确认结账</Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>)
  }
}
