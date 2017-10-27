import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

class SearchForm extends Component {

	constructor(props) {
		super(props);

    this.state = {
      jobSearch: {
        title: '',
        type: '',
        location: '',
        country: ''
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}

  onChange(e) {
    console.log(e.target.name, e.target.value);
		this.setState({
			jobSearch: {
        ...this.state.jobSearch, [e.target.name]: e.target.value
      }
		})
	}

	onSubmit(event) {
		event.preventDefault();
		axios.post('http://localhost:8080/gitHired/search', {
			jobSearch: this.state.jobSearch
		}).then(response => {
			<Redirect to='/search' />
		});
	}

	render() {
		return (
			<div className='findjob'>

            <form onSubmit={this.onSubmit}>

  						<div>
  							<label htmlFor='titlesearch'>Job Title:</label>
  							<input id='titlesearch' type='text' name='title' value={this.state.title} onChange={this.onChange}/>
  						</div>

  						<div>
  							<label htmlFor='typesearch'>Type:</label>
  							<select id='typesearch' name='type' value={this.state.type} onChange={this.onChange}>
                  <option defaultValue='true'>Full Time</option>
                  <option value='false'>Full Time and Part Time</option>
                </select>
  						</div>

              <div>
                <label htmlFor='locationsearch'>City:</label>
                <input id='locationsearch' type='text' name='location' value={this.state.location} onChange={this.onChange}/>
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

			</div>

			)
	}

}

export default SearchForm;
