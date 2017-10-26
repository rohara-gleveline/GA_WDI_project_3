import React, {Component} from 'react';

class Header extends Component {

  render() {
    return (
      <div className = "header">
        <div className="username">{this.props.user.first_name} {this.props.user.last_name}</div>
        <div className="logoutBtn"><button onClick={this.props.logout}>Click here to log out!</button></div>
      </div>
    )
  }

}

export default Header;
