import React, { useContext } from 'react';
import { getInitialFormValues } from '../../../context/reducer';
import { EDUCATION, INTEREST_CONTRIBUTION, TAB_IDS } from '../../../constants/general';
import Button from '../../../components/Button';
import { CommunityContext } from '../../../context/context';

export const MemberForm = () => {

    const { communityActions } = useContext(CommunityContext);

    const [record, setRecord] = React.useState(getInitialFormValues());
    const {
        id, name, phone, city, education, isPinned, interests
    } = record;


    const handleSubmit = (e) => {
        if (!record.id){
            record.id = crypto.randomUUID();
        }
        if (    !record.name ||
                !record.phone ||
                !record.city ||
                !record.interests.length ||
                !record.education
            ) {
                alert('Enter all values before submitting');
                return;
                /* there are better ways to validate forms, this is just a work around */
            }
        communityActions.addMember(record);
        alert('Record added successfully');
    }

    return (
        <div className="formContainer">
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

            {/* City */}
            <div className='fieldContainer'>
                <label>City</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, city: e.target.value }));
                }} value={city} />
            </div>

            {/* Education */}
            <div className='fieldContainer'>
                <label>Education</label>
                <select value={education} onChange={(e) => {
                    console.log('Education - ', e.target.value);
                    setRecord((oldState) => ({ ...oldState, education: e.target.value }));
                }}>
                    <option value="">Select the education</option>
                    {
                        EDUCATION.map(obj => <option key={obj.value} value={obj.value}>{obj.display}</option>)
                    }
                </select>
            </div>

             {/* Interest */}
             <div className='fieldContainer'>
                <label>Interest</label>
                <div className='checkboxItemsContainer'>
                    {
                        INTEREST_CONTRIBUTION.map(obj => {
                            const checkboxId = `ID_${obj.value}`;

                            return (
                                <div key={obj.value} className='checkboxItem'>
                                    <input
                                        type="checkbox"
                                        value={obj.value}
                                        id={checkboxId}
                                        checked={interests.includes(obj.value)}
                                        onChange={(e) => {
                                            /* adding interest */
                                            if (e.target.checked) {
                                                setRecord((oldState) => ({
                                                    ...oldState,
                                                    interests: [...oldState.interests, obj.value]
                                                }));
                                                return;
                                            }

                                            /* if check box is not checked -
                                                it means the item was checked before and
                                                now its unchecked.
                                                so lets remove it from the state
                                            */
                                            
                                            setRecord((oldState) => ({
                                                ...oldState,
                                                interests: oldState.interests.filter(val => val !== obj.value),
                                            }));

                                        }}
                                    />
                                    <label htmlFor={checkboxId}>{obj.display}</label>
                                    {/* <p>{obj.description}</p> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <Button type="submit" variant="success" onClick={handleSubmit} >
                    {id ? 'Update' : 'Add'}
                </Button>
            </div>



        </div>
    )
}