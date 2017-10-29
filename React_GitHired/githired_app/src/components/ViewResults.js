import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';
import $ from "jquery";

var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;

class ViewResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      jobId: ''
    }

    this.renderResults = this.renderResults.bind(this);
    this.renderAverageSalary = this.renderAverageSalary.bind(this);
    this.haveLink = this.haveLink.bind(this);
    this.haveDescription = this.haveDescription.bind(this);
    // this.altImage = this.altImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      results: this.props.submitResults.data
    })
  }

  // altImage () {
  //   ('#logo').src = 'https://www.google.com/images/srpr/logo11w.png'
  // onerror={this.altImage()
  // }

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
        this.props.goBack();
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
        <div><a href={endCut} target='_blank'><img src="./images/seemore.png"/></a></div>
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

  renderResults() {
    const arrayResults = [];
    if (this.state.results.JobsData !==  undefined) {
      this.state.results.JobsData.map(e => {
        arrayResults.push(
          <div className='resultBox' key={e.job_id}>

          {/*<div><img href={e.company_logo} alt="No Logo" id='logo'/></div>*/}

            <div className='resultsHead'>
              <div>{e.title}, {e.company}, {e.type}</div>
            </div>
            
            <div class='resultsTable'>
               <thead>
                  <tr>  
                    <th>Location</th>
                    <th>Posted On</th>
                    <th>Company Site</th>
                    <th>Job Posting</th>
                    <th>Apply</th>
                    <th>Save</th>
                  </tr>
              </thead>
              <tr>
                <td>{e.location}</td>
                <td>{e.created_at}</td>
                <td><a href={e.company_url} target='_blank'><img src="./images/seemore.png"/></a></td>
                <td><a href={e.url} target='_blank'><img src="./images/seemore.png"/></a></td>
                <td>{this.haveLink(e.how_to_apply)}</td>
                <td className='saveJob' onClick={() => {this.saveJob(e)}}><img id='save' src="./images/save.png"/></td>
              </tr>
            </div>

            {/*<div>Job id: {e.job_id}</div>*/}
            <div className='jobDesc'>
              <div className='jobDescHead'>Job description:</div>
               {this.haveDescription(e.description)}
            </div>
      
          </div>
        )
      })
    }
    return arrayResults;
  }

  render() {
    console.log(this.state.results);
    return (
      <div className="viewResults">
        <div onClick={this.props.goBack}>Go back on saved data</div>
        {this.renderResults()}
        {this.renderAverageSalary()}
      </div>
    )
  }
}

export default ViewResults;
