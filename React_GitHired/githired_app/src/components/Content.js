import React from 'react';
// import SearchForm from './SearchForm';
import Header from './Header';
// import View from './View';
// import CreateButton from './CreateButton';
import CreateJob from './CreateJob';


const Content = (props) => {
  return(
    <div className="content">
      
      

			<Header first_name={props.user.first_name} last_name={props.user.last_name} logout={props.logout}   />

			<CreateJob />

			

    </div>
  )
}
export default Content;
