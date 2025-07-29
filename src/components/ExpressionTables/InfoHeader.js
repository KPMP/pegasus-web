import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

export default (props) => {
    const sortOrder = props.defaultSort;
        
    const onSortChanged = () => {

    }

    const onSortRequested = (event) => {
        
        console.log("sorting")
        if (sortOrder === 'asc') {
            sortOrder = 'desc'
        } else {
            sortOrder = 'asc'
        }
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

    
    let sortArrow = '';
    if (sortOrder === 'asc') {
        sortArrow = 
            <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortUp' icon={faArrowUp} /></span>;
    } else if (sortOrder === 'desc') {
        sortArrow =
            <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortDown' icon={faArrowDown} /></span>;
    }
  
    
    if (props.enableSorting) {
        
        return (
            <div>    
                <div onClick={(event) => onSortRequested(event)} className="customHeaderLabel"> {sortArrow} {props.displayName} {headerIcon}</div>
            </div>
        )
    } else {
    return (
        <div>
            <div className="customHeaderLabel">{props.displayName} {headerIcon}</div>
        </div>);
    }
};