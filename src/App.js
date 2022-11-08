import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";

import Counter from './components/Counter';
import './App.css';
import ListCommits from './components/ListCommits';





function App() {
  const [authtoken, setAuthtoken] = useState('');
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);


  const handleRefresh = (e) => {

    setRefresh(!refresh);
    // setCount(30);
  }

  // To fetch latest commits of the repo

  const getCommits = async (authKey) => {
    const octokit = new Octokit({ auth: authKey });
    const owner = 'mounikagollu1996', repo = 'git-commits';
    const getCommits = await octokit.request(
      `GET /repos/{owner}/{repo}/commits`, { owner, repo }
    );
    setList(getCommits.data)
  };


  useEffect(() => {
    const getAuthKey = localStorage.getItem('authKey');
    console.log({ getAuthKey });
    if (getAuthKey) {
      getCommits(getAuthKey);
    }
  }, [refresh])


  // console.log({ list })
  // console.count();
  // console.log({key});

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    console.log(50);
    localStorage.setItem('authKey', authtoken);
    setAuthtoken('');
    getCommits(authtoken)
  };
  // console.log(localStorage.getItem('authKey'), 57);

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='App-form'>
        <input
          className='App-input'
          type="password"
          value={authtoken}
          onChange={(e) => { setAuthtoken(e.target.value) }}
          placeholder='Enter Github auth key'
        />
        <div className='App-button-row'>
          <input type="submit" value="Submit" />
        </div>
      </form>
      <button onClick={handleRefresh}>Refresh</button>
      <Counter list={list} authtoken={authtoken || localStorage.getItem('authKey')} getCommits={getCommits} refresh={refresh} />
      <ListCommits list={list} />
    </div>
  );
}

export default App;
