import React, { useState } from 'react';
import { useParams } from 'react-router';
import { getAuthHeaders } from '../../../helpers/auth';

export const MemberDetails = () => {
    const [person, setPerson] = useState({})
    const { memberId } = useParams();

    const doFetchUserById = (id) => {
        fetch(`https://t1m-addressbook-service.onrender.com/users/${id}`, {
            headers: {
            ...getAuthHeaders(),
            }
        })
        .then(r => {
            console.log(' r in 1st then ', r);
            if (r.status >= 200 && r.status <= 299) {
                return r.json();
            } else {
                throw ('Something went wrong');
            }
          }  )
        .then(res => {
            console.log('person is  ', res);
            setPerson(res);
        })
        .catch(e => {
            console.log('Something went wrong', e);
        })
    }

    React.useEffect(() => {
        doFetchUserById(memberId)
    }, [memberId]);
    
    console.log('person ', person)
    return (
        <div>
            <h3>Viewing Details of member id - {memberId}</h3>
            {JSON.stringify(person, "", 2)}
        </div>

    )
}