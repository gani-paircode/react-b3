import React, { useRef, useState } from 'react';
import { Button } from '../../../components/Button/button';
import { useNavigate } from 'react-router-dom';
import { getMemberDetailsRoute } from '../helper';
import { getAuthHeaders } from '../../../helpers/auth';

export const MembersList = () => {
    const [records, setRecords] = useState([]);
    const fetchRef = useRef(true);
    const navigate = useNavigate();
    const doFetchUsers = () => {
        setRecords([]);
        fetch("https://t1m-addressbook-service.onrender.com/users", {
          headers: {
            ...getAuthHeaders(),
          }
        })
          .then(r => 
            
            {
                console.log(' r in 1st then ', r);
                if (r.status >= 200 && r.status <= 299) {
                    return r.json();
                } else {
                    throw ('Something went wrong');
                }
              }  
            )
          .then(res => {
            console.log('all users are  ', res);
            setRecords(res);
          })
          .catch(e => {
            console.log('Something went wrong', e);
          })
      }
    React.useEffect(() => {
        /* in dev env, effect runs twice.. preventing it to once using ref */
        if (fetchRef.current) {
            doFetchUsers();
            fetchRef.current = false;
        }
    }, []);
    
    return (
        <div id="viewMembers">
            <button onClick={doFetchUsers}>Refresh</button>
            <table>
                <thead>
                    <tr>
                        <td>Sr No</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td>City</td>
                        <td>Email</td>
                        {/* <td>Education</td> */}
                        {/* <td>Interests</td> */}
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                {
                    records.map( ({ id, name, phoneNumber, city, email }, index) => {
                        return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td><PhoneNumbers numbers={phoneNumber} /></td>
                                <td>{city}</td>
                                <td>{email}</td>
                                {/* <td>{EDU_TO_TEXT[education]}</td> */}
                                {/* <td>
                                    {
                                        interests.map((interestId) => <div className="interestItem" key={interestId}>{INTEREST_TO_TEXT[interestId]}</div> )
                                    }
                                </td> */}
                                <td>
                                    <Button
                                        variant="normal"
                                        onClick={() => navigate(getMemberDetailsRoute(id))}
                                    >
                                        View
                                    </Button>
                                    <Button variant="danger" onClick={(e) => {
                                        alert('commin soon')
                                    }}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
                
            </table>
        </div>  
    );
}

const PhoneNumbers = ({ numbers }) => {
    if (Array.isArray(numbers)) {
        return numbers.map(num => <div key={num}>{num}</div>)
    }
    return '-';
}
MembersList.propTypes = {} // add entry for records here