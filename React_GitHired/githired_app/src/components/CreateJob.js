import react, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';

class CreateJob extends Component {
	constructor(props) {
		super(props)
		this.state = {
			company : "",
			title: "",
			location: "",
			type: "",
			linkToJobs: "",
		}

		this.onChangeCompany = this.onChangeCompany.bind(this);
		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeLocation = this.onChangeLocation.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeLinkToJobs = this.onChangeLinkToJobs.bind(this);
		this.onSubmit= this.onSubmit.bind(this);
	}


	onChangeCompany(event) {
		event.preventDefault();
		this.setState({company: event.target.company });
	}

	onChangeTitle(event) {
		event.preventDefault();
		this.setState({title: event.target.title });
	}

	onChangeLocation(event) {
		event.preventDefault();
		this.setState({location: event.target.location });
	}

	onChangeType(event) {
		event.preventDefault();
		this.setState({type: event.target.type });
	}

	onChangeLinkToJobs(event) {
		event.preventDefault();
		this.setState({ linkToJobs: event.target.linkToJobs });
	}

	onSubmit(event) {
		event.preventDefault();
		const {company, title, location, type, linkToJobs} = this.state;
		axios.post("http://localhost:8080/gitHired", {
			company: company,
			title: title,
			location: location,
			type: type,
			linkToJobs: linkToJobs
		}).then(response => {
			this.props.allJobsCallback();
		});
	}

	render() {
			if(this.state.submitted){
			return <Redirect to={`/gitHired`}/>
		}
		return (
			<div className="makejob"> 
			<form onSubmit={this.onSubmit}>
				<label>
					Company:
					<input type="text" onChange={this.onChangeCompany}/>
				</label>
				<br/>
				<label>
					Title:
					<input type="text" onChange={this.onChangeTitle}/>
				</label>
				<br/>
				<label>
					Location:
					<input type="text" onChange={this.onChangeLocation}/>
				</label>
				<br/>
				<label>
					Type:
					<input type="text" onChange={this.onChangeType}/>
				</label>
				<br/>
				<label>
					Link to Jobs:
					<input type="text" onChange={this.onChangeLinkToJobs}/>
				</label>
				<input type="submit" value="Submit"/>
			</form>

			</div>

			)
	}







}




export default CreateJob;