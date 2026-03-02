import React, { Component, useRef, useEffect } from 'react';


function HubMapTubuleSchema(props) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement) return;
        
        const handleClick = (event) => { 
            let ontologyId = event.detail.representation_of;
            ontologyId = ontologyId.replace('http://purl.obolibrary.org/obo/', '').replace(/_/g, ':');
            // Find the matching object in hubmapTermMap
        
            const match = props.hubmapTermMap.find(obj => obj.hubmapOntologyId === ontologyId);
            const cellType = match ? match.cellType : null;
            props.handleCellTypeClick(cellType);
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
