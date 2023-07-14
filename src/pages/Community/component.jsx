import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { TABS } from '../../constants/general';


export const Community = () => {
    return (
        <div id="CommunityContainer">
            <div className="tabItems">
                {TABS.map(({ id, text }) => <Link to={`/${id}`}>{text}</Link>)}
            </div>
            <div className="tabComponent">
                Based on current URL, particular component will be rendered here.
                Like on the URL of add new member, MembersForm component will be rendered
                On URL of view members, MembersList component will be rendered
                <p>😌 Keep calm & trust react router</p>
                
            </div>
        </div>
    )

}

Community.propTypes = {};