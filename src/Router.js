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




const Router = () =>{
    return(
        <div className="">
            <div className="row">
                <LeftInfo />
                <div className="col-sm-12 col-lg-10 pull-right">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/post/newpost' component={NewPost} />
                        <Route exact path='/tieba' component={Tieba} />
                        <Route exact path='/auth/email' component={Email} />
                        <Route exact path='/auth/google' component={Google} />
                        <Route exact path='/personal/post' component={MyPost} />
                        <Route exact path='/personal/favorit' component={MyFavorit} />
                        <Route exact path='/personal/comment' component={MyComment} />

                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default Router