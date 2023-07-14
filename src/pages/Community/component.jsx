import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { MemberForm, MembersList, EducationReport, GeoGraphyReport, VolunteerReport, Landing } from './TabComponents';
import './style.css';
import { TABS, TAB_IDS } from '../../constants/general';
import NotFound from '../../components/NotFound';


export const Community = () => {
    return (
        <div id="CommunityContainer">
            <div className="tabItems">
                {TABS.map(({ id, text }) => <Link to={`/${id}`}>{text}</Link>)}
            </div>
            <div className="tabComponent">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path={`/${TAB_IDS.ADD_MEMBER}`} element={<MemberForm />} />
                    <Route path={`/${TAB_IDS.EDUCATION_REPORT}`} element={<EducationReport />} />
                    <Route path={`/${TAB_IDS.GEO_GRAPHY_REPORT}`} element={<GeoGraphyReport />} />
                    <Route path={`/${TAB_IDS.VIEW_MEMBERS}`} element={<MembersList />} />
                    <Route path={`/${TAB_IDS.VOLUNTEER_REPORT}`} element={<VolunteerReport />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )

}

Community.propTypes = {};