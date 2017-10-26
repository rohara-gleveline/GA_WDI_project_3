import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

// import SearchForm from './SearchForm';
import Header from './Header';
import ViewSavedData from './ViewSavedData';
// import CreateButton from './CreateButton';

<<<<<<< HEAD
const Content = (props) => {
  return(
      <div className="content">
        <Header first_name={props.user.first_name} last_name={props.user.last_name} logout={props.logout} />
        {/*}<SearchForm />*/}
        <ViewSavedData />
        {/*}<CreateButton />*/}

      </div>
=======

const Content = (props) => {
  return(
    <div className="content">
      
      

			<Header first_name={props.user.first_name} last_name={props.user.last_name} logout={props.logout}   />

			

    </div>
>>>>>>> e92c6abef043c48b7d40a6ba58e186ee79732cd3
  )
}

export default Content;
