export const EDUCATION = [
    {
        value: 'BELOW_10',
        display: 'Below 10th'
    },
    {
        value: '10_PASS',
        display: '10th Pass'
    },
    {
        value: '12_PASS',
        display: '12th Pass'
    },
    {
        value: 'BACHELOR',
        display: 'Bachelor Degree'
    },
    {
        value: 'MASTER',
        display: 'Master Degree'
    },
    {
        value: 'PhD',
        display: 'Doctrate (PhD)'
    },
];

export const EDU_TO_TEXT = EDUCATION.reduce((acc, obj) => { acc[obj.value] = obj.display; return acc; }, {});

export const INTEREST_CONTRIBUTION = [
    {
        value: 'MATRIMONIAL',
        display: 'Matrimonial Activities',
        description: 'Contribute in finding matches for youths from our village.',
    },
    {
        value: 'GAUSHALA_DEVELOPMENT',
        display: 'Gaushala Development / Maintanance',
        description: 'We have total 2 Gaushala in our village. Need man hours to maintain accounts, contact to regular donors and do needful activities'
    },
    {
        value: 'CARRER_COUNSELLING',
        display: 'Carrer counselling',
        description: 'More than 70 kids pass 12th every year from our village. Guide them on choosing the right path, education loans, career outside Gujarat / India etc'
    },
    {
        value: 'GRANTS_HELP',
        display: 'Grants & Subsidy Awareness',
        description: 'Every year our village get grants of amount 10L or more, but because of lack of awareness, legal process - we are not able to utilise it. Help our Gram panchayat to avail it.'
    },
    {
        value: 'AGRICULTURE_INNOVATIONS',
        display: 'Take Agriculture to Next Level',
        description: 'Have new ideas on improving the quality of farming? Come forward and share, We will arrang the fund'
    },
    {
        value: 'GIRL_CHILD_EDUCATION',
        display: 'Beti Bachao, Beti Padhao',
        description: `Take initiatives and try to bring girl child education dropout rate to 0.`
    }
];

export const INTEREST_TO_TEXT = INTEREST_CONTRIBUTION.reduce((acc, obj) => { acc[obj.value] = obj.display; return acc; }, {});


export const TAB_IDS = {
    'ADD_MEMBER': 'members/add',
    'MEMBERS': 'members',
    'EDUCATION_REPORT': 'education-report',
    'VOLUNTEER_REPORT': 'volunteer-report',
    'GEO_GRAPHY_REPORT': 'geo-graphy-report',
};

export const TABS = [
    {
        id: TAB_IDS.ADD_MEMBER,
        text: 'Add New Member'
    },
    {
        id: TAB_IDS.MEMBERS,
        text: 'View Members'
    },
    {
        id: TAB_IDS.EDUCATION_REPORT,
        text: 'Education Report'
    },
    {
        id: TAB_IDS.VOLUNTEER_REPORT,
        text: 'Volunteers Report'
    },
    {
        id: TAB_IDS.GEO_GRAPHY_REPORT,
        text: 'City Wise Report'
    }
];