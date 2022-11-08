import React, { useState, useEffect } from 'react';


const Counter = (props) => {
  const [count, setCount] = useState(30);

  const { getCommits, authtoken, list, refresh } = props;

  // Implementation of count down timer to auto refresh the commits

  useEffect(() => {
    console.log(12);
    if (authtoken) {
      const timer = setInterval(() => {
        if (count == 0) {
          getCommits(authtoken);
          setCount(30);
        } else {
          setCount(count - 1);
        }
      }, 1000);
      return () => clearInterval(timer);
    };
  }, [count, list])

  useEffect(() => {
    setCount(30);
  }, [refresh])

  return (
    <>
      {list.length ?
        <h1>{count}</h1> : null
      }
    </>
  )
};

export default Counter;