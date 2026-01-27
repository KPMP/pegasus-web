import React, { Component, useRef, useEffect } from 'react';


function HubMapTubuleSchema(props) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement) return;
        
        const handleCellTypeClick = (event) => { 
            console.log('TubuleSchematic clicked', event.target.id);
            // props.onCellTypeSelected(event.target.id);
        }
        schemaElement.addEventListener('cell-type-click', handleCellTypeClick);

        return () => {
            schemaElement.removeEventListener('cell-type-click', handleCellTypeClick);
        };
    }, [props.onCellTypeSelected]);

    return (
        <hubmap-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
            illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
        ></hubmap-medical-illustration>
    );
}


class TubuleSchematic extends Component {
    render() {
        return (
            <HubMapTubuleSchema/>
        );
    }
}

export default TubuleSchematic;
