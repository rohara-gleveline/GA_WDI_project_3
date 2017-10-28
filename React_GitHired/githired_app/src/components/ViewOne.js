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
		axios.get(`http://localhost:8080/gitHired/${this.props.user.id}`)
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

		
		const {searched_on, job_id, created_at, title, location, type, description, how_to_apply, company, company_url, company_logo, url, contacted, contacted_on, 
			contact_name, contact_email, contact_role, contact_number, applied, applied_on, notes, date_of_last_edit} = this.state;
		axios.post(`http://localhost:8080/gitHired/${this.props.user.id}/edit`, {
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
							<div>{this.state.jobData.searched_on}</div>
							<div>{this.state.jobData.job_id}</div>
							<div>{this.state.jobData.created_at}</div>
							<div>{this.state.jobData.title}</div>
							<div>{this.state.jobData.location}</div>
							<div>{this.state.jobData.type}</div>
							<div>{this.state.jobData.description}</div>
							<div>{this.state.jobData.how_to_apply}</div>
							<div>{this.state.jobData.company}</div>
							<div>{this.state.jobData.company_url}</div>
							<div>{this.state.jobData.company_logo}</div>
							<div>{this.state.jobData.url}</div>
							<div>{this.state.jobData.contacted}</div>
							<div>{this.state.jobData.contacted_on}</div>
							<div>{this.state.jobData.contact_name}</div>
							<div>{this.state.jobData.contact_email}</div>
							<div>{this.state.jobData.contact_role}</div>
							<div>{this.state.jobData.contact_number}</div>
							<div>{this.state.jobData.applied}</div>
							<div>{this.state.jobData.applied_on}</div>
							<div>{this.state.jobData.notes}</div>

							<Link to="/">Your Saved Jobs</Link>
							<button onClick={this.onClickEdit}>Edit Job</button>
							<button onClick={this.onClickDelete}>Delete Job</button>
						</div>
					}

					{this.state.mode === 'edit' &&
						<div className="EditOne">

							<div>
							<h2>Job Information</h2>

							<div>
								<label htmlFor="companyedit">Company:</label>
								<input id="companyedit" name='company' onChange={this.onChange} value={this.state.jobData.company} type='text' />
							</div>

								<label htmlFor="titleedit"> Job Title: </label>
								<input id="titleedit" name='title' onChange={this.onChange} value={this.state.jobData.title} type='text' />
							</div>

							<div>
								<label htmlFor="titleidedit">Job ID: </label>
								<input id= "titleidedit" name='job_id' onChange={this.onChange} value={this.state.jobData.location} type='text' />
							</div>

							<div>
								<label htmlFor="locationedit">Location: </label>
								<input id="locationedit" name='location' onChange={this.onChange} value={this.state.jobData.location} type='text' />
							</div>

							<div>
							<label htmlFor="typeedit">Type of contract:</label>
								<select id='typesearch' name='type' value={this.state.type} onChange={this.onChange}>
									<option defaultValue='true'>Full Time</option>
									<option value='false'>Full Time and Part Time</option>
								</select>
						</div>


							<div>
								<label htmlFor="descriptionedit">Description: </label>
								<input id="descriptionedit" name='description' onChange={this.onChange} value={this.state.jobData.description} type='text' />
							</div>


							<div>
								<label htmlFor="linkjobedit">Link to Jobs Posting:</label>
								<input id="linkjobedit" name='url' onChange={this.onChange} value={this.state.jobData.url} type='text' />
							</div>

							
							<div>
								<label htmlFor="datepostedit">Date of job posting:</label>
								<input id="datepostedit" type="date" name="created_at" value={this.state.jobData.created_at} onChange={this.onChange}/>
							</div>

							<div>
								<label htmlFor="howtoapplyedit">Link to Application:</label>
								<input id="howtoapplyedit" type="text" name="how_to_apply" value={this.state.jobData.how_to_apply} onChange={this.onChange}/>
							</div>


							<div>
								<label htmlFor="companyurledit">Company URL:</label>
								<input id="companyurledit" name='company_url' onChange={this.onChange} value={this.state.jobData.company_url} type='text' />
							</div>

							<div>
								<label htmlFor= "companylogoedit">Company Logo:</label>
								<input id="companylogoedit" name='company_logo' onChange={this.onChange} value={this.state.jobData.company_logo} type='text' />
							</div>


							<div>
								<label htmlFor="searchedonedit">Searched On:</label>
								<input id="searchedonedit" type="date" name="searched_on" value={this.state.jobData.searched_on} onChange={this.onChange}/>
							</div>
							
							<div>

							<label htmlFor="appliedonedit">Applied On:</label>
							<input id="appliedonedit" type="date" name="applied_on" value={this.state.jobData.applied_on} onChange={this.onChange}/>

							</div>

							<div>
							<label htmlFor="appliededit">Applied:</label>
							<select id='appliededit' name='applied' value={this.state.jobData.applied} onChange={this.onChange}>
								<option value='0'>No</option>
								<option value='1'>Yes</option>
							</select>
							</div>

							<div>
							<h2>Contact Information</h2>
								<label htmlFor= "nameedit">Contact Name:</label>
								<input id="nameedit" name='contact_name' onChange={this.onChange} value={this.state.jobData.contact_name} type='text' />
							</div>

							<div>
								<label htmlFor= "phonenumberedit">Contact Phone Number:</label>
								<input id= "phonenumberedit" name='contact_number' onChange={this.onChange} value={this.state.jobData.contact_number} type='text' />
							</div>

							<div>
								<label htmlFor= "emailedit">Contact Email:</label>
								<input id="emailedit" name='contact_email' onChange={this.onChange} value={this.state.jobData.contact_email} type='text' />
							</div>


							<div>
								<label htmlFor="rolecontactedit">Contact Role:</label>
								<input id="rolecontactedit" type="text" name="contact_role" value={this.state.jobData.contact_role} onChange={this.onChange}/>
							</div>


							<div>
							<label htmlFor="contactededit">Contacted:</label>
								<select id='contactededit' name='contacted' value={this.state.jobData.contacted} onChange={this.onChange}>
									<option value='0'>No</option>
									<option value='1'>Yes</option>
								</select>
							</div>

							<div>
								<label htmlFor="contactedonedit">Contacted On:</label>
								<input id="contactedonedit" type="date" name="contacted_on" value={this.state.jobData.contacted_on} onChange={this.onChange}/>
							</div>


							<br/>
							<div>
								<label htmlFor ="notesedit">Notes:</label>
								<textarea name='notes' id='notesedit' onChange={this.onChange} value={this.state.jobData.notes} cols="40" rows="8" /> <br/>
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
