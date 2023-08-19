import React from 'react';

// todo - add prop types
export const When = (props) => {
    const { isLoading,  errMsg, retry, children } = props;
    if (isLoading === undefined && errMsg === undefined) {
        return null
    } else if (isLoading) {
        return <h3>Fetching.....</h3>;
    } else if (errMsg) {
        return (
            <div>
                <div className='errMsg'>
                    {errMsg}.
                    {retry ? 'Please click following button to retry' : ''}
                </div>
                {retry ? <button
                    disabled={isLoading}
                    onClick={retry}
                >
                    Fetch Data
                </button> : ''
                }
        </div>
        )
    } else {
        return children;
    }
}