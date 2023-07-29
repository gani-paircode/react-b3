import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAppStore } from '../../../store';

export const MemberDetails = () => {
    const { memberId } = useParams();
    const { data: { membersById } , actions: { fetchMemberById } } = useAppStore(state => state)
    const member = membersById[memberId];

    React.useEffect(() => {
        doFetchUserById(memberId)
    }, [fetchMemberById]);
    
    const { isFetching, errMsg, data } = (member || {});

    return (
        <div>
            <h3>Viewing Details of member id - {memberId}</h3>
            {isFetching ? <h3>Fetching.....</h3> : ''}
            {errMsg ? <div className='errMsg'>{errMsg}</div> : ''}
            {data ? JSON.stringify(data, "", 2) : ''}
        </div>

    )
}