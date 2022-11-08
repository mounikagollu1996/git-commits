import React, { useState, useEffect } from 'react';


const commitStyle = {
    border: '1px solid ',
    margin: '16px auto',
    padding: '4px 8px',
    // width: '400px',
    boxShadow: '5px 10px #888888',
    textAlign: 'start'
  
  }


const ListCommits = (props) => {

    const { list } = props
    // console.log(props);

    return (
        <>
            {list.length ?
                list.map((commit, i) => {
                    return (
                        <div style={commitStyle} key={i}>
                            <h4>{commit.commit.message}</h4>
                            <p>{`${new Date(commit.commit.author.date).toLocaleString()} by ${commit.commit.author.name}`}</p>
                        </div>
                    )
                }) : null}
        </>
    )
};

export default ListCommits;