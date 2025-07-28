import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


export default (props) => {
     return (
         <div className='ag-header-cell-text' style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
             <span>{props.displayName}</span>
             <FontAwesomeIcon className='kpmp-light-blue' icon={faCircleInfo} style={{ marginLeft: '5px' }} />
         </div>
     );
 };