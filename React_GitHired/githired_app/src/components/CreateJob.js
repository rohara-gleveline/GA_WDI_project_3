import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';

class CreateJob extends Component {

	constructor(props) {
		super(props);

		this.state = {
			company : '',
			title: '',
			location: '',
			type: '',
			description: '',
			linkToJobs: '',
			how_to_apply: '',
			company_url: '',
			company_logo: '',
			url: '',
			name: '',
			phoneNumber: [],
			email: '',
			isSubmitted: false
		}

		this.onChangeCompany = this.onChangeCompany.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeLocation = this.onChangeLocation.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeLinkToJobs = this.onChangeLinkToJobs.bind(this);
		this.onChangeHowToApply = this.onChangeHowToApply.bind(this);
		this.onChangeCompanyURL = this.onChangeCompanyURL.bind(this);
		this.onChangeCompanyLogo = this.onChangeCompanyLogo.bind(this);
		this.onChangeURL = this.onChangeURL.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onSubmit= this.onSubmit.bind(this);
	}

	onChangeCompany(event) {
		this.setState({company: event.target.value});
	}

	onChangeTitle(event) {
		this.setState({title: event.target.value});
	}

	onChangeLocation(event) {
		this.setState({location: event.target.value});
	}

	onChangeType(event) {
		this.setState({type: event.target.value});
	}

	onChangeDescription(event) {
		this.setState({description: event.target.value})
	}

	onChangeLinkToJobs(event) {
		this.setState({ linkToJobs: event.target.value});
	}

	onChangeHowToApply(event) {
		this.setState({ how_to_apply: event.target.value});
	}

	onChangeCompanyURL(event) {
		this.setState({ company_url: event.target.value});
	}

	onChangeCompanyLogo(event) {
		this.setState({ company_logo: event.target.value});
	}

	onChangeURL(event) {
		this.setState({ url: event.target.value});
	}

	onChangeName(event) {
		this.setState({ name: event.target.value});
	}


	onChangePhoneNumber(event) {
		this.setState({ phoneNumber: event.target.value});
	}

	onChangeEmail(event) {
		this.setState({ email: event.target.value});
	}

	onChangeNotes(event) {
		this.setState({ notes: event.target.value });
	}

	


	onSubmit(event) {
		event.preventDefault();
		const {company, title, location, type, linkToJobs, how_to_apply, company_url, company_logo, github_jobs_url, name, phoneNumber, email, notes} = this.state;
		axios.post("http://localhost:8080/gitHired/create", {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			type: this.state.type,
			description: this.state.description,
			linkToJobs: this.state.linkToJobs,
			how_to_apply: this.state.how_to_apply,
			company_url: this.state.company_url,
			company_logo: this.state.company_logo,
			github_jobs_url: this.state.github_jobs_url,
			name: this.state.name,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
			notes: this.state.notes
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
							<label for="companynew">Company:</label>
							<input id="companynew" type="text" onChange={this.onChangeCompany}/>
						</div>

						<div>
							<label for="titlenew">Title:</label>
							<input id="titlenew" type="text" onChange={this.onChangeTitle}/>
						</div>

						<div>
							<label for="locationnew">Location:</label>
							<input id="locationnew" type="text" onChange={this.onChangeLocation}/>
						</div>

						<div>
							<label for="typenew">Type:</label>
							<input id="typenew" type="text" onChange={this.onChangeType}/>
						</div>

						<div>
							<label for="descriptionnew">Description:</label>
							<input id="descriptionnew" type="text" onChange={this.onChangeDescription}/>
						</div>

						<div>
							<label for="linkjobnew">Link to Jobs:</label>
							<input id="linkjobnew" type="text" onChange={this.onChangeLinkToJobs}/>
						</div>

						<div>
							<label for="howtoapplynew">How To Apply:</label>
							<input id="howtoapplynew" type="text" onChange={this.onChangeHowToApply}/>
						</div>

						<div>
							<label for="companyurlnew">Company Website:</label>
							<input id="companyurlnew" type="text" onChange={this.onChangeCompanyURL}/>
						</div>

						<div>
							<label for="companylogonew">Company Logo:</label>
							<input id="companylogonew" type="text" onChange={this.onChangeCompanyLogo}/>
						</div>

						<div>
							<label for="urlnew">Job Description Page:</label>
							<input id="urlnew" type="text" onChange={this.onChangeURL}/>
						</div>

						<div className = "contact">
							<h2>Contact Information</h2>
							<label for="namenew">Contact Name:</label>
							<input id="namenew" type="text" onChange={this.onChangeName}/>
						</div>

						<div>
							<label for="phonenumbernew">Phone Number:</label>
							<input id="phonenumbernew" type="text" onChange={this.onChangePhoneNumber}/>
						</div>

						<div>
							<label for="emailnew">Email:</label>
							<input id="emailnew" type="text" onChange={this.onChangeEmail}/>
						</div>
							<br/>
						<div>
							<label for="notesnew">Notes:</label>
							<input id="notesnew" type="text" onChange={this.onChangeNotes}/>
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
