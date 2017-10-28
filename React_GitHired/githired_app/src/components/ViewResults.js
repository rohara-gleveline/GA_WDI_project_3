import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';

class ViewResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      jobId: ''
    }

    this.renderResults = this.renderResults.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
  }

  componentDidMount() {
    this.setState({
      results: this.props.submitResults.data
    })
  }

  saveJob(e) {
    axios.post('http://localhost:8080/gitHired/save', {
        user_id: this.props.user.id,
        searched_on: e.searched_on,
        job_id: e.job_id,
        created_at: e.created_at,
        title: e.title,
        location: e.location,
        type: e.type,
        description: e.description,
        how_to_apply: e.how_to_apply,
        company: e.company,
        company_url: e.company_url,
        company_logo: e.company_logo,
        url: e.url
      }).then(res => {
        alert('This job has been added to your list.')
      })
  }

  renderGraph() {
    const graph = [];
    if (this.state.results.salaryData !==  undefined) {
      graph.push(
        <div>
          This is last months average salary for this job description:
        </div>
      )
      let maxSalary = 0;
      for (let i in this.state.results.salaryData.salaryData) {
         if (maxSalary < parseInt(this.state.results.salaryData.salaryData[i])){
           maxSalary = parseInt(this.state.results.salaryData.salaryData[i])
         }
      }
      for (let i in this.state.results.salaryData.salaryData) {
        const value = parseInt(this.state.results.salaryData.salaryData[i]) / maxSalary * 100;
        graph.push(
          <div data-width={value}>{i}: ${this.state.results.salaryData.salaryData[i]}</div>
        )
      }
    }
    return graph;
  }

  renderResults() {
    const arrayResults = [];
    if (this.state.results.JobsData !==  undefined) {
      this.state.results.JobsData.map(e => {
        arrayResults.push(
          <div className='resultBox' key={e.job_id}>
            <div>Job title: {e.title}</div>
            <div>Type of contract: {e.type}</div>
            <div>{e.company}</div>
            <div><img href={e.company_logo} alt="No Logo" /></div>
            <div><a src={e.company_url}>Website</a></div>
            <div>Job posted on {e.created_at}</div>
            <div>{e.how_to_apply}</div>
            <div>Location: {e.location}</div>
            <div><a src={e.url}>See more</a></div>
            <div>Job id: {e.job_id}</div>
            <div onClick={() => {this.saveJob(e)}}>Save this job</div>
          </div>
        )
      })
    }
    return arrayResults;
  }

  render() {
    console.log(this.state.results);
    return (
      <div className="ViewResults">
        <div onClick={this.props.goBack}>Go back on saved data</div>
        {this.renderResults()}
        {this.renderGraph()}
      </div>
    )
  }
}

export default ViewResults;
