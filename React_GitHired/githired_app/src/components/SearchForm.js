import React, {Component} from 'react';
// import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'; -- react warnings
import axios from 'axios';

class SearchForm extends Component {

	constructor(props) {
		super(props);

    this.state = {
      jobDescription: '',
      full_time: 'true',
      jobLocation: ''
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
			this.props.results(response);
		});
	}

	render() {
		return (

			<div className ='searchView'> 

			<div className='searchForm'>

					<form className='searchInputs' onSubmit={this.onSubmit}>

							<div className="searchTitle">Search:</div>

							<div>
							<label htmlFor='titlesearch'>Job Title:</label>
							<input className='searchBar' type='text' name='jobDescription' value={this.state.jobDescription} onChange={this.onChange}/>
							</div>

							<div>
							<label htmlFor='locationsearch'>City:</label>
							<input className='searchBar' id='locationsearch' type='text' name='jobLocation' value={this.state.jobLocation} onChange={this.onChange}/>
							</div>

							<div>
							<label htmlFor='typesearch'>Type:</label>
							<select className='select-values' name='full_time' value={this.state.full_time} onChange={this.onChange}>
								<option defaultValue='true'>Full Time</option>
								<option value='false'>Full Time and Part Time</option>
							</select>
							</div>

							<div>
							<input className="submitButton" type='submit' value='Submit' />
							</div>	

					</form>

			</div>

			</div>

			)
		}
	}

export default SearchForm;
