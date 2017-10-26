import React, {Component} from 'react';

class Header extends Component {

<<<<<<< HEAD
  render() {
    return (
      <div className = "header">
        <div className="username">{this.props.first_name} {this.props.last_name}</div>
        <div className="logoutBtn"><button onClick={this.props.logout}>Click here to log out!</button></div>
      </div>
    )
  }

}

export default Header;
=======




render() {
	return (

	<div className = "header"> 

		<div className="username">{this.props.first_name} {this.props.last_name}</div>
		<div className="logoutBtn"><button onClick={this.props.logout}>Click here to log out!</button></div>

	</div>

		)

}

}







export default Header;






>>>>>>> e92c6abef043c48b7d40a6ba58e186ee79732cd3
