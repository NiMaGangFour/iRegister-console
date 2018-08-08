import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LeftInfo from './LeftInfo'
import NewPost from './NewPost'
import Dishes from './Dishes'
import { API } from '../config'
// import { Map } from 'immutable'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {posts: []}
    }
    componentDidMount(){
        this.getData()
    }
    getData() {
        console.log(API.baseUri+API.initPosts)
        fetch(API.baseUri+API.initPosts)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else console.log("Get data error ");
            }).then((json) =>{
            console.log(json)
            this.setState({posts: json})
        }).catch((error) => {
            console.log('error on .catch', error);
        });
    }

    render() {
        return (
            <div>
                <div>桌号</div>
                <div>

                </div>
                {/* <!-- Top service filter nav bar --> */}
                {/*<div className="nova-margin">*/}
                    {/*<div className="nova-padding service-header">*/}
                        {/*/!* Filter posts using these buttons *!/*/}
                        {/*<div className="service"><i className="fa fa-home"></i>租房信息</div>*/}
                        {/*<div className="service"><i className="fa fa-car"></i>车辆交易</div>*/}
                        {/*<div className="service"><i className="fab fa-sellcast"></i>二手信息</div>*/}
                        {/*<div className="service"><i className="fa fa-newspaper"></i>生活服务</div>*/}
                        {/*/!*<div className="service"><Link to='/post/newpost'><i className="far fa-edit"></i>发布</Link></div>*!/*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/*<div className="nova-margin">*/}
                    {/*<div className="nova-padding filter">*/}
                        {/*<ul>*/}
                            {/*<li className="choose">出租</li>*/}
                            {/*<li>求租</li>*/}
                            {/*<li className="choose">长租</li>*/}
                            {/*<li>临时</li>*/}
                            {/*<div className="input-group">*/}
                                {/*<input type="text" className="form-control" placeholder="关键词筛选..."/>*/}
                                {/*<span className="input-group-btn">*/}
                                  {/*<button className="btn btn-default" type="button">筛选</button>*/}
                              {/*</span>*/}
                            {/*</div>*/}
                        {/*</ul>*/}

                    {/*</div>*/}

                {/*</div>*/}
                {/*<div className="posts nova-margin">*/}
                    {/*Post posts={this.state.posts} />*/}
                    <Dishes />
                {/*</div>*/}
            </div>
        )
    }
}
