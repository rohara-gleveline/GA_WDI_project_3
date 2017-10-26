import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';

class ViewOne extends Component {
	constructor(props) {
		super(props)

			this.state = {
				jobData: {}
			}

	}

	componentDidMount() {
		axios.get(`http://localhost:8080/gitHired/${this.props.match.params.id}`)
		.then(response => {
			console.log(response.data.oneJobData);
			this.setState({jobData: response.data.oneJobData})
		})
	}

	render() {
		  return(
		    <div className="ViewOne">
					<div>{this.state.jobData.title}</div>
					<div>{this.state.jobData.location}</div>
					<div>{this.state.jobData.type}</div>
					<div>{this.state.jobData.description}</div>
					<div>{this.state.jobData.how_to_apply}</div>
					<div>{this.state.jobData.company}</div>
					<div>{this.state.jobData.company_url}</div>
					<div>{this.state.jobData.company_logo}</div>
					<div>{this.state.jobData.github_jobs_url}</div>

					<Link to="/gitHired">Your Saved Jobs</Link>
					<button onClick={this.onClickEdit}>Edit Job</button>
					<button onClick={this.onClickDelete}>Delete Job</button>
		    </div>
		  )
	}



}

export default ViewOne;
