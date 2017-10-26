import React from 'react';
// import SearchForm from './SearchForm';
import Header from './Header';
// import View from './View';
// import CreateButton from './CreateButton';

const Content = (props) => {
  return(
    <div className="content">
      
      

			<Header first_name={props.user.first_name} last_name={props.user.last_name} logout={props.logout}   />

			


    </div>
  )
}

export default Content;
