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
      discountOptions: null,
      verifyTableModifiedDishesNumPositiveExist: null,
      verifyTableModifiedDishesNumNegativeExist: null
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

  getToken = () => {
      // Retrieves the user token from localStorage
      var user = localStorage.getItem('SHUWEIYUAN');
      var uu = JSON.parse(user);
      console.log(JSON.parse(user));
      if (JSON.parse(user) === null) {
        window.location = '/'
      }
      else {
        return uu.Token
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
    var tempExistArray = []
    var tempExist = this.state.tableDishes
    // console.log(tempExist)
    for (let index in tempExist) {
      if (tempExist[index].deleted === 0) {
        tempExistArray.push(tempExist[index])
      }
    }
    // console.log(tempExistArray)
    var total = tempExistArray.reduce((sum, price) => {
      return sum + price.DishCount * price.price
    }, 0)
    return Math.round(total * 100) / 100
  }

  //计算改动菜品总价
  SumUpModified = () => {
    var temTableModifiedDishesNumPositive = []
    var temTableModifiedDishes = this.state.tableModifiedDishes
    for (let index in temTableModifiedDishes) {
      if (temTableModifiedDishes[index].deleted === 0) {
        temTableModifiedDishesNumPositive.push(temTableModifiedDishes[index])
      }
    }
    var total = temTableModifiedDishesNumPositive.reduce((sum, price) => {
      return sum + price.num * price.price
    }, 0)
    // console.log(temTableModifiedDishesNumPositive)
    // console.log(temTableModifiedDishes)
    return Math.round(total * 100) / 100
  }

  //计算改动菜品(普通菜品)总价
  SumUpModifiedNormalDishes = () => {
    var temTableModifiedNormalDishesNumPositive = []
    var temTableModifiedDishes = this.state.tableModifiedDishes
    for (let index in temTableModifiedDishes) {
      if (temTableModifiedDishes[index].num > 0 && temTableModifiedDishes[index].type !== "麻辣香锅") {
        temTableModifiedNormalDishesNumPositive.push(temTableModifiedDishes[index])
      }
    }

    var total = temTableModifiedNormalDishesNumPositive.reduce((sum, price) => {
      return sum + price.num * price.price
    }, 0)
    // console.log(temTableModifiedNormalDishesNumPositive)
    // console.log(temTableModifiedDishes)
    return Math.round(total * 100) / 100
  }

  //计算原始菜品(普通菜品)总数量
  SumUpNormalDishes = () => {
    var temTableNormalDishesNumPositive = []
    var temTableDishes = this.state.tableDishes
    for (let index in temTableDishes) {
      if (temTableDishes[index].DishCount > 0 && temTableDishes[index].type !== "麻辣香锅") {
        temTableNormalDishesNumPositive.push(temTableDishes[index])
      }
    }

    var total = temTableNormalDishesNumPositive.reduce((sum, price) => {
      return sum + price.DishCount
    }, 0)
    // console.log(temTableDishes)
    // console.log(total)
    return Math.round(total * 100) / 100
  }

  //计算改动菜品(麻辣香锅 已删除)总数量
  SumUpModifiedSDHPDishesNum = () => {
    var temTableModifiedSDHPDishesNumNegative = []
    var temTableModifiedSDHPDishes = this.state.tableModifiedDishes
    for (let index in temTableModifiedSDHPDishes) {
      if (temTableModifiedSDHPDishes[index].num < 0 && temTableModifiedSDHPDishes[index].type === "麻辣香锅") {
        temTableModifiedSDHPDishesNumNegative.push(temTableModifiedSDHPDishes[index])
      }
    }
    var total = temTableModifiedSDHPDishesNumNegative.reduce((sum, price) => {
      return sum + price.num
    }, 0)
    // console.log(temTableModifiedSDHPDishes)
    // console.log(total)
    return Math.round(total * 100) / 100
  }

  //计算改动菜品(普通菜品 已删除)总数量
  SumUpModifiedNormalDishesNegaticeNum = () => {
    var temTableModifiedNormalDishesNumNegative = []
    var temTableModifiedDishes = this.state.tableModifiedDishes
    for (let index in temTableModifiedDishes) {
      if (temTableModifiedDishes[index].num < 0 && temTableModifiedDishes[index].type !== "麻辣香锅") {
        temTableModifiedNormalDishesNumNegative.push(temTableModifiedDishes[index])
      }
    }

    var total = temTableModifiedNormalDishesNumNegative.reduce((sum, price) => {
      return sum + price.num
    }, 0)
    console.log(total)
    return Math.round(total * 100) / 100
  }

  SumUpEntirePrice = () => {
    var total = this.SumUp() + this.SumUpModified();
    return Math.round(total * 100) / 100
  }

  updateCurrentTotalPrice = () => {
    fetch(API.baseUri + API.getallTables).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else
        console.log("Get data error ");
      }
    ).then((json) => {

    }).catch((error) => {
      console.log('error on .catch', error);
    })
  }

  //删除 新增菜品 (将this.state.tableModifiedDishes.deleted = 1)
  deleteModifiedDish = (value) => {
    console.log(this.state.tableModifiedDishes)
    console.log(value)

    var temp_post = [];
    for (let index in this.state.tableModifiedDishes) {
      if ((this.state.tableModifiedDishes[index].name !== value.name )
      || (this.state.tableModifiedDishes[index].name === value.name && this.state.tableModifiedDishes[index].type !== value.type )
      || (this.state.tableModifiedDishes[index].deleted === 1 ) ) {
        temp_post.push(this.state.tableModifiedDishes[index])
      } else {
        console.log(this.state.tableModifiedDishes[index])
        fetch(API.baseUri + API.updateModifiedDeleted + "/" + this.state.tableModifiedDishes[index].DishID)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            this.getModifiedData()
        }).catch((error) => {
            console.log('error on .catch', error);
        });
      }
    }
  }
  //删除已点的菜
  deleteDish = (value) => {
    console.log(this.state.tableDishes)
    console.log(value)
    var temp_post = [];
    for (let index in this.state.tableDishes) {
      if (this.state.tableDishes[index].name !== value.name || (this.state.tableDishes[index].name === value.name && this.state.tableDishes[index].type !== value.type) ) {
        temp_post.push(this.state.tableDishes[index])
      } else {
        console.log(this.state.tableDishes[index])
        fetch(API.baseUri + API.updateOriginDeleted + "/" + this.state.tableDishes[index].DishID)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            this.getOriginData()
        }).catch((error) => {
            console.log('error on .catch', error);
        });
      }
    }
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
  //从数据库dishMod表中 获取 改动菜的信息
  getOriginData = () => {
    console.log(this.props.match.params.tableid)
    fetch(API.baseUri + API.getTableDishes + "/" + this.props.match.params.tableid).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else
        console.log("Get data error ");
      }
    ).then((json) => {
      console.log(json)
      this.setState({tableDishes: json})
    }).catch((error) => {
      console.log('error on .catch', error);
    })
  }

  addNum = (value) => {
    var temp_post = [];
    for (let index in this.state.tableDishes) {
      // console.log(this.state.myPosts[index].idPOST , idPost)
      if (this.state.tableDishes[index].name === value.name && this.state.tableDishes[index].type === value.type) {
        var temp_dish = this.state.tableDishes[index];
        temp_dish.DishCount = temp_dish.DishCount + 1;
        temp_post.push(temp_dish)
      } else {
        temp_post.push(this.state.tableDishes[index])
      }
    }
    this.setState({tableDishes: temp_post})
  }

  minusNum = (value) => {
    var temp_post = [];
    for (let index in this.state.tableDishes) {
      // console.log(this.state.myPosts[index].idPOST , idPost)
      if (this.state.tableDishes[index].name === value.name && this.state.tableDishes[index].type === value.type) {
        if (this.state.tableDishes[index].DishCount === 1) {
          this.deleteDish(value);
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
    if(this.discountedPrice() !==0){
      fetch(API.baseUri + API.checkOut, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
        },
        body: JSON.stringify({
          "orderID": this.state.tableDishes_orderID, "tableID": this.props.match.params.tableid,
          // "originalPrice": this.SumUpEntirePrice(),
          "finalPrice": this.discountedPrice(),
          "phone": this.state.memberPhoneNum
        })
      }).then(res => {
        if (res.status === 200) {
          // console.log(res.json())
          return res.json();
        }
        else if (res.status===401) {
            window.location = '/'
        }
      }).then(json => {
        console.log(json)
        if (json.success === true) {
          this.print()
          this.authOptions.current.getData();
          this.setState({tableDishes: [], tableModifiedDishes: []})
           window.location = '/home'
        }
      })
    }
    else {
      fetch(API.baseUri + API.checkOut, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
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
        }
        else if (res.status===401) {
            window.location = '/'
        }
      }).then(json => {
        console.log(json)
        if (json.success === true) {
          this.print()
          this.authOptions.current.getData();
          this.setState({tableDishes: [], tableModifiedDishes: [] ,discount:""})
          window.location = '/home'
        }
      })
    }
    console.log("checkOut");
  }

  SDHPExistCalculator = () => {
    //结算首次点单(已删除的+未删除的)麻辣香锅数量
    var tempSDHPorder = []
    var temp = this.state.tableDishes
    for (let index in temp) {
      if (temp[index].type === "麻辣香锅" ) {
        tempSDHPorder.push(temp[index].DishCount)
      }
    }
    //结算再次添加（已删除的+未删除的）麻辣香锅数量
    var temp = this.state.tableModifiedDishes
    for (let index in temp) {
      if (temp[index].type === "麻辣香锅" ) {
        tempSDHPorder.push(temp[index].num)
      }
    }
    return tempSDHPorder.length
  }

  SDHPNumberCalculator = () => {
    var tempSDHPorder = []
    var reducer = (accumulator, currentValue) => accumulator + currentValue;

    //结算首次点单麻辣香锅数量
    var temp = this.state.tableDishes
    for (let index in temp) {
      if (temp[index].type === "麻辣香锅" && temp[index].deleted === 0) {
        tempSDHPorder.push(temp[index].DishCount)
      }
    }
    //结算再次添加的麻辣香锅数量 （不包含已删除麻辣香锅）
    var temp = this.state.tableModifiedDishes
    for (let index in temp) {
      if (temp[index].type === "麻辣香锅" && temp[index].deleted === 0) {
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

  checkFishExist = () => {
    var tempArray = []
    var temp = this.state.tableDishes
    console.log(this.state.tableDishes)
    console.log(temp)
    for (let index in temp) {
      if (temp[index].subtype === "烤鱼" && temp[index].deleted === 0 ) {
        tempArray.push(temp[index])
      }
    }
    var temp2 = this.state.tableModifiedDishes
    console.log(temp2)
    for (let index in temp2) {
      if (temp2[index].subtype === "烤鱼" && temp2[index].deleted === 0 ) {
        tempArray.push(temp2[index])
      }
    }
    console.log(tempArray)
    return tempArray.length
  }

  checkFishDishesExist = () => {
    var tempArray = []
    var temp = this.state.tableDishes
    var temp2 = this.state.tableModifiedDishes
    console.log(temp)
    for (let index in temp) {
      if (temp[index].type === "特色烤鱼" ) {
        tempArray.push(temp[index])
      }
    }
    for (let index in temp2) {
      if (temp2[index].type === "特色烤鱼" ) {
        tempArray.push(temp2[index])
      }
    }
    console.log(tempArray)
    return tempArray.length
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
    var sum = this.state.memberPoints - this.state.redeemablePoints + parseInt((this.sumAfterRedeem()),10)
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
    var discountedPrice = Math.floor(this.SumUpEntirePrice() * (this.state.discountOptions/100))
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

  //获得【新增】【普通菜品】的【数量】
  verifyModifiedNormalDishesExist = () => {
    var tempArray = []
    var temp = this.state.tableModifiedDishes
    for (let index in temp) {
      if ( temp[index].type !== "麻辣香锅" && temp[index].type !== "特色烤鱼" ) {
        tempArray.push(temp[index])
      }
    }
    console.log(tempArray.length)
    return tempArray.length
  }
  //获得【原始】【普通菜品】的【数量】
  verifyNormalDishesExist = () => {
    var tempArray = []
    var temp = this.state.tableDishes
    for (let index in temp) {
      if ( temp[index].type !== "麻辣香锅" && temp[index].type !== "特色烤鱼" ) {
        tempArray.push(temp[index])
      }
    }
    console.log(tempArray.length)
    return tempArray.length
  }

  //小票打印
  print = () => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    // console.log(JSON.stringify(this.state.order))
    var orderInit = this.state.tableDishes
    var orderModified = this.state.tableModifiedDishes
    //首次 普通菜品
    var orderInitNormal = []
     for (let index in orderInit) {
      if (orderInit[index].type !== "麻辣香锅" && orderInit[index].type !== "特色烤鱼" && orderInit[index].deleted === 0 )
      {
        orderInitNormal.push(orderInit[index])
      }
    }
    //首次 麻辣香锅菜品
    var orderInitSDHP = []
     for (let index in orderInit) {
      if (orderInit[index].type === "麻辣香锅"  && orderInit[index].deleted === 0 )
      {
        orderInitSDHP.push(orderInit[index])
      }
    }
    //首次 烤鱼菜品
    var orderInitFish = []
     for (let index in orderInit) {
      if (orderInit[index].type === "特色烤鱼"  && orderInit[index].deleted === 0 )
      {
        orderInitFish.push(orderInit[index])
      }
    }
    //后续 普通菜品
    var orderModifiedNormal = []
     for (let index in orderModified) {
      if (orderModified[index].type !== "麻辣香锅" && orderModified[index].type !== "特色烤鱼" && orderModified[index].deleted === 0 )
      {
        orderModifiedNormal.push(orderModified[index])
      }
    }
    //后续 麻辣香锅菜品
    var orderModifiedSDHP = []
     for (let index in orderModified) {
      if (orderModified[index].type === "麻辣香锅"  && orderModified[index].deleted === 0 )
      {
        orderModifiedSDHP.push(orderModified[index])
      }
    }
    //后续 烤鱼菜品
    var orderModifiedFish = []
     for (let index in orderModified) {
      if (orderModified[index].type === "特色烤鱼"  && orderModified[index].deleted === 0 )
      {
        orderModifiedFish.push(orderModified[index])
      }
    }
    //总 普通菜品
    var totalNormal = orderInitNormal.concat(orderModifiedNormal)
    //总 麻辣香锅菜品
    var totalSDHP = orderInitSDHP.concat(orderModifiedSDHP)
    //总 特色烤鱼菜品
    var totalFish = orderInitFish.concat(orderModifiedFish)
    console.log(totalNormal)
    console.log(totalSDHP)
    console.log(totalFish)
    var FINAL = 0
    var DISCOUNT = 0
    if (this.discountedPrice() !== 0) {
      DISCOUNT = parseFloat(this.SumUpEntirePrice()) - parseFloat(this.discountedPrice())
      FINAL = this.discountedPrice()
    } else {
      DISCOUNT = parseFloat(this.SumUpEntirePrice()) - parseFloat(this.sumAfterRedeem())
      FINAL = this.sumAfterRedeem()
    }

    fetch('http://localhost:3000/printReceipt', {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "tableID": this.props.match.params.tableid,

        "orderNormal": totalNormal,
        "orderSDHP": totalSDHP,
        "orderFish": totalFish,

        "DineInTotalPrice": this.SumUpEntirePrice(),
        "DineInDiscountedPrice": FINAL,
        "DineInDiscount": DISCOUNT,

          })
    } ).then(res =>{
        if(res.status===200) {
          return res.json();
        }
        else {
          console.log(res)
          this.setState({
            discount:0
          })
        }
    })
  }

  //厨房 对单打印
  printKitchen = () => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    // console.log(JSON.stringify(this.state.order))
    var orderInit = this.state.tableDishes
    var orderModified = this.state.tableModifiedDishes
    //首次 普通菜品
    var orderInitNormal = []
     for (let index in orderInit) {
      if (orderInit[index].type !== "麻辣香锅" && orderInit[index].type !== "特色烤鱼" && orderInit[index].deleted === 0 )
      {
        orderInitNormal.push(orderInit[index])
      }
    }
    //后续 普通菜品
    var orderModifiedNormal = []
     for (let index in orderModified) {
      if (orderModified[index].type !== "麻辣香锅" && orderModified[index].type !== "特色烤鱼" && orderModified[index].deleted === 0 )
      {
        orderModifiedNormal.push(orderModified[index])
      }
    }
    //总 普通菜品
    var totalNormal = orderInitNormal.concat(orderModifiedNormal)

    fetch('http://localhost:3000/KprinterN', {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify({
        "tableID": this.props.match.params.tableid,
        "orderNormal": totalNormal,
          })
    } ).then(res =>{
        if(res.status===200) {
          return res.json();
        }
        else console.log(res)
    }).then(json => {
      console.log(json)
      if (json.print === 'SUCCESS'){
        //首次 麻辣香锅菜品
        var orderInitSDHP = []
         for (let index in orderInit) {
          if (orderInit[index].type === "麻辣香锅"  && orderInit[index].deleted === 0 )
          {
            orderInitSDHP.push(orderInit[index])
          }
        }
        //后续 麻辣香锅菜品
        var orderModifiedSDHP = []
         for (let index in orderModified) {
          if (orderModified[index].type === "麻辣香锅"  && orderModified[index].deleted === 0 )
          {
            orderModifiedSDHP.push(orderModified[index])
          }
        }
        //总 麻辣香锅菜品
        var totalSDHP = orderInitSDHP.concat(orderModifiedSDHP)
        fetch('http://localhost:3000/KprinterS' , {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + this.getToken()
          },
          body: JSON.stringify({
            "tableID": this.props.match.params.tableid,
            "orderSDHP": totalSDHP,
              })
        } ).then(res =>{
            if(res.status===200) {
              return res.json();
            }
            else console.log(res)
        }).then(json => {
          console.log(json)
          if (json.print === 'SUCCESS'){
            //首次 烤鱼菜品
            var orderInitFish = []
             for (let index in orderInit) {
              if (orderInit[index].type === "特色烤鱼"  && orderInit[index].deleted === 0 )
              {
                orderInitFish.push(orderInit[index])
              }
            }
            //后续 烤鱼菜品
            var orderModifiedFish = []
             for (let index in orderModified) {
              if (orderModified[index].type === "特色烤鱼"  && orderModified[index].deleted === 0 )
              {
                orderModifiedFish.push(orderModified[index])
              }
            }
            //总 特色烤鱼菜品
            var totalFish = orderInitFish.concat(orderModifiedFish)
            fetch('http://localhost:3000/KprinterF' , {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.getToken()
              },
              body: JSON.stringify({
                "tableID": this.props.match.params.tableid,
                "orderFish": totalFish,
                  })
            } ).then(res =>{
                if(res.status===200) {
                  return res.json();
                }
                else console.log(res)
            }).then(json => {
              console.log(json)
              if (json.print === 'SUCCESS'){

              }
            })
          }
        })
      }
    })

  }

  render() {
    var toHomePage = {
     pathname: '/home',
    }

    console.log(this.SumUpModifiedNormalDishes())
    console.log(this.state.tableDishes)
    console.log(this.props);
    const newToMenu = {
      pathname: '/home/Dishes/' + this.props.match.params.tableid
    };

    var tableModifiedDishes = <div>
        {this.verifyModifiedNormalDishesExist() !== 0 ?
          <div className="cust-border-top">
            {console.log(this.state.tableModifiedDishes)}
            {
              this.state.tableModifiedDishes.map((value, key1) => {
                return (<div key={key1}>
                  <div className="dishesUnderLine">
                    {
                      value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 0 ?
                        <div className="row nova-margin">
                          <div className="col-lg-1"/>
                          <div className="col-lg-6">{value.name}后添加</div>
                          <div className="col-lg-1 ">{value.num}</div>
                          <div className="col-lg-1">{value.price}</div>
                          <div className="col-lg-1">
                            <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                this.deleteModifiedDish(value)
                              }}>删除</Button>
                          </div>
                        </div>
                        :
                        null
                    }
                  </div>
                </div>)
              })
            }
            {
              this.state.tableModifiedDishes.map((value, key1) => {
                return (<div key={key1}>
                  <div className="dishesUnderLine">
                    {
                      value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 1 ?
                        <div className="row nova-margin">
                          <div className="col-lg-1"/>
                          <div className="col-lg-6 strikeThrough">{value.name}后添加</div>
                          <div className="col-lg-1 strikeThrough">{value.num}</div>
                          <div className="col-lg-1 strikeThrough">{value.price}</div>
                        </div>
                        :
                        null
                    }
                  </div>
                </div>)
              })
            }
          </div>
        :null}

    </div>

    return (
      <div>
          {console.log(this.state.comment)}
        {console.log(this.state.tableModifiedDishes)}
      <div className="">
        <div className="col-sm-12 col-lg-2 padding-tables">

          <AuthOptions ref={this.authOptions} parentChildOccupied={this.parentChildOccupied}/>
          <Personal/>

          <div className="site-info nova-padding nova-card cust-border">
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
        <div className="">
          <div className="col-lg-10 cust-border nova-card cust-margin-top">
            <center><b><h3>当前桌号: {this.props.match.params.tableid}</h3></b></center>


            {this.verifyNormalDishesExist() !== 0 || this.verifyModifiedNormalDishesExist() !== 0 ?
              <div className="col-lg-4 cust-border nova-card">
                <center><h3><b>普通菜品列表: </b></h3></center>
                {
                  this.state.tableDishes.map((value, key1) => {
                    return (
                      <div className="dishesUnderLine" key={key1}>
                        {
                          value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 0 ?
                          <div className="row nova-margin">
                            <div className="col-lg-1" />
                            <div className="col-lg-6">{value.name}</div>
                            <div className="col-lg-1">{value.DishCount}</div>
                            <div className="col-lg-1">{value.price}</div>
                            <div className="col-lg-1">
                              <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                this.deleteDish(value)}}>删除
                              </Button>
                            </div>
                          </div>
                        : null
                        }
                    </div>)
                  })
                }
                {
                  this.state.tableDishes.map((value, key1) => {
                    return (
                      <div className="dishesUnderLine" key={key1}>
                        {
                          value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 1 ?
                          <div className="row nova-margin">
                            <div className="col-lg-1" />
                            <div className="col-lg-6 strikeThrough">{value.name}</div>
                            <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                            <div className="col-lg-1 strikeThrough">{value.price}</div>
                          </div>
                        : null
                        }
                    </div>)
                  })
                }
                {tableModifiedDishes}
              </div>
            :null}


            {
               this.SDHPExistCalculator() !== 0 ?
               <div className="col-lg-4 cust-border nova-card">
                <center><h3><b>麻辣香锅菜品列表: </b></h3></center>
                <center><h4 className="">麻辣香锅菜品数量: ({this.SDHPNumberCalculator()})</h4></center>
                { this.SDHPNumberCalculator() > 0 && this.SDHPNumberCalculator() < 5 ?
                  <div>
                    <center><h4 className="cust-text1">少于5份麻辣香锅菜品数量!</h4></center>
                  </div>:null}

                  <div className="">
                          {
                            this.state.tableDishes.map((value, key1) => {
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value !== 0 && value.type === "麻辣香锅" && value.deleted === 0
                                      ? <div className="row nova-margin ">
                                          <div >
                                            <div className="col-lg-1" />
                                            <div className="col-lg-6">{value.name}</div>

                                            <div className="col-lg-1">{value.DishCount}</div>
                                            <div className="col-lg-1">{value.price}</div>
                                            <div className="col-lg-1">
                                              <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                  this.deleteDish(value)
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
                          {
                            this.state.tableDishes.map((value, key1) => {
                              return (<div key={key1}>
                                <div className="dishesUnderLine">
                                  {
                                    value !== 0 && value.type === "麻辣香锅" && value.deleted === 1
                                      ? <div className="row nova-margin ">
                                          <div >
                                            <div className="col-lg-1" />
                                            <div className="col-lg-6 strikeThrough">{value.name}（原始）</div>
                                            <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                            <div className="col-lg-1 strikeThrough">{value.price}</div>
                                          </div>
                                        </div>
                                      : null
                                  }
                                </div>
                              </div>)
                            })
                          }
                          <div className="cust-border-top">
                            {
                              this.state.tableModifiedDishes.map((value, key1) => {
                                return (<div key={key1}>
                                  <div className="dishesUnderLine">
                                    {
                                      value.type === "麻辣香锅" && value.deleted === 0
                                        ? <div className="row nova-margin">
                                            <div className="col-lg-1" />
                                            <div className="col-lg-6">{value.name}后添加</div>

                                            <div className="col-lg-1 ">{value.num}</div>
                                            <div className="col-lg-1">{value.price}</div>
                                            <div className="col-lg-1">
                                              <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                                  this.deleteModifiedDish(value)
                                                }}>删除
                                              </Button>
                                            </div>
                                          </div>
                                        : null
                                    }

                                  </div>
                                </div>)
                              })
                            }
                            {
                              this.state.tableModifiedDishes.map((value, key1) => {
                                return (<div key={key1}>
                                  <div className="dishesUnderLine">
                                    {
                                       value.type === "麻辣香锅" && value.deleted === 1
                                        ? <div className="row nova-margin">
                                            <div className="col-lg-1" />
                                            <div className="col-lg-6 strikeThrough">{value.name}</div>
                                            <div className="col-lg-1 strikeThrough">{value.num}</div>
                                            <div className="col-lg-1 strikeThrough">{value.price}</div>
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
                : null
            }

            {
              this.checkFishDishesExist() !== 0 ?

                 <div className="col-sm-12 col-lg-4 cust-border nova-card">
                   <center><h3><b>特色烤鱼菜品列表:</b></h3></center>
                   {
                     this.checkFishExist() === 0 ?
                     <div>
                       <center><h4 className="cust-text1">未选择烤鱼口味</h4></center>
                     </div>
                     :null
                   }

                    {
                      this.state.tableDishes.map((value, key1) => {
                        return (<div key={key1}>
                            {
                              value !== 0 && value.type === "特色烤鱼" && value.deleted === 0
                                ? <div className="row nova-margin ">
                                      <div className="col-lg-1" />
                                      <div className="col-lg-6">{value.name}</div>
                                      <div className="col-lg-1">{value.DishCount}</div>
                                      <div className="col-lg-1">{value.price}</div>
                                      <div className="col-lg-1">
                                        <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                            this.deleteDish(value)
                                          }}>删除</Button>
                                      </div>
                                  </div>
                                : null
                            }
                        </div>)
                      })
                    }
                    {
                      this.state.tableDishes.map((value, key1) => {
                        return (<div key={key1}>
                            {
                              value !== 0 && value.type === "特色烤鱼" && value.deleted === 1
                                ? <div className="row nova-margin ">

                                      <div className="col-lg-1" />
                                      <div className="col-lg-6 strikeThrough">{value.name} (烤鱼)</div>
                                      <div className="col-lg-1 strikeThrough">{value.DishCount}</div>
                                      <div className="col-lg-1 strikeThrough">{value.price}</div>

                                  </div>
                                : null
                            }
                        </div>)
                      })
                    }

                    <div className="cust-border-top">
                      {
                        this.state.tableModifiedDishes.map((value, key1) => {
                          return (
                            <div key={key1} className="dishesUnderLine">
                              {
                                value.num > 0 && value.type === "特色烤鱼"
                                  ? <div className="row nova-margin">
                                      <div className="col-lg-1" />
                                      <div className="col-lg-6">{value.name}</div>
                                      <div className="col-lg-1 ">{value.num}</div>
                                      <div className="col-lg-1">{value.price}</div>
                                      <div className="col-lg-1">
                                        <Button className="deleteButton" bsSize="xsmall" bsStyle="danger" onClick={() => {
                                            this.deleteModifiedDish(value)
                                          }}>删除
                                        </Button>
                                      </div>
                                    </div>
                                  : null
                              }
                          </div>)
                        })
                      }
                      {
                        this.state.tableModifiedDishes.map((value, key1) => {
                          return (
                            <div className="dishesUnderLine" key={key1}>
                              {
                                value.num < 0 && value.type === "特色烤鱼"
                                  ? <div className="row nova-margin">
                                      <div className="col-lg-1" />
                                      <div className="col-lg-6 strikeThrough">{value.name}</div>

                                      <div className="col-lg-1 strikeThrough">{value.num}</div>
                                      <div className="col-lg-1 strikeThrough">{value.price}</div>
                                    </div>
                                  : null
                              }
                          </div>)
                        })
                      }
                    </div>
                  </div>
                : null
            }
          </div>

          {this.state.comment !== null && this.state.comment !== "" ?
            <div className="nova-card cust-border col-lg-10">
             <center><h4 className="col-lg-9">备注：{this.state.comment}</h4></center>
            </div>:null
          }

          <div className="nova-card cust-border col-lg-10">
            <div className="col-lg-1"/>
            <div className="col-lg-3">下单: AUD${this.SumUp()}</div>
            <div className="col-lg-1"/>
            <div className="col-lg-3">加菜：AUD${this.SumUpModified()}</div>
            <div className="col-lg-1"/>
            <div className="col-lg-3 cust-p-color2">总价：AUD${this.SumUpEntirePrice()}</div>
          </div>

          <div className="nova-card cust-border col-lg-10">
            <div className=" nova-margin cust-margin7">
              <Link to={toHomePage}><Button className="col-lg-3 button2" bsStyle="success" onClick={() => {}}>返回控制台</Button></Link>

              <Link to={{
                  pathname: '/home/Dishes/' + this.props.match.params.tableid,
                  state: {
                    comment: this.state.comment,
                    tableDishes_orderID: this.state.tableDishes_orderID,
                    tableDishes: this.state.tableDishes,
                    tableModifiedDishes: this.state.tableModifiedDishes
                  }
                }}>
                <Button className=" button3 " bsStyle="success" onClick={() => {}}>加菜</Button>
              </Link>

              <Button className=" button3" bsStyle="success" onClick={() => {
                  this.handleShow()
                }}>结账&打印</Button>
              <Button className="button3" bsStyle="warning" onClick={() => {this.printKitchen()}}>厨房打印</Button>

            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton="closeButton">
            <Modal.Title>{this.props.match.params.tableid}号桌菜品总预览</Modal.Title>
          </Modal.Header>

          {this.verifyNormalDishesExist() !== 0 || this.verifyModifiedNormalDishesExist() !== 0 ?
          <Modal.Body className="modal">
            <center><h4>普通菜品列表：</h4></center>
            <div className="col-sm-12 col-lg-12 ">
                <div className=" nova-card">

                    {
                      this.state.tableDishes.map((value, key1) => {
                        return (
                          <div key={key1}>
                          <div className="dishesUnderLine">
                            {
                              value !== 0 && value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 0
                                ? <div className="row nova-margin ">
                                    <div >
                                      <div className="col-lg-1" />
                                      <div className="col-lg-6">{value.name}</div>

                                      <div className="col-lg-1">{value.DishCount}</div>
                                      <div className="col-lg-1">{value.price}</div>
                                    </div>
                                  </div>
                                : null
                            }
                          </div>
                        </div>)
                      })
                    }

                  {this.verifyModifiedNormalDishesExist() !== 0 ?
                  <div className="">
                    {console.log(this.state.tableModifiedDishes)}
                    {
                      this.state.tableModifiedDishes.map((value, key1) => {
                        return (<div key={key1}>
                          <div className="dishesUnderLine">
                            {
                              value.num > 0 && value.type !== "麻辣香锅" && value.type !== "特色烤鱼" && value.deleted === 0
                                ? <div className="row nova-margin">
                                    <div className="col-lg-1" />
                                    <div className="col-lg-6">{value.name}</div>
                                    <div className="col-lg-1 ">{value.num}</div>
                                    <div className="col-lg-1">{value.price}</div>
                                  </div>
                                : null
                            }
                          </div>
                          </div>)
                        })
                      }
                    </div>
                    :null}

                </div>
            </div>

          </Modal.Body>

          :null}
          <hr/>

          {this.SDHPExistCalculator() !== 0 ?
          <Modal.Body className="modal">
            <center><h4>麻辣香锅菜品列表：</h4></center>
            <div className="col-sm-12 col-lg-12 ">
                <div className=" nova-card">
                    {
                      this.state.tableDishes.map((value, key1) => {
                        return (<div key={key1}>
                          <div className="dishesUnderLine">
                            {
                              value.type === "麻辣香锅" && value.deleted === 0
                                ? <div className="row nova-margin">
                                    <div >
                                      <div className="col-lg-1" />
                                      <div className="col-lg-6">{value.name}</div>
                                      <div className="col-lg-1">{value.DishCount}</div>
                                      <div className="col-lg-1">{value.price}</div>
                                    </div>
                                  </div>
                                : null
                            }
                          </div>
                        </div>)
                      })
                    }

                    {
                      this.state.tableModifiedDishes.map((value, key1) => {
                        return (<div key={key1}>
                          <div className="dishesUnderLine">
                            {
                              value.num > 0 && value.type === "麻辣香锅" && value.deleted === 0
                                ? <div className="row nova-margin">
                                    <div className="col-lg-1" />
                                    <div className="col-lg-6">{value.name}</div>

                                    <div className="col-lg-1 ">{value.num}</div>
                                    <div className="col-lg-1">{value.price}</div>
                                  </div>
                                : null
                            }
                          </div>
                        </div>)
                      })
                    }
                  </div>
              </div>

          </Modal.Body>

          :null}
          <hr/>

          {this.checkFishDishesExist() !== 0 ?
          <Modal.Body className="modal">
              <center><h4>特色烤鱼菜品列表：</h4></center>
              <div className="col-sm-12 col-lg-12 ">
                  <div className=" nova-card">
                      {
                        this.state.tableDishes.map((value, key1) => {
                          return (<div key={key1}>
                            <div className="dishesUnderLine">
                              {
                                value.type === "特色烤鱼" && value.deleted === 0
                                  ? <div className="row nova-margin">
                                      <div >
                                        <div className="col-lg-1" />
                                        <div className="col-lg-6">{value.name}</div>
                                        <div className="col-lg-1">{value.DishCount}</div>
                                        <div className="col-lg-1">{value.price}</div>
                                      </div>
                                    </div>
                                  : null
                              }
                            </div>
                          </div>)
                        })
                      }

                      {
                        this.state.tableModifiedDishes.map((value, key1) => {
                          return (<div key={key1}>
                            <div className="dishesUnderLine">
                              {
                                value.num > 0 && value.type === "特色烤鱼" && value.deleted === 0
                                  ? <div className="row nova-margin">
                                      <div className="col-lg-1" />
                                      <div className="col-lg-6">{value.name}</div>

                                      <div className="col-lg-1 ">{value.num}</div>
                                      <div className="col-lg-1">{value.price}</div>
                                    </div>
                                  : null
                              }
                            </div>
                          </div>)
                        })
                      }
                    </div>
                </div>

            </Modal.Body>
          :null}



          <Modal.Body className="modal">
            <hr/>
            <center>
              <h4 className="modal2">总价：$AUD {this.SumUpEntirePrice()}</h4>
            </center>
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
                            <center><Label className="cust-label" bsStyle="info">当前拥有积分：{this.state.memberPoints}分</Label></center><br/>
                            <center><Label className="cust-label" bsStyle="danger">兑换积分不足</Label></center>
                        </div>
                      : null
                  }
                  {
                    this.state.memberExist === true && this.state.discount === 0 && this.state.memberPoints >= 100
                      ? <div>
                            <center><Label className="cust-label" bsStyle="info">当前拥有积分：{this.state.memberPoints}分</Label></center><br/>
                            <center><Label className="cust-label" bsStyle="info">共计可兑换：${this.state.memberDiscount}AUD</Label></center>
                        </div>
                      : null
                  }

                  {
                    this.state.memberExist === true && this.state.discount !== 0
                      ? <div>
                            <center><Label className="cust-label" bsStyle="info">剩余积分： {this.memberPointsCalculatorAfterRedeem()}分</Label></center>
                            <center><Label className="cust-label" bsStyle="info">结账之后积分：{this.memberPointsCalculatorAfterCheckout()}分</Label></center>
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

                <center><Button onClick={this.checkMembershipPoint}>查询积分</Button></center>
                {
                  this.state.memberPoints >= 100 && this.state.discount === 0
                    ? <center><Button onClick={this.redeemMembershipPoint}>兑换积分</Button></center>
                    : null
                }
                {
                  this.state.memberPoints >= 100 && this.state.discount !== 0
                    ? <center><Button bsStyle="success">兑换成功</Button></center>
                    : null
                }

                {
                  this.state.discount !== 0
                    ? <div>
                        <Label className="cust-label">{this.SumUpEntirePrice()}- {this.state.discount}</Label>
                        <Label className="cust-label" bsStyle="danger">总价 ：{this.sumAfterRedeem()}</Label>
                      </div>
                    : null
                }
              </div>

              <div className="col-lg-6 pull-left div-MembershipPoints">
                <center><p>调价管理</p></center>
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
                      <center><Button onClick={() => {this.verifyAuthentication()}}>登陆</Button></center>
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
                       <p className="cust-font">折后总价：{this.SumUpEntirePrice()} * {this.state.discountOptions}% = {this.discountedPrice() + "$"}</p>
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
