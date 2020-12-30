import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, useHistory, Switch, Redirect } from "react-router-dom";
import fetchAPI from './api';
import CreateLinkForm from "./components/CreateLinkForm"
import {
  SearchBar,
  Links
} from './components';




const App = () => {
  const [linkList, setLinkList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState('')

  function addNewLink(newLink) {
    setLinkList([...linkList, newLink]);
  }
  
  let history = useHistory();

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
      return _link.link.includes(search.toLowerCase());
    });
  }
  // return <>
  // <h1>The Great Linkerator</h1>
  // <Switch>
  //   <Route path="/searchBar" render={()=> <SearchBar />} />
  //   <Route path="/createLink" render={()=><CreateLinkForm linkList={linkList} setLinkList={setLinkList} addNewLink={addNewLink} history={history}/>}/>
  //   <Redirect from="*" to="/"  />
  // </Switch>

  // </>

  return <Switch>
    <Route path='/'>
      <h1>The Great Linkerator</h1>
      <SearchBar 
        search={search}
        setSearch={setSearch}
        setSearchOption={setSearchOption}
        searchOption={searchOption}/>
      
    </Route>
  </Switch>
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
