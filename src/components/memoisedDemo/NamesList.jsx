import React from 'react';
import Pr from 'prop-types'; 
import { ASC_ORDER, DESC_ORDER } from './contants';
import { colorLog } from './logUtil';

function getSortedNames (names, order, cached) {
    const str = `${cached} - Sorting names ${names.join(" ")}`;
    colorLog(str, cached);

    const sortedNames = [...names].sort((a, b) => {
        if (order === ASC_ORDER) {
            return a.localeCompare(b);
        }
        return b.localeCompare(a);
    });
    return sortedNames;
}
export const NamesList = ({ names, order, cached }) => {
    const sortedNames = getSortedNames(names, order, cached);
    return <div>
        { sortedNames.join('  -  ')}
    </div>
}

NamesList.propTypes = {
    names: Pr.arrayOf(Pr.string),
    order: Pr.oneOf([ASC_ORDER, DESC_ORDER]),
    cached: Pr.bool,
}

NamesList.defaultProps = {
    cached: false,
}

export const MemoisedNamesList = React.memo(NamesList);
