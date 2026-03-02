import React, { Component, useRef, useEffect } from 'react';
import { fetchHubmapTermMap } from '../../helpers/ApolloClient';

function HubMapGlomSchema(props) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        
        if (!schemaElement) return;
        
        const handleClick = async (event) => { 
            let ontologyId = event.detail.representation_of;
            ontologyId = ontologyId.replace('http://purl.obolibrary.org/obo/', '').replace(/_/g, ':');
            // Find the matching object in hubmapTermMap
            const hubmapTermMap = await fetchHubmapTermMap();
            hubmapTermMap.forEach(obj => {
                if (obj.hubmapOntologyId === ontologyId) {
                    props.handleCellTypeClick(obj.cellType);
                }
            });
        }
        schemaElement.addEventListener('cell-click', handleClick);

        return () => {
            schemaElement.removeEventListener('cell-click', handleClick);
        };
    }, [props.handleCellTypeClick, props]);

    return (
        <hra-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-renal-corpuscle"
            illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
        ></hra-medical-illustration>
    );
}

class GlomerulusSchematic extends Component {
    render() {
        return (
            <HubMapGlomSchema handleCellTypeClick={this.props.handleCellTypeClick} />
        );
    }
}

export default GlomerulusSchematic;