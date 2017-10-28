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
			[e.target.name]: e.target.value
		})
	}

	onSubmit(event) {
		event.preventDefault();

		axios.post("http://localhost:8080/gitHired/create", {
				user_id: this.props.user.id,
				searched_on: this.state.searched_on,
				job_id: this.state.job_id,
				created_at: this.state.created_at,
				title: this.state.title,
				location: this.state.location,
				type: this.state.type,
				description: this.state.description,
				how_to_apply: this.state.how_to_apply,
				company: this.state.company,
				company_url: this.state.company_url,
				company_logo: this.state.company_logo,
				url: this.state.url,
				contacted: parseInt(this.state.contacted),
				contacted_on: this.state.contacted_on,
				contact_name: this.state.contact_name,
				contact_email: this.state.contact_email,
				contact_role: this.state.contact_role,
				contact_number: this.state.contact_number,
				applied: parseInt(this.state.applied),
				applied_on: this.state.applied_on,
				notes: this.state.notes,
				date_of_last_edit: new Date()
		}).then(response => {
			this.setState({
				isSubmitted: true
			})
		}).catch(err => {console.log('err', err)});
	}

	render() {
		return (
			<div className="makejob">

				{this.state.isSubmitted === true &&
					<Redirect to="/" />
				}

				{this.state.isSubmitted === false &&

					<form onSubmit={this.onSubmit}>

						<h2>Job Information</h2>

						<div className="jobinfo">
							<label htmlFor="companynew">Company:</label>
							<input id="companynew" type="text" name="company" value={this.state.company} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="titlenew">Job Title:</label>
							<input id="titlenew" type="text" name="title" value={this.state.title} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="titleidnew">Job ID:</label>
							<input id="titleidnew" type="text" name="job_id" value={this.state.job_id} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="locationnew">Location:</label>
							<input id="locationnew" type="text" name="location" value={this.state.location} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="typenew">Type of contract:</label>
								<select id='typesearch' name='type' value={this.state.type} onChange={this.onChange}>
									<option defaultValue='true'>Full Time</option>
									<option value='false'>Full Time and Part Time</option>
								</select>
						</div>

						<div>
							<label htmlFor="descriptionnew">Description:</label>
							<input id="descriptionnew" type="text" name="description" value={this.state.description} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="linkjobnew">Link to Jobs Posting:</label>
							<input id="linkjobnew" type="text" name="url" value={this.state.url} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="datepostnew">Date of job posting:</label>
							<input id="datepostnew" type="date" name="created_at" value={this.state.created_at} onChange={this.onChange}/>
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
							<label htmlFor="searchedonnew">Searched On:</label>
							<input id="searchedonnew" type="date" name="searched_on" value={this.state.searched_on} onChange={this.onChange}/>
						</div>

						<div>

							<label htmlFor="appliedonnew">Applied On:</label>
							<input id="appliedonnew" type="date" name="searched_on" value={this.state.searched_on} onChange={this.onChange}/>

						</div>

						<div>
							<label htmlFor="appliednew">Applied:</label>
							<select id='appliednew' name='applied' value={this.state.applied} onChange={this.onChangeContacted}>
								<option defaultValue='0'>No</option>
								<option value='1'>Yes</option>
							</select>
						</div>
						<h2>Contact Information</h2>

						<div className = "contact">
							<label htmlFor="namenew">Contact Name:</label>
							<input id="namenew" type="text" name="contact_name" value={this.state.contact_name} onChange={this.onChange}/>
						</div>

						<div>

							<label htmlFor="phonenumbernew">Contact Phone Number:</label>
							<input id="phonenumbernew" type="text" name="contact_number" value={this.state.contact_number} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="emailnew">Contact Email:</label>
							<input id="emailnew" type="text" name="contact_email" value={this.state.contact_email} onChange={this.onChange}/>

						</div>

						<div>
							<label htmlFor="rolecontactnew">Contact Role:</label>
							<input id="rolecontactnew" type="text" name="contact_role" value={this.state.contact_role} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="contactednew">Contacted:</label>
								<select id='contactednew' name='contacted' value={this.state.contacted} onChange={this.onChangeContacted}>
									<option defaultValue='0'>No</option>
									<option value='1'>Yes</option>
								</select>
						</div>

						<div>
							<label htmlFor="contactedonnew">Contacted On:</label>
							<input id="contactedonnew" type="date" name="contacted_on" value={this.state.contacted_on} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor="notesnew">Notes:</label>
							<input id="notesnew" type="text" name="notes" value={this.state.notes} onChange={this.onChange}/>
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
