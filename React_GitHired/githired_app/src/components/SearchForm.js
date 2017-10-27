import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

class SearchForm extends Component {

	constructor(props) {
		super(props);

    this.state = {
      jobDescription: '',
      full_time: 'true',
      jobLocation: '',
      country: 'us',
			isSubmitted: 'false'
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}

  onChange(e) {
		this.setState({
      [e.target.name]: e.target.value
		})
	}

	onSubmit(event) {
		event.preventDefault();
		axios.post('http://localhost:8080/gitHired/search', {
			jobDescription: this.state.jobDescription,
      full_time: this.state.full_time,
      jobLocation: this.state.jobLocation,
      country: this.state.country
		}).then(response => {
			console.log(response);
			this.setState({
				isSubmitted: 'true'
			})
		});
	}

	render() {
		return (
			<div className='findjob'>

				{this.state.isSubmitted === 'true' &&
					<Redirect to="/search" />
				}

				{this.state.isSubmitted === 'false' &&
					<form onSubmit={this.onSubmit}>

						<div>
							<label htmlFor='titlesearch'>Job Title:</label>
							<input id='titlesearch' type='text' name='jobDescription' value={this.state.jobDescription} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor='typesearch'>Type:</label>
							<select id='typesearch' name='full_time' value={this.state.full_time} onChange={this.onChange}>
								<option defaultValue='true'>Full Time</option>
								<option value='false'>Full Time and Part Time</option>
							</select>
						</div>

						<div>
							<label htmlFor='locationsearch'>City:</label>
							<input id='locationsearch' type='text' name='jobLocation' value={this.state.jobLocation} onChange={this.onChange}/>
						</div>

						<div>
							<label htmlFor='countrysearch'>Country:</label>
							<select id='countrysearch' name='country' value={this.state.country} onChange={this.onChange}>
								<option defaultValue='us'>United States</option>
								<option value='gb'>United Kingdom</option>
								<option value='au'>Australia</option>
								<option value='at'>Austria</option>
								<option value='br'>Brazil</option>
								<option value='ca'>Canada</option>
								<option value='de'>Germany</option>
								<option value='fr'>France</option>
								<option value='in'>India</option>
								<option value='it'>Italy</option>
								<option value='nl'>Netherlands</option>
								<option value='nz'>New Zealand</option>
								<option value='pl'>Poland</option>
								<option value='ru'>Russia</option>
								<option value='sg'>Singapore</option>
								<option value='za'>South Africa</option>
							</select>
						</div>

						<div>
							<input type='submit' value='Submit' />
						</div>

					</form>
				}

			</div>

			)
	}

}

export default SearchForm;
