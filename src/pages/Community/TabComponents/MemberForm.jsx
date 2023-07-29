import React, { useState } from 'react';
import { TAB_IDS } from '../../../constants/general';
import Button from '../../../components/Button';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../../store';

export const MemberForm = () => {
    const [record, setRecord] = useState({});
    const { id, name, phone, email, city } = record;
    const { data: { addUSer },  actions: { createMember, resetCreateMember } } = useAppStore(state => state);
    const { isFetching, errMsg, data } = (addUSer || {});

    if (data) {
        resetCreateMember();
        return <Navigate to={`/${TAB_IDS.MEMBERS}`}/>
    }

    const handleSubmit = (e) => {
        if (    !record.name ||
                !record.phone ||
                !record.city ||
                !record.email
            ) {
                alert('Enter all values before submitting');
                return;
                /* there are better ways to validate forms, this is just a work around */
            }
            const payload = {
                name: record.name,
                phoneNumber: [record.phone],
                email: record.email,
                city: record.city,
            };
            createMember(payload);            
    }

    return (
        <div className="formContainer">
            {isFetching ? <h2>Wait....</h2> : ''};
            {errMsg ? <div className='errMsg'>{} </div> : ''}
            {id ? <div className='fieldContainer'>
                <label>Id : {id}</label>
            </div> : null}
            {/* Name */}
            <div className='fieldContainer'>
                <label>Name</label>
                <input onChange={(e) => {
                    // setRecord((oldState) => ({ ...oldState, name: e.target.value }));
                    setRecord({ ...record, name: e.target.value });
                }} value={name} />
            </div>

            {/* Phone */}
            <div className='fieldContainer'>
                <label>Phone</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, phone: e.target.value }));
                }} value={phone} />
            </div>

            <div className='fieldContainer'>
                <label>Email</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, email: e.target.value }));
                }} value={email} />
            </div>

            {/* City */}
            <div className='fieldContainer'>
                <label>City</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, city: e.target.value }));
                }} value={city} />
            </div>
           
            <div>
                <Button type="submit" variant="success" onClick={handleSubmit} >
                    {id ? 'Update' : 'Add'}
                </Button>
            </div>
        </div>
    )
}