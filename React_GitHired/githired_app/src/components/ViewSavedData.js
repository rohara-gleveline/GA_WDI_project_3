import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import ViewOne from './ViewOne';
import tablesort from 'tablesort';
// import $ from "jquery";

class ViewSavedData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    console.log('props in componentDidMount of viewSavedData are', this.props.user)
    axios.get(`http://localhost:8080/gitHired/${this.props.user.id}`)
      .then(res => {
        console.log('response from viewSavedData is ', res.data.allJobsData);
        this.setState({
          data: res.data.allJobsData
        }, () => {
            tablesort(document.getElementById('myTable'));
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
          <th>Job Link</th>
          <th>View More</th>
          <th>Delete</th>
        </tr>
      </thead>
    )
  }

  // <img className='companyLogo' href={e.company_logo}/

  renderData() {
    
    const renderTable = [];
    this.state.data.map( e => {
      renderTable.push(
        <tr className={e.id}>
      		<td>{e.company}</td>
      		<td>{e.title}</td>
      		<td>{e.location}</td>
      		<td>{e.type}</td>
      		<td><a href={e.url} target='_blank'>Job Link</a></td>
      		<td className="seeMoreButton"> <Link className="linkToViewOne" to={`/ViewOne/${e.id}`}>See More</Link></td>
      		<td className="deleteButton">Delete</td>
        </tr>
      )
    })
    return renderTable;
  }

  render() {

    return(
        <div className="ViewSavedData">

          {this.state.data.length > 0 &&
            <table id='myTable' className="tableSavedData">
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
                 component={ViewOne} />

        </div>
    )
  }
}

export default ViewSavedData;
