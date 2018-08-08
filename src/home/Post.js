import React, { Component } from 'react'
import { API } from '../config'

export default class Post extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.posts.map((post, index) => {
                    return (
                        <div className="post nova-margin nova-padding" key={index}>
                            <div className="meta-info">
                                <div className="user_logo">
                                    <img src="./static/img/car.jpeg" />
                                </div>
                                <div className="user-name">{post.type}</div>
                                <div className="tags">
                                    <div className="tag">2006</div>
                                    <div className="tag">$12000</div>
                                    <div className="tag">Save</div>
                                </div>
                                <div className="topic">{post.category}</div>
                                <div className="close">x</div>
                            </div>
                            <div className="title">{post.name}</div>
                            <div className="text-body">
                                {/*{post.content.substr(0,20) + "..."}*/}
                                {/* Only display fixed length content, when click 'more', full content will be displayed */}
                                <a href="#"> more</a>
                            </div>
                            <div className="pics">
                                {/*{post.urlImages.split(",").map((img, i) =>{*/}
                                    {/*return (<img className="col-sm-12 col-md-6 col-lg-4" src={API.baseUri+'upload/IMG/'+img} key={i}/>)*/}
                                {/*})}*/}
                            </div>
                            <div className="hidden"></div>
                            <div className="post-footer">
                                <div className="praise list">
                                    32 <i className="far fa-thumbs-up"></i>
                                </div>
                                <div className="comment list">
                                    <i className="far fa-comment"></i> 11 评论
                                </div>
                                <div className="favorit list"><i className="fas fa-star"></i> 收藏</div>
                                <div className="complain list"><i className="far fa-question-circle"></i> 举报</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
