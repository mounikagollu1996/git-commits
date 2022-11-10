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
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [pages, setPages] = useState();

  let pageSize = 3;
  // Implemented pagination
  useEffect(() => {
    const length = list.length;
    let totalPages = Math.ceil(length / pageSize);
    let startValue = (page - 1) * pageSize;
    let endValue = Math.min(startValue + pageSize - 1, length - 1);
    setStart(startValue);
    setEnd(endValue);
    setPages(totalPages);
  }, [list, page])

  const handleIncrement = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const handleDecrement = () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }

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
      <div className='App-box'>
        <Form authtoken={authtoken} handleSubmit={handleSubmit} handleChange={handleChange} />
        <Button handleClick={handleRefresh} buttonName="Refresh" disabled={false} className="App-reload" />
        <Counter list={list} authtoken={authtoken || localStorage.getItem('authKey')} getCommits={getCommits} refresh={refresh} />
      </div>
      {list.length ?
        <>
          <ListCommits list={list} start={start} end={end} />
          <Button handleClick={handleDecrement} buttonName="-" disabled={page === 1} />
          <span>&nbsp; {page} &nbsp;</span>
          <Button handleClick={handleIncrement} buttonName="+" disabled={page === pages} />
        </> : null}
    </div>
  );
}


export default App;
