import React from 'react';
import { Spinner } from 'react-bootstrap';

// todo - add prop types
export const When = (props) => {
    const { isLoading,  errMsg, retry, children } = props;
    if (isLoading === undefined && errMsg === undefined) {
        return null
    } else if (isLoading) {
        return <Spinner animation='border' size='sm' />
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