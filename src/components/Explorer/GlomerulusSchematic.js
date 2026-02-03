import React, { Component, useRef, useEffect } from 'react';

function HubMapGlomSchema(props) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement) return;
        
        const handleClick = (event) => { 
            // this is needed to support shadow DOM
            const target = event.composedPath?.()?.[0] || event.target;
            console.log('HubMapSchema clicked', target.id);
        }
        schemaElement.addEventListener('click', handleClick);

        return () => {
            schemaElement.removeEventListener('click', handleClick);
        };
    }, [props.onCellTypeSelected]);

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
            <HubMapGlomSchema />
        );
    }
}

export default GlomerulusSchematic;