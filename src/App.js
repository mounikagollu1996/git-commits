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
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      if(count == 0){
        getCommits(key);
        setCount(30);
      } else{
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [count])

  const handleRefresh = () => {
    setRefresh(!refresh);
    setCount(30);
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
    const getAuthKey =  localStorage.getItem('authKey');
    if(getAuthKey) getCommits(getAuthKey);
  }, [refresh])


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
      <button onClick={handleRefresh}>Refresh</button>
      <h1>{count}</h1>
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
