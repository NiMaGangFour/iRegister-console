import React, { Component } from 'react'
import { Link} from 'react-router-dom'


export default class Personal extends Component {
    render() {
        return (
            <div className="profile  nova-margin nova-padding nova-card cust-border">
                外卖
                <hr />
                <ul>
                    <li><Link to="/personal/favorit"><i className="fas fa-heart"></i> 我的收藏</Link></li>

                    <li><Link to="/personal/comment"><i className="fas fa-comment"></i> 我的评论</Link></li>
                    <li><Link to="/personal/post"><i className="fas fa-list-ul"></i> 我的发帖</Link></li>

                </ul>
            </div>
        )
    }
}
