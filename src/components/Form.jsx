import React from 'react';

const Form = (props) => {
    const {authtoken, handleSubmit, handleChange } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className='App-form'>
                <input
                    className='App-input'
                    type="password"
                    value={authtoken}
                    onChange={handleChange}
                    placeholder='Enter Github auth key'
                />
                <div className='App-button-row'>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </>
    )

}

export default Form