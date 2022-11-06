import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/core";

import './App.css';

const commitStyle = {
  border: '1px solid ',
  margin: '16px auto',
  padding: '4px 8px',
  width: '400px',
  boxShadow:'5px 10px #888888',
  textAlign: 'start'

}

function App() {
  const [key, setKey] = useState('');
  const [list, setList] = useState([]);

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
    const getAuthKey =  localStorage.getItem('authKey');
    if(getAuthKey) getCommits(getAuthKey);
  }, [])


  console.log({ list })

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('authKey', key);
    setKey('');
    getCommits(key)
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value) }}
          placeholder='Enter Github auth key'
        />
        <input type="submit" value="Submit" />
      </form>
      {list.length ? 
      list.map((commit, i) => {
        return (
          <div key={i} style={commitStyle}>
            <h4>{commit.commit.message}</h4>
            <p>{`${new Date(commit.commit.author.date).toLocaleString()} by ${commit.commit.author.name}`}</p>
          </div>
        )
      }) : null}
    </div>
  );
}

export default App;
