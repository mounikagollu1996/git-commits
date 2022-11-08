import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";

import Counter from './components/Counter';
import ListCommits from './components/ListCommits';
import Form from './components/Form';
import Button from './components/Button';

import './App.css';

function App() {
  const [authtoken, setAuthtoken] = useState('');
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // handling refresh button
  const handleRefresh = (e) => {
    setRefresh(!refresh);
  }

  const handleChange = (e) => {
    setAuthtoken(e.target.value);
  };

  // To fetch latest commits of the repo
  const getCommits = async (authKey) => {
    const octokit = new Octokit({ auth: authKey });
    const owner = 'mounikagollu1996', repo = 'git-commits';
    const getCommits = await octokit.request(
      `GET /repos/{owner}/{repo}/commits`, { owner, repo }
    );
    setList(getCommits.data)
  };

  // Getting authkey from browser after reload the page to persist the data
  useEffect(() => {
    const getAuthKey = localStorage.getItem('authKey');
    console.log({ getAuthKey });
    if (getAuthKey) {
      getCommits(getAuthKey);
    }
  }, [refresh])

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('authKey', authtoken);
    setAuthtoken('');
    getCommits(authtoken)
  };

  return (
    <div className="App">
      <Form authtoken={authtoken} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <Button handleRefresh={handleRefresh}/>
      <Counter list={list} authtoken={authtoken || localStorage.getItem('authKey')} getCommits={getCommits} refresh={refresh} />
      <ListCommits list={list} />
    </div>
  );
}

export default App;
