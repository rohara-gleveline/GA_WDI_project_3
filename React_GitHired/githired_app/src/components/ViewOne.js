import React from 'react';
import axios from 'axios';

class ViewOne extends Component {
	constructor(props) {
		super(props)

			this.state = {
				haveData: false,
				jobsData: null,
			}

	}

	componentDidMount() {
		axios.get(`http://localhost:8080/gitHired/${this.props.id}`)
		.then(response => {
			console.log('got job data, Data: ', response.data);
			this.setState({jobsData: response.data, haveData: true})
		})
	}

render() {
	
  return(
    <div className="ViewOne">
      <p>This is the view one</p>
      <tr>{this.state.jobsData.jobs.title}</tr>
      <tr>{this.state.jobsData.jobs.location}</tr>
      <tr>{this.state.jobsData.jobs.type}</tr>
      <tr>{this.state.jobsData.jobs.description}</tr>
      <tr>{this.state.jobsData.jobs.how_to_apply}</tr>
      <tr>{this.state.jobsData.jobs.company}</tr>
      <tr>{this.state.jobsData.jobs.company_url}</tr>
      <tr>{this.state.jobsData.jobs.company_logo}</tr>
      <tr>{this.state.jobsData.jobs.github_jobs_url}</tr>

      <Link to="/gitHired">Your Saved Jobs</Link>
      <button onClick={this.onClickEdit}>Edit Job</button>
      <button onClick={this.onClickDelete}>Delete Job</button>
    </div>
  )

	}
}

export default ViewOne;
