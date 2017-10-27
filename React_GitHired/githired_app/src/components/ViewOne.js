import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';

class ViewOne extends Component {
	constructor(props) {
		super(props)

			this.state = {
				jobData: {},
				mode: 'view'
			}

			this.onClickEdit = this.onClickEdit.bind(this);
			this.onClickDelete = this.onClickDelete.bind(this);
			this.onClickSave = this.onClickSave.bind(this);
			this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		axios.get(`http://localhost:8080/gitHired/${this.props.match.params.id}`)
		.then(response => {
			console.log(response.data.oneJobData);
			this.setState({jobData: response.data.oneJobData})
		})
	}


	onClickEdit(e) {
		e.preventDefault();
		this.setState({
			mode: 'edit'
		})
	}

	onClickDelete(e) {
		e.preventDefault();


	}

	onClickSave(e){
		e.preventDefault();
		const {company, title, location, type, linkToJobs} = this.state;
		axios.post("http://localhost:8080/gitHired/edit", {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			type: this.state.type,
			description: this.state.description,
			how_to_apply: this.state.how_to_apply,
			company_url: this.state.company_url,
			company_logo: this.state.company_logo,
			github_jobs_url: this.state.github_jobs_url
		})
	}

	onChange(e) {
		this.setState({
			jobData: {...this.state.jobData, [e.target.name]: e.target.value}
		})

	}

	render() {
		  return(
				<div className="oneJobView">

					{this.state.mode === 'view' &&
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

							<Link to="/">Your Saved Jobs</Link>
							<button onClick={this.onClickEdit}>Edit Job</button>
							<button onClick={this.onClickDelete}>Delete Job</button>
						</div>
					}

					{this.state.mode === 'edit' &&
						<div className="EditOne">

							<div>
								<label>Title</label>
								<input name='title' onChange={this.onChange} value={this.state.jobData.title} type='text' />
							</div>

							<div>
								<label>Location</label>
								<input name='location' onChange={this.onChange} value={this.state.jobData.location} type='text' />
							</div>

							<div>
								<label>Type</label>
								<input name='type' onChange={this.onChange} value={this.state.jobData.type} type='text' />
							</div>

							<div>
								<label>Description</label>
								<input name='description' onChange={this.onChange} value={this.state.jobData.description} type='text' />
							</div>

							<div>
								<label>How to apply</label>
								<input name='how_to_apply' onChange={this.onChange} value={this.state.jobData.how_to_apply} type='text' />
							</div>

							<div>
								<label>Company</label>
								<input name='company' onChange={this.onChange} value={this.state.jobData.company} type='text' />
							</div>

							<div>
								<label>Company website</label>
								<input name='company_url' onChange={this.onChange} value={this.state.jobData.company_url} type='text' />
							</div>

							<div>
								<label>Company logo url</label>
								<input name='company_logo' onChange={this.onChange} value={this.state.jobData.company_logo} type='text' />
							</div>

							<div>
								<label>Job Description Page</label>
								<input name='github_jobs_url' onChange={this.onChange} value={this.state.jobData.github_jobs_url} type='text' />
							</div>


							<Link to="/">Your Saved Jobs</Link>
							<button onClick={this.onClickSave}>Save Changes</button>
						</div>
					}

				</div>


		  )
	
		}


}

export default ViewOne;
