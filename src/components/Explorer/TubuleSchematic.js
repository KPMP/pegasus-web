import React, { Component, useRef, useEffect } from 'react';


function HubMapTubuleSchema(props) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement) return;
        
        const handleClick = (event) => { 
            // this is needed to support shadow DOM
            console.log(event.detail.label);
        }
        schemaElement.addEventListener('cell-click', handleClick);

        return () => {
            schemaElement.removeEventListener('cell-click', handleClick);
        };
    }, [props.onCellTypeSelected]);

    return (
        <hra-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
            illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
        ></hra-medical-illustration>
    );
}


class TubuleSchematic extends Component {
    render() {
        return (
            <HubMapTubuleSchema />
        );
    }
}

export default TubuleSchematic;
