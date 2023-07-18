import React from 'react';
import { MemberDetails } from './MemberDetails';
import { MemberForm } from './MemberForm';
import { MembersList } from './MembersList';
import { Route, Routes } from 'react-router-dom';

export const MembersLanding = () => {
    return (
        <>
            <Routes>
                <Route index element={<MembersList />} />
                <Route path=":memberId" element={<MemberDetails />} />
                <Route path="add" element={<MemberForm />} />
            </Routes>
        </>
    )
}