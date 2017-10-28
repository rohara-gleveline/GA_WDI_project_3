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
      data: [],
      mode: ''
    }

    this.onClickDelete = this.onClickDelete.bind(this);
    this.getSavedData = this.getSavedData.bind(this);
  }

  componentDidMount() {
    this.getSavedData();
  }

  getSavedData() {
    axios.get(`http://localhost:8080/gitHired/${this.props.user.id}`)
      .then(res => {
        this.setState({
          data: res.data.allJobsData
        }, () => {
            if(this.state.data.length > 0) {
            tablesort(document.getElementById('myTable'));
            }
        })
      })
  }

  onClickDelete(id) {
    console.log('clicked');
    axios.delete(`http://localhost:8080/gitHired/${id}`)
      .then(res => {
        this.getSavedData();
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
          <th>Apply</th>
          <th>View Job Posting</th>
          <th>View More</th>
          <th>Delete</th>
        </tr>
      </thead>
    )
  }

  // <img className='companyLogo' href={e.company_logo}/

  onClickDelete(id) {
      console.log('clicked');
      axios.delete(`http://localhost:8080/gitHired/${id}`)
        .then(res => {
          this.setState({ mode: 'somethingDeleted' })
        })
    }


  renderData() {

    const renderTable = [];
    this.state.data.map( e => {
      console.log('e',e);
      renderTable.push(
        <tr className={e.id}>
      		<td>{e.company}</td>
      		<td>{e.title}</td>
      		<td>{e.location}</td>
      		<td>{e.type}</td>
      		<td><a href={e.url} target='_blank'>Job Link</a></td>
          <td><a href={e.github_jobs_url}><img src="./images/seepage.png"/></a></td>
          <td className="seeMoreButton"> <Link className="linkToViewOne" to={`/ViewOne/${e.id}`}><img src="./images/seemore.png"/></Link></td>
      		<td className="deleteButton" onClick={() => {this.onClickDelete(e.id)}}>Delete</td>
      		<td className="delete" onClick={() => {this.onClickDelete(e.id)}}>Delete</td>
        </tr>
      )
    })
    return renderTable;
  }

  render() {

    return(
        <div className="viewSavedData">

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
                 render= { () =>
                 <ViewOne user={this.props.user} />
                }
               />

        </div>
    )
  }
}

export default ViewSavedData;
