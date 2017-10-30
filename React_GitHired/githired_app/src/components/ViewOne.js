import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

// BrowserRouter, Route,  Redirect - removed - react warnings 

import axios from 'axios';

class ViewOne extends Component {
	constructor(props) {
		super(props)

			this.state = {
				jobData: {},
				mode: 'view',
				redirect: false
			}

			this.onClickEdit = this.onClickEdit.bind(this);
			this.onClickDelete = this.onClickDelete.bind(this);
			this.onClickSave = this.onClickSave.bind(this);
			this.onChange = this.onChange.bind(this);
			this.redirectToViewAll = this.redirectToViewAll.bind(this);
	}

	componentDidMount() {
		axios.get(`http://localhost:8080/gitHired/find/${this.props.match.params.id}`)
		.then(response => {
			this.setState({jobData: response.data.oneJobData})
		})
	}


	onClickEdit(e) {
		e.preventDefault();
		this.setState({
			mode: 'edit'
		})
	}

	onClickDelete(id) {
		axios.delete(`http://localhost:8080/gitHired/${id}`)
      .then(res => {
        this.setState({
					redirect: true
				})
      })
	}

	redirectToViewAll() {

	}

	onClickSave(e){
		e.preventDefault();
		axios.post(`http://localhost:8080/gitHired/find/${this.state.jobData.id}/edit`, {
			searched_on: this.state.jobData.searched_on,
			job_id: this.state.jobData.job_id,
			created_at: this.state.jobData.created_at,
			title: this.state.jobData.title,
			location: this.state.jobData.location,
			type: this.state.jobData.type,
			description: this.state.jobData.description,
			how_to_apply: this.state.jobData.how_to_apply,
			company: this.state.jobData.company,
			company_url: this.state.jobData.company_url,
			company_logo: this.state.jobData.company_logo,
			url: this.state.jobData.url,
			contacted: parseInt(this.state.jobData.contacted, 10),
			contacted_on: this.state.jobData.contacted_on,
			contact_name: this.state.jobData.contact_name,
			contact_email: this.state.jobData.contact_email,
			contact_role: this.state.jobData.contact_role,
			contact_number: this.state.jobData.contact_number,
			applied: parseInt(this.state.jobData.applied, 10),
			applied_on: this.state.jobData.applied_on,
			notes: this.state.jobData.notes,
			date_of_last_edit: new Date()
		}).then(res => {
			this.setState({
				mode: "view"
			})
		})
	}

	onChange(e) {
		this.setState({
			jobData: {...this.state.jobData, [e.target.name]: e.target.value}
		})
	}

	render() {
		  return(
				<div>
				{ this.state.redirect &&
					<Redirect to='/' />
				}

				{ !this.state.redirect &&
					<div className="oneJobView">

						{this.state.mode === 'view' &&
							<div className="ViewOne">
									<div className="resultsHead">{this.state.jobData.searched_on}</div>
									<div className="resultsData">
									<div>Id: {this.state.jobData.job_id}</div>
									<div>Created at: {this.state.jobData.created_at}</div>
									<div>Title Job: {this.state.jobData.title}</div>
									<div>Location: {this.state.jobData.location}</div>
									<div>Type of contract: {this.state.jobData.type}</div>
									<div dangerouslySetInnerHTML={{ __html: this.state.jobData.description }} />
									<div>How to apply: {this.state.jobData.how_to_apply}</div>
									<div>Company: {this.state.jobData.company}</div>
									<div><a href={this.state.jobData.company_url}>Company Website</a></div>
									<div><img src={this.state.jobData.company_logo}/></div>
									<div><a href={this.state.jobData.url}>Job posting</a></div>
									<div>Contacted Y/N: {this.state.jobData.contacted}</div>
									<div>Date of last contact: {this.state.jobData.contacted_on}</div>
									<div>Contact name: {this.state.jobData.contact_name}</div>
									<div>Contact email: {this.state.jobData.contact_email}</div>
									<div>Contact position: {this.state.jobData.contact_role}</div>
									<div>Contact number: {this.state.jobData.contact_number}</div>
									<div>Applied Y/N: {this.state.jobData.applied}</div>
									<div>Date of application: {this.state.jobData.applied_on}</div>
									<div>Notes: {this.state.jobData.notes}</div>
								</div>

								<Link to="/" className="link">Your Saved Jobs</Link>
								<div className="viewOneButtons">
								<button className="submitButton" onClick={this.onClickEdit}>Edit Job</button>
								<button className="submitButton" onClick={() => {this.onClickDelete(this.state.jobData.id)}}>Delete Job</button>
								</div>
							</div>
						}

						{this.state.mode === 'edit' &&
							<div className="ViewOne">

								<div>
								<h2>Job Information</h2>

								<div>
									<label htmlFor="companyedit">Company:</label>
									<input id="companyedit" name='company' onChange={this.onChange} value={this.state.jobData.company||''} type='text' />
								</div>

									<label htmlFor="titleedit"> Job Title: </label>
									<input id="titleedit" name='title' onChange={this.onChange} value={this.state.jobData.title||''} type='text' />
								</div>

								<div>
									<label htmlFor="titleidedit">Job ID: </label>
									<input id= "titleidedit" name='job_id' onChange={this.onChange} value={this.state.jobData.job_id||''} type='text' />
								</div>

								<div>
									<label htmlFor="locationedit">Location: </label>
									<input id="locationedit" name='location' onChange={this.onChange} value={this.state.jobData.location||''} type='text' />
								</div>

								<div>
								<label htmlFor="typeedit">Type of contract:</label>
									<select id='typesearch' name='type' value={this.state.jobData.type||''} onChange={this.onChange}>
										<option defaultValue='true'>Full Time</option>
										<option value='false'>Full Time and Part Time</option>
									</select>
							</div>


								<div>
									<label htmlFor="descriptionedit">Description: </label>
									<input id="descriptionedit" name='description' onChange={this.onChange} value={this.state.jobData.description||''} type='text' />
								</div>


								<div>
									<label htmlFor="linkjobedit">Link to Jobs Posting:</label>
									<input id="linkjobedit" name='url' onChange={this.onChange} value={this.state.jobData.url||''} type='text' />
								</div>


								<div>
									<label htmlFor="datepostedit">Date of job posting:</label>
									<input id="datepostedit" type="date" name="created_at" value={this.state.jobData.created_at||''} onChange={this.onChange}/>
								</div>

								<div>
									<label htmlFor="howtoapplyedit">Link to Application:</label>
									<input id="howtoapplyedit" type="text" name="how_to_apply" value={this.state.jobData.how_to_apply||''} onChange={this.onChange}/>
								</div>


								<div>
									<label htmlFor="companyurledit">Company URL:</label>
									<input id="companyurledit" name='company_url' onChange={this.onChange} value={this.state.jobData.company_url||''} type='text' />
								</div>

								<div>
									<label htmlFor= "companylogoedit">Company Logo:</label>
									<input id="companylogoedit" name='company_logo' onChange={this.onChange} value={this.state.jobData.company_logo||''} type='text' />
								</div>


								<div>
									<label htmlFor="searchedonedit">Searched On:</label>
									<input id="searchedonedit" type="date" name="searched_on" value={this.state.jobData.searched_on||''} onChange={this.onChange}/>
								</div>

								<div>

								<label htmlFor="appliedonedit">Applied On:</label>
								<input id="appliedonedit" type="date" name="applied_on" value={this.state.jobData.applied_on||''} onChange={this.onChange}/>

								</div>

								<div>
								<label htmlFor="appliededit">Applied:</label>
								<select id='appliededit' name='applied' value={this.state.jobData.applied||''} onChange={this.onChange}>
									<option value='0'>No</option>
									<option value='1'>Yes</option>
								</select>
								</div>

								<div>
								<h2>Contact Information</h2>
									<label htmlFor= "nameedit">Contact Name:</label>
									<input id="nameedit" name='contact_name' onChange={this.onChange} value={this.state.jobData.contact_name||''} type='text' />
								</div>

								<div>
									<label htmlFor= "phonenumberedit">Contact Phone Number:</label>
									<input id= "phonenumberedit" name='contact_number' onChange={this.onChange} value={this.state.jobData.contact_number||''} type='text' />
								</div>

								<div>
									<label htmlFor= "emailedit">Contact Email:</label>
									<input id="emailedit" name='contact_email' onChange={this.onChange} value={this.state.jobData.contact_email||''} type='text' />
								</div>


								<div>
									<label htmlFor="rolecontactedit">Contact Role:</label>
									<input id="rolecontactedit" type="text" name="contact_role" value={this.state.jobData.contact_role||''} onChange={this.onChange}/>
								</div>


								<div>
								<label htmlFor="contactededit">Contacted:</label>
									<select id='contactededit' name='contacted' value={this.state.jobData.contacted||''} onChange={this.onChange}>
										<option value='0'>No</option>
										<option value='1'>Yes</option>
									</select>
								</div>

								<div>
									<label htmlFor="contactedonedit">Contacted On:</label>
									<input id="contactedonedit" type="date" name="contacted_on" value={this.state.jobData.contacted_on||''} onChange={this.onChange}/>
								</div>


								<br/>
								<div className="notes">
									<label htmlFor ="notesedit">Notes:</label>
									<textarea name='notes' id='notesedit' onChange={this.onChange} value={this.state.jobData.notes||''} cols="40" rows="8" /> <br/>
								</div>



								<Link to="/" className="link">Your Saved Jobs</Link>
								<button className="submitButtonEdit" onClick={this.onClickSave}>Save Changes</button>
							</div>
						}

					</div>
				}
				</div>


		  )

		}


}

export default ViewOne;
