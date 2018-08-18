import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LeftInfo from './LeftInfo'
import NewPost from './NewPost'
import Dishes from './Dishes'
import CheckDishes from './CheckDishes'
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

                <div>

                </div>

                    <CheckDishes />

            </div>
        )
    }
}
