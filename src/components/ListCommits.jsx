import React, { useState, useEffect } from 'react';


const commitStyle = {
    border: '1px solid #e1e1e1',
    borderRadius: '12px',
    margin: '16px auto',
    padding: '1rem 1.5rem',
    maxWidth: '400px',
    width: 'auto',
    boxShadow: 'rgb(239 236 236) 3px 3px',
    textAlign: 'start'

}


const ListCommits = (props) => {
    const { list, start, end } = props;

    return (
        <>
            {list.length ?
                list.map((commit, i) => {
                    if (i >= start && i <= end) {
                        return (
                            <div style={commitStyle} key={i}>
                                <p><strong>{commit.commit.message}</strong></p>
                                <p>{`${new Date(commit.commit.author.date).toLocaleString()} by ${commit.commit.author.name}`}</p>
                            </div>
                        )
                    }
                }) : null}
        </>
    )
};

export default ListCommits;