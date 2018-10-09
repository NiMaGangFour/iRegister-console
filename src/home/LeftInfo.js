import React, { Component } from 'react'
import AuthOptions from '../auth/AuthOptions'
import Personal from '../personal/Personal'
import './Home.css'

export default class LeftInfo extends Component {
    render() {
        return (
            <div className="col-sm-12 col-lg-2" >
                <AuthOptions />
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
        )
    }
}
