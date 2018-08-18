import React, { Component } from 'react'
import NavBar from './NavBar'
import Router from './Router'
import './App.css'

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Router />
            </div>
        )
    }
}

export default App;
