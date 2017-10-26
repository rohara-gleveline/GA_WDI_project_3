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
			linkToJobs: '',
			isSubmitted: false
		}

		this.onChangeCompany = this.onChangeCompany.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeLocation = this.onChangeLocation.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeLinkToJobs = this.onChangeLinkToJobs.bind(this);
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

	onChangeLinkToJobs(event) {
		this.setState({ linkToJobs: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();
		const {company, title, location, type, linkToJobs} = this.state;
		axios.post("http://localhost:8080/gitHired/create", {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			type: this.state.type,
			linkToJobs: this.state.linkToJobs
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

						<div>
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
							<label for="linkjobnew">Link to Jobs:</label>
							<input id="linkjobnew" type="text" onChange={this.onChangeLinkToJobs}/>
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
