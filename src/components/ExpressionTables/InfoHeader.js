import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';

export default (props) => {

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
    
    const onSortRequested = (order, event) => {
        props.setSort(order, event.shiftKey);
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

    let sort = null;
    console.log(props)

    if (props.enableSorting) {
        sort = (<div style={{ display: 'inline-block' }}>
                <div onClick={(event) => onSortRequested('asc', event)} onTouchEnd={(event) => onSortRequested('asc', event)} className={`customSortDownLabel ${ascSort}`}>
                    <i className="fa fa-long-arrow-alt-down"></i>
                </div>
                <div onClick={(event) => onSortRequested('desc', event)} onTouchEnd={(event) => onSortRequested('desc', event)} className={`customSortUpLabel ${descSort}`}>
                    <i className="fa fa-long-arrow-alt-up"></i>
                </div>
                <div onClick={(event) => onSortRequested(null, event)} onTouchEnd={(event) => onSortRequested(null, event)} className={`customSortRemoveLabel ${noSort}`}>
                    <i className="fa fa-times"></i>
                </div>
            </div>);
    }
    
    return (
        <div>
            {sort}
            <div className="customHeaderLabel">{props.displayName} {headerIcon}</div>
        </div>);
};