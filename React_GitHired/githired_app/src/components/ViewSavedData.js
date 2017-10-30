import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
// BrowserRouter, , Redirect -- react warnings
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
          <td><a href={e.github_jobs_url}><img src="./images/seepage.png" alt='see more'/></a></td>
          <td className="seeMoreButton"> <Link className="linkToViewOne" to={`/ViewOne/${e.id}`}><img src="./images/seemore.png" alt='see more'/></Link></td>
      		<td className="delete" onClick={() => {this.onClickDelete(e.id)}}>Delete</td>
        </tr>
      )
      return renderTable; // added by gf - avoid React warnings - seems to function fine - 10.30
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
              Start a research and save the Jobs you are interested in.
            </div>
          }

          <Route exact path="/ViewOne/:id"
                 render= { () =>
                 <ViewOne
                   user={this.props.user} />
               }
               />

        </div>
    )
  }
}

export default ViewSavedData;
