import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import userTags from './../userTags/userTags';
import addUser from './../userAnalysis/addUser'
import butto from './../button'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={userTags}/>
                    <Route path='/butto' component={butto}/>
                    <Route path='/userAnalysis/addUser' component={addUser}/>

                </Switch>
            </HashRouter>
            
        )
    }
}

export default Router;