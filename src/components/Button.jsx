import React from 'react';


const Button = (props) => {
    const { handleClick, buttonName, disabled, className } = props;

    return(
        <>
            <button 
                className={className}
                onClick={handleClick}
                disabled={disabled}
            >{buttonName}
            </button>
        </>
    )
}

export default Button;