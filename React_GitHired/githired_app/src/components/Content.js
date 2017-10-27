import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

// import SearchForm from './SearchForm';
import Header from './Header';
import ViewSavedData from './ViewSavedData';
// import CreateButton from './CreateButton';

const Content = (props) => {
  return(
      <div className="content">
        {/*}<SearchForm />*/}
        <ViewSavedData />
        <Link to="/create">Create New Job</Link>

      </div>
  )
}

export default Content;
