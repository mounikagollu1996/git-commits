import React from 'react';


const Button = (props) => {
    const { handleRefresh } = props;

    return(
        <>
            <button onClick={handleRefresh}>Refresh</button>
        </>
    )
}

export default Button;