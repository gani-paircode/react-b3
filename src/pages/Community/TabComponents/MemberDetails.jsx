import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { CommunityContext } from '../../../context/context';

export const MemberDetails = () => {
    const { memberId } = useParams();

    const { state: { records } } = useContext(CommunityContext);
    const person = records.filter(p => p.id === memberId)[0];
    return (
        <div>
            <h3>Viewing Details of member id - {memberId}</h3>
            {person ?
                <div>Person Name - {person.name}</div>
            :
                <div>Record not found with this id.</div>
            }
        </div>

    )
}