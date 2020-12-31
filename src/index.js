import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
import fetchAPI from './api';

import {
  SearchBar,
  Links
} from './components';



const App = () => {
  const [linkList, setLinkList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState('')

useEffect(async () => {
    fetchAPI('http://localhost:3001/api/links')
      .then((resp) => {
        console.log(resp)
        setLinkList(resp);
      })
      .catch(console.error);
}, [])

useEffect(() => {
  fetchAPI('http://localhost:3001/api/tags')
    .then((data) => {
      console.log(data)
      setTagList(data)
    })
    .catch(console.error)
}, [])

function filteredLinks() {
  
        return linkList.filter((_link) => {
          return _link.link.toLowerCase().includes(search.toLowerCase());
        })
        } 

      


  return <Switch>
    <Route path='/'>
      <h1>The Great Linkerator</h1>
      <SearchBar 
        search={search}
        setSearch={setSearch}
        setSearchOption={setSearchOption}
        searchOption={searchOption}/>
      <Links 
        linkList={filteredLinks()}
        tagList={tagList}/>
    </Route>
  </Switch>
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
