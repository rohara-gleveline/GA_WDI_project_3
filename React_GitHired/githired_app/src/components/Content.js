import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

import SearchForm from './SearchForm';
import ViewSavedData from './ViewSavedData';
import ViewResults from './ViewResults';

const Content = (props) => {
  return(
      <div className="content">
        <SearchForm seeResults={this.seeResults}/>

        <Route exact path="/"
                component= {ViewSavedData} />
        }

        <Route exact path="/search"
                component= {ViewResults} />
        }

        <Link to="/create">Create New Job</Link>

      </div>
  )
}

export default Content;
