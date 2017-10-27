import React, {Component} from 'react';

class Header extends Component {

  render() {
    console.log(this.props.user);
    return (
      <div className = "header">
      <div className="logo">
        <h2>GitIt</h2>
        <div className="username">{this.props.user.first_name} {this.props.user.last_name}</div>
        </div>
        <div><button  className="form-button" onClick={this.props.logout}>Log out</button></div>
      </div>
    )
  }

}

export default Header;
