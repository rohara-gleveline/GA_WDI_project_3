import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import '../App.css';
import axios from 'axios';
import Cookies from '../helpers/Cookies';

import UserAuth from './UserAuth';
import Content from './Content';
import Header from './Header';
import ViewOne from './ViewOne';
import CreateJob from './CreateJob';

import ViewResults from './ViewResults';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: false,
      mode: 'loading',
      url: 'http://localhost:8080'
    }
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount(){
    this.initUser();
  }

  initUser(){
    const token = Cookies.get('token');

    if(token && token !== ''){
      axios.get(`${this.state.url}/users/validate`, {
        params: {auth_token: token}})
        .then(res => {
          this.setState({user: res.data, mode: 'content'});
        })
        .catch(err => {
          Cookies.set('token', '')
          this.setState({user: false, mode: 'auth'});
        })
    } else {
      this.setState({mode: 'auth'});
    }
  }

  setUser(user){
    Cookies.set('token', user.token);
    this.setState({user: user, mode: 'content'});
  }

  logout(){
    Cookies.set('token', '');
    this.setState({user: false, mode: 'auth'});
  }

  renderView(){
    if(this.state.mode === 'loading'){
      return(
        <div className="loading">
          <img src="https://s-media-cache-ak0.pinimg.com/originals/8b/a8/ce/8ba8ce24910d7b2f4c147359a82d50ef.gif"
            alt="loading" />
        </div>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else if(this.state.mode === 'content') {
      return (
        <Content
          user={this.state.user}
          isSearch={false}
        />
      )
    }
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">

         {this.state.mode === 'content' &&
            <Header user={this.state.user}
                  logout={this.logout}/>
         }

         <Route exact path="/"
                 render= {this.renderView} />

         <Route exact path="/search"
                render= {() =>
                  <Content isSearch={true} />
         } />

         <Route exact path="/ViewOne/:id"
                component= {ViewOne} />

          <Route exact path="/create"
                render= {() =>
                  <CreateJob user={this.state.user} />} />
          </div>

      </BrowserRouter>
    );
  }
}

export default App;
