export default ({ data }) => {
    return (<button onClick={() => console.log('Software Launched')}  className='table-column btn btn-link text-start p-0'>
            {data.gene}
        </button>);
};