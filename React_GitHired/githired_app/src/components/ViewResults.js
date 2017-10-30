import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;

class ViewResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      jobId: '',
      mode: 'shortDesc'
    }

    this.renderResults = this.renderResults.bind(this);
    this.renderAverageSalary = this.renderAverageSalary.bind(this);
    this.haveLink = this.haveLink.bind(this);
    this.haveDescription = this.haveDescription.bind(this);
    this.toogleDesc = this.toogleDesc.bind(this);
  }

  componentDidMount() {
    this.setState({
      results: this.props.submitResults.data
    })
  }

  saveJob(e) {
    function linkHowToApply(e) {
      var cutStartIndex = e.indexOf('"')+1;
      var startCut = e.substring(cutStartIndex, e.length);
      var cutEndIndex = startCut.indexOf('"');
      var endCut = startCut.substring(0, cutEndIndex);
      return endCut;
    }
    axios.post('http://localhost:8080/gitHired/save', {
        user_id: this.props.user.id,
        searched_on: e.searched_on,
        job_id: e.job_id,
        created_at: e.created_at,
        title: e.title,
        location: e.location,
        type: e.type,
        description: linkHowToApply(e.description),
        how_to_apply: linkHowToApply(e.how_to_apply),
        company: e.company,
        company_url: e.company_url,
        company_logo: e.company_logo,
        url: e.url
      }).then(res => {
        console.log(res);
        alert('This job has been added to your list.')
      })
  }

  renderAverageSalary() {
    const graph = [];
    if (this.state.results.salaryData !==  undefined) {
      graph.push(
        <div>
          Last months average salary for this job description:
        </div>
      )
      let numberData = 0;
      let sumData = 0;
      for (let i in this.state.results.salaryData.salaryData) {
        numberData ++;
        sumData = sumData + this.state.results.salaryData.salaryData[i];
      }
      const average = (sumData / numberData).toFixed(2);
      graph.push(
        <div>${average}</div>
      )
    }
    return graph;
  }

  haveLink(string) {
      var cutStartIndex = string.indexOf('"')+1;
      var startCut = string.substring(cutStartIndex, string.length);
      var cutEndIndex = startCut.indexOf('"');
      var endCut = startCut.substring(0, cutEndIndex);
      return(
        <div><a href={endCut} target='_blank'>Apply</a></div>
      );
  }

  haveDescription(string) {
    const newDesc = []
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(string);
    const reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);
    reactElement.map(e => {
      if (e.props !== undefined) {
        newDesc.push(e.props.children)
      }
    })
    return newDesc;
  }

  toogleDesc() {
    if (this.state.mode === 'shortDesc') {
      this.setState({
        mode: 'longDesc'
      })
    } else {
      this.setState({
        mode: 'shortDesc'
      })
    }
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
            {this.state.mode === "shortDesc" &&
              <div onClick={this.toogleDesc} className='shortDescription' dangerouslySetInnerHTML={{ __html: e.description }} />
            }
            {this.state.mode === "longDesc" &&
              <div onClick={this.toogleDesc} className='longDescription' dangerouslySetInnerHTML={{ __html: e.description }} />
            }

            {this.state.mode === "shortDesc" &&
              <div onClick={this.toogleDesc} className='shortDescription'>{this.haveDescription(e.description)}</div>
            }
            {this.state.mode === "longDesc" &&
              <div onClick={this.toogleDesc} className='longDescription'>{this.haveDescription(e.description)}</div>
            }
            <div>Job posted on {e.created_at}</div>
            {this.haveLink(e.how_to_apply)}
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
        {this.renderAverageSalary()}
      </div>
    )
  }
}

export default ViewResults;
