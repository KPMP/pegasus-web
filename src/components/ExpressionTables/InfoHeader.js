import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

export default (props) => {
    props.setSort(props.defaultSort);    
    const onSortChanged = () => {

    }

    const onSortRequested = (event) => {
        let currentSort = props.getSort()
        console.log("sorting")
        if (currentSort === 'asc') {
            currentSort = 'desc'
        } else {
            currentSort = 'asc'
        }
        props.setSort(currentSort, event.shiftKey);
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
    if (props.getSort() === 'asc') {
        sortArrow = 
            <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='sortUp' icon={faArrowUp} /></span>;
    } else if (props.getSort() === 'desc') {
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