import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import axios from 'axios';

import ViewOne from './ViewOne';

class ViewSavedData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8080/gitHired/")
      .then(res => {
        this.setState({
          data: res.data.jobs
        })
      })
  }

  renderHeader() {
    return (
      <thead>
        <tr>
      		<th>Company</th>
          <th>Title</th>
          <th>Location</th>
          <th>Type</th>
          <th>Link</th>
          <th>View More</th>
          <th>Delete</th>
        </tr>
      </thead>
    )
  }

  renderData() {
    const renderTable = [];
    this.state.data.map( e => {
      renderTable.push(
        <tr className={e.id}>
      		<td>{e.company}<img className='companyLogo' href={e.company_logo}/></td>
      		<td>{e.title}</td>
      		<td>{e.location}</td>
      		<td>{e.type}</td>
      		<td><a href={e.github_jobs_url}><img src="./images/seepage.png"/></a></td>
      		<td className="seeMoreButton"> <Link className="linkToViewOne" to={`/ViewOne/${e.id}`}><img src="./images/seemore.png"/></Link></td>
      		<td className="deleteButton">Delete</td>
        </tr>
      )
    })
    return renderTable;
  }

  ViewOne() {
    console.log(111);
    // console.log({match});
    // return(
    //   <ViewOne wineId={match.params.id}/>
    // )
  }

  render() {
    return(
        <div className="ViewSavedData">

          {this.state.data.length > 0 &&
            <table className="tableSavedData">
              {this.renderHeader()}
              <tbody>
                {this.renderData()}
              </tbody>
            </table>
          }

          {this.state.data.length === 0 &&
            <div className="noDataMessage">
              Your saved jobs
            </div>
          }

          <Route exact path="/ViewOne/:id"
                 render={this.ViewOne} />

        </div>
    )
  }
}

export default ViewSavedData;
