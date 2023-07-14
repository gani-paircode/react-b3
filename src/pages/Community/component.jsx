import React from 'react';
import './style.css';


export const Community = () => {
    return (
        <div id="CommunityContainer">
            <div className="tabItems">
                Links will appear here. That will redirect to particualr URL
                Like URL to add new member, 
                URL to view member and so on
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