import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import userTags from './../userTags/userTags';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state={
         
        }
      }
    
    componentDidMount(){
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" component={userTags}>
                    </Route>
                </Switch>
            </HashRouter>
            
        )
    }
}

export default Router;