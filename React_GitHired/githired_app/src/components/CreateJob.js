import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';

class CreateJob extends Component {

	constructor(props) {
		super(props);

		this.state = {
				searched_on: '',
				job_id: '',
				created_at: '',
				title: '',
				location: '',
				type: '',
				description: '',
				how_to_apply: '',
				company: '',
				company_url: '',
				company_logo: '',
				url: '',
				contacted: '',
				contacted_on: '',
				contact_name: '',
				contact_email: '',
				contact_role: '',
				contact_number: '',
				applied: '',
				applied_on: '',
				notes: '',
				date_of_last_edit: '',

				isSubmitted: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit= this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			newJobs: {...this.state.newJobs, [e.target.name]: e.target.value}
		})
	}

	onSubmit(event) {
		event.preventDefault();
		const {company, title, location, type, linkToJobs, how_to_apply, company_url, company_logo, url, name, phoneNumber, email, notes} = this.state;
		axios.post("http://localhost:8080/gitHired/create", {
				user_id: this.props.user.id,
				searched_on: ,
				job_id: ,
				created_at: ,
				title: this.state.title, x
				location: this.state.location, x
				type: this.state.type,
				description: this.state.description,
				how_to_apply: this.state.how_to_apply, x
				company: this.state.company, x
				company_url: this.state.company_url, x
				company_logo: this.state.company_logo, x
				url: this.state.url, x
				contacted: '',
				contacted_on: '',
				contact_name: '',
				contact_email: '',
				contact_role: '',
				contact_number: '',
				applied: '',
				applied_on: '',
				notes: '',
				date_of_last_edit: ''
		}).then(response => {
			this.setState({
				isSubmitted:true
			})
		});
	}

	render() {
		return (
			<div className="makejob">

				{this.state.isSubmitted === true &&
					<Redirect to="/" />
				}

				{this.state.isSubmitted === false &&

					<form onSubmit={this.onSubmit}>

						<div className="jobinfo">
						<h2>Job Information</h2>
							<label htmlFor="companynew">Company:</label>
							<input id="companynew" type="text" name="company" value={this.state.company} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="titlenew">Job Title:</label>
							<input id="titlenew" type="text" name="title" value={this.state.title} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="locationnew">Location:</label>
							<input id="locationnew" type="text" name="location" value={this.state.location} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="typenew">Type:</label>
							<input id="typenew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="descriptionnew">Description:</label>
							<input id="descriptionnew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="linkjobnew">Link to Jobs Posting:</label>
							<input id="linkjobnew" type="text" name="url" value={this.state.url} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="howtoapplynew">Link to Application:</label>
							<input id="howtoapplynew" type="text" name="how_to_apply" value={this.state.how_to_apply} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="companyurlnew">Company URL:</label>
							<input id="companyurlnew" type="text" name="company_url" value={this.state.company_url} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="companylogonew">Company Logo:</label>
							<input id="companylogonew" type="text" name="company_logo" value={this.state.company_logo} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="urlnew">URL:</label>
							<input id="urlnew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>

						<div className = "contact">
							<h2>Contact Information</h2>
							<label htmlFor="namenew">Contact Name:</label>
							<input id="namenew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="phonenumbernew">Contact Phone Number:</label>
							<input id="phonenumbernew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="emailnew">Contact Email:</label>
							<input id="emailnew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>
							<br/>
						<div>
							<label htmlFor="notesnew">Notes:</label>
							<input id="notesnew" type="text" name="" value={this.state.} onChange={this.onChange}/>
						</div>

						<div>
							<input type="submit" value="Submit"/>
						</div>

					</form>
				}

			</div>

			)
	}

}

export default CreateJob;
