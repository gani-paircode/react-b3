import { EDUCATION, INTEREST_CONTRIBUTION, TAB_IDS } from "../constants/general";
import Pr from 'prop-types';

export const getInitialFormValues = () => ({
    id: '',
    name: '',
    phone: '',
    city: '',
    education: '',
    isPinned: false,
    interests: []
});

export const RecordPropType = Pr.shape({
    id: Pr.string,
    name: Pr.string,
    phone: Pr.string,
    city: Pr.string,
    education: Pr.oneOf(EDUCATION.map(obj => obj.value)),
    isPinned: Pr.bool,
    interests: Pr.arrayOf(Pr.string), 
    /*  
        this need to be fixed - this should be array of string,
        but possible values are one of INTEREST_CONTRIBUTION.map(obj => obj.value)
    */
});

const DummyRecords = [
    {
        id: crypto.randomUUID(),
        name: 'Roshan Dabhi',
        phone: '99980 99980',
        city: 'Bangalore',
        education: EDUCATION[4].value,
        interests: [INTEREST_CONTRIBUTION[5].value, INTEREST_CONTRIBUTION[2].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Ghanshyam KD',
        phone: '89000 00098',
        city: 'Surat',
        education: EDUCATION[3].value,
        interests: [INTEREST_CONTRIBUTION[1].value, INTEREST_CONTRIBUTION[2].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Mohan Patel',
        phone: '99880 90908',
        city: 'Surat',
        education: EDUCATION[2].value,
        interests: [INTEREST_CONTRIBUTION[0].value, INTEREST_CONTRIBUTION[3].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Ajay Patel',
        phone: '98332 00998',
        city: 'Ahmedabad',
        education: EDUCATION[2].value,
        interests: [INTEREST_CONTRIBUTION[4].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Kunal Jain',
        phone: '90901 00998',
        city: 'Baroda',
        education: EDUCATION[3].value,
        interests: [INTEREST_CONTRIBUTION[0].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Pritam Kumar KV',
        phone: '90117 98440',
        city: 'Baroda',
        education: EDUCATION[4].value,
        interests: [INTEREST_CONTRIBUTION[3].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Vraj Shah',
        phone: '96963 33220',
        city: 'Ahmedabad',
        education: EDUCATION[3].value,
        interests: [INTEREST_CONTRIBUTION[3].value, INTEREST_CONTRIBUTION[4].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Riya Khemani',
        phone: '85285 23366',
        city: 'Surat',
        education: EDUCATION[4].value,
        interests: [INTEREST_CONTRIBUTION[5].value, INTEREST_CONTRIBUTION[2].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Shweta Malani',
        phone: '98700 00000',
        city: 'Baroda',
        education: EDUCATION[5].value,
        interests: [INTEREST_CONTRIBUTION[0].value, INTEREST_CONTRIBUTION[2].value]
    },
    {
        id: crypto.randomUUID(),
        name: 'Manoj Desai',
        phone: '98700 00000',
        city: 'Surat',
        education: EDUCATION[4].value,
        interests: [INTEREST_CONTRIBUTION[1].value]
    },
]
export const getInitialAppState = () => {
    const stored = localStorage.getItem('community');
    if (stored) {
        return JSON.parse(stored)
    }
    const initialState = {
        form: getInitialFormValues(),
        records: DummyRecords,
    };
    localStorage.setItem('community', JSON.stringify(initialState));
    return (initialState);
};

export const ACTION_TYPES = {
    'ADD_RECORD': 'ADD_RECORD',
    'DELETE_RECORD': 'DELETE_RECORD',
    'PIN_RECORD': 'PIN_RECORD',
};

export const reducerFn = (state, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ACTION_TYPES.ADD_RECORD:
            newState = {
                ...state,
                records: [action.payload, ...state.records],
                /* showing recently added record on top, so don't have to scroll bottom in view memners tab */
            };
            break;

        case ACTION_TYPES.DELETE_RECORD:
            newState = {
                ...state,
                records: state.records.filter(obj => obj.id !== action.payload),
            };
            break;

        default:
            break;
    }

    localStorage.setItem('community', JSON.stringify(newState));
    return newState;
}