import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

export default (props) => {
    let currentSortOrder = props.defaultSort;
    const [ascSort, setAscSort] = useState('inactive');
    const [descSort, setDescSort] = useState('inactive');
    const [noSort, setNoSort] = useState('inactive');
    const refButton = useRef(null);
    
    const onSortChanged = () => {
        const sort = props.column.getSort();
        setAscSort(sort === 'asc' ? 'active' : 'inactive');
        setDescSort(sort === 'desc' ? 'active' : 'inactive');
        setNoSort(!sort ? 'active' : 'inactive');
    };
    
    const onSortRequested = (event) => {
        if (currentSortOrder === 'asc') {
            currentSortOrder = 'desc'
        } else {
            currentSortOrder = 'asc'
        }
        props.setSort(currentSortOrder, event.shiftKey);
    };
    
    useEffect(() => {
        props.column.addEventListener('sortChanged', onSortChanged);
        onSortChanged();
    }, []);
    
    let headerIcon = null;
    if (props.infoIcon && props.infoIcon === true) {
        headerIcon = (
            <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
        )
    }


    // const getSortDiv = () => {
    //     if (currentSortOrder === 'asc') {
    //         return (
    //             <div onClick={(event) => onSortRequested(event)} onTouchEnd={(event) => onSortRequested('asc', event)} className={`customSortDownLabel ${ascSort}`}>
    //                 <i className="fa fa-long-arrow-alt-down"></i>
    //             </div>
    //         );
    //     } else if (currentSortOrder === 'desc') {
    //         return (
    //             <div onClick={(event) => onSortRequested(event)} onTouchEnd={(event) => onSortRequested('desc', event)} className={`customSortUpLabel ${descSort}`}>
    //                 <i className="fa fa-long-arrow-alt-up"></i>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div onClick={(event) => onSortRequested(event)} onTouchEnd={(event) => onSortRequested(null, event)} className={`customSortRemoveLabel ${noSort}`}>
    //                 <i className="fa fa-times"></i>
    //             </div>
    //         )
    //     }

  
    // }
    
    if (props.enableSorting) {
        
        return (
            <div>
                <div onClick={(event) => onSortRequested(event)}>
                    <i className='fa fa-long-arrow-alt-down'></i>
                    <div className="customHeaderLabel">{props.displayName} {headerIcon}</div>
                </div>
            </div>
        )
    } else {
    return (
        <div>
            <div className="customHeaderLabel">{props.displayName} {headerIcon}</div>
        </div>);
    }
};