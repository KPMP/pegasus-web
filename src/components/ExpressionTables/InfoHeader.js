// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
// import React, { useEffect, useRef, useState } from 'react';

// export default (props) => {
//     let sortOrder = props.defaultSort; 
//     let sortArrow = setSortArrow();

//     const setSortArrow = () => {
//         if (sortOrder === 'asc') {
//             sortArrow = 
//                 <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortUp' icon={faArrowUp} /></span>;
//         } else if (sortOrder === 'desc') {
//             sortArrow =
//                 <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortDown' icon={faArrowDown} /></span>;
//         }
//     }

//     const onSortChanged = () => {
//         setSortArrow();
//     }

//     const onSortRequested = (event) => {
//         console.log("sorting")
//         if (sortOrder === 'asc') {
//             sortOrder = 'desc'
//         } else {
//             sortOrder = 'asc'
//         }
//     };
    
//     useEffect(() => {
//         props.column.addEventListener('sortChanged', onSortChanged);
//         onSortChanged();
//     }, []);
    
//     let headerIcon = null;
//     if (props.infoIcon && props.infoIcon === true) {
//         headerIcon = (
//             <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
//         )
//     }

    
//     if (props.enableSorting) {
        
//         return (
//             <div>    
//                 <div onClick={(event) => onSortRequested(event)} className="customHeaderLabel"> {sortArrow} {props.displayName} {headerIcon}</div>
//             </div>
//         )
//     } else {
//     return (
//         <div>
//             <div className="customHeaderLabel">{props.displayName} {headerIcon}</div>
//         </div>);
//     }
// };

import React, { useEffect, useState }from 'react';
import { faInfoCircle, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InfoHeader = (props) => {
    console.log(props)
    const { displayName, enableSorting, column, setSort, infoIcon, api } = props;
    const [ sortState, setSortState ] = useState(column.getSort());

    useEffect(() => {
        const listener = () => {
            setSortState(column.getSort());
        }

        api.addEventListener('sortChanged', listener);
        return () => {
            api.removeEventListener('sortChanged', listener);
        }
    }, [api, column]);

    const toggleSort = () => {
        const nextSort = sortState === 'asc' ? 'desc' : sortState === 'desc' ? null : 'asc';
        setSort(nextSort, false);
        api.onSortChanged();
    }

    const getSortArrow = () => {
        if (sortState === 'asc') {
            return ( 
                <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortUp' icon={faArrowUp} /></span>
            )
        } else if (sortState === 'desc') {
            return (
                <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortDown' icon={faArrowDown} /></span>
            );
        }
    };

    let headerIcon = null;
    if (infoIcon && infoIcon === true) {
        headerIcon = (
            <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
        )
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', cursor: enableSorting ? 'pointer' : 'default' }} onClick={enableSorting ? toggleSort : undefined}>
        <span style={{ marginRight: 4 }}>{getSortArrow()}</span>
        <span> {displayName}  {headerIcon}</span>
        </div>
    );

}

export default InfoHeader;