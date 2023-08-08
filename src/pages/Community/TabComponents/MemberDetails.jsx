import React from 'react';
import { useParams } from 'react-router';
import { useAppStore } from '../../../store';
import When from '../../../components/When';

export const MemberDetails = () => {
    const { memberId } = useParams();
    const { data: { membersById } , actions: { fetchMemberById } } = useAppStore(state => state)
    const member = membersById[memberId];

    React.useEffect(() => {
        fetchMemberById(memberId)
    }, [fetchMemberById]);
    
    const { isFetching, errMsg, data } = (member || {});

    return (
        <div>
            <h3>Viewing Details of member id - {memberId}</h3>
            <When isLoading={isFetching} errMsg={errMsg} retry={() => fetchMemberById(memberId)}>
                <div>
                    {JSON.stringify(data, "", 2) }
                </div>
            </When>
        </div>

    )
}
