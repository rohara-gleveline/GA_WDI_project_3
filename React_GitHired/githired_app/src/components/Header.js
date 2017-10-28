import React, {Component} from 'react';

class Header extends Component {

  render() {
    return (
      <div className = "header">
      <div className="logo">
        <h1 className="appName">GitHired</h1>
        <div className="username"><em>{this.props.user.first_name} {this.props.user.last_name}</em></div>
        </div>
        <div className="logout-button" onClick={this.props.logout}>Log out </div>
      </div>
    )
  }

}

export default Header;
