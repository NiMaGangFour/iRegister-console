import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Home from './home/Home'
import LeftInfo from './home/LeftInfo'
import NewPost from './home/NewPost'
import Email from './auth/Email'
import Google from './auth/Google'
import MyPost from './personal/MyPost'
import MyFavorit from './personal/MyFavorit'
import MyComment from './personal/MyComment'
import Tieba from './tieba/Tieba'
import Dishes from './home/Dishes'
import CheckDishes from './home/CheckDishes'
import CheckBookings from './home/CheckBookings'
import DeliverOrders from './home/DeliverOrders'
import AdminLogin from './home/AdminLogin'
import AdminMainPage from './home/AdminMainPage'
import AllCurrentOrders from './home/AllCurrentOrders'
import AllTodayFinishedOrders from './home/AllTodayFinishedOrders'
import CheckBookingsDetails from './home/CheckBookingsDetails'
import Login from './auth/Login'



const Router = () =>{
    return(
        <div className="">
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/post/newpost' component={NewPost} />

                <Route exact path='/auth/email' component={Email} />
                <Route exact path='/auth/google' component={Google} />
                <Route exact path='/personal/post' component={MyPost} />
                <Route exact path='/personal/favorit' component={MyFavorit} />
                <Route exact path='/personal/comment' component={MyComment} />
                <Route exact path='/home/CheckDishes/:tableid?/:orderid?' component={CheckDishes} />
                <Route exact path='/home/Dishes/:tableid' component={Dishes}/>
                <Route exact path='/home/CheckBookings/:tableid' component={CheckBookings}/>
                <Route exact path='/home/DeliverOrders/:orderid' component={DeliverOrders}/>
                <Route exact path='/home/AdminLogin/' component={AdminLogin}/>
                <Route exact path='/home/AdminMainPage/' component={AdminMainPage}/>
                <Route exact path='/home/AllCurrentOrders/' component={AllCurrentOrders}/>
                <Route exact path='/home/AllTodayFinishedOrders/' component={AllTodayFinishedOrders}/>
                <Route exact path='/home/CheckBookingsDetails/:tableid' component={CheckBookingsDetails}/>
                <Route exact path='/' component={Login}/>
            </Switch>
        </div>
    )
}
export default Router
