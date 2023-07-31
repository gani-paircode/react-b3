import React, { useRef } from 'react';
import { Button } from '../../../components/Button/button';
import { useNavigate } from 'react-router-dom';
import { getMemberDetailsRoute } from '../helper';
import { useAppStore } from '../../../store';
import When from '../../../components/When';

export const MembersList = () => {
    const fetchRef = useRef(true);
    const navigate = useNavigate();
    const { data: { members }, actions: { getMembers } } = useAppStore(state => state);

    React.useEffect(() => {
        /* in dev env, effect runs twice.. preventing it to once using ref */
        if (fetchRef.current) {
            getMembers();
            fetchRef.current = false;
        }
    }, []);
    const { isFetching, errMsg, data } = (members || {});

    return (
        <div id="viewMembers">

            <When isLoading={isFetching} errMsg={errMsg} retry={getMembers}>
                <table>
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>City</td>
                            <td>Email</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (data || []).map( ({ id, name, phoneNumber, city, email }, index) => {
                            return (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td><PhoneNumbers numbers={phoneNumber} /></td>
                                    <td>{city}</td>
                                    <td>{email}</td>
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
            </When>
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