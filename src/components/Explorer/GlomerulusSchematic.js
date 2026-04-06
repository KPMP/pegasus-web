import React, { Component, useRef, useEffect } from 'react';
import { fetchHubmapTermMap } from '../../helpers/ApolloClient';
import { svgToCellMap, cellMapToOntologyId } from '../../helpers/Utils';
import CellTypeEnum from './CellTypeEnum';

function HubMapGlomSchema({
    handleCellTypeClick,
    setActiveCell,
    activeCell,
    toggleCollapseTab,
    setActiveTab
}) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        
        if (!schemaElement) return;
        
        const handleClick = async (event) => {
            if(event?.svg_group_id === "Epithelial_Cell_Proximal_Tubule"){
                console.log("clicked on proximal tubule cell in glomerulus schematic, toggling to tubule schematic and highlighting proximal tubule cell")
                setActiveCell(CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_1);
                setActiveTab('2');
            }
            else{
                let ontologyId = event.detail.representation_of;
                ontologyId = ontologyId.replace('http://purl.obolibrary.org/obo/', '').replace(/_/g, ':');
                // Find the matching object in hubmapTermMap
                const hubmapTermMap = await fetchHubmapTermMap();
                hubmapTermMap.forEach(obj => {
                    if (obj.hubmapOntologyId === ontologyId) {
                        handleCellTypeClick(obj.cellType);
                    }
                });
            }
        }
        const handleHover = (event) => {
            if(event.detail){
                console.log(event.detail)
            }
            const svgId = event?.detail?.svg_group_id;
            if (!svgId) return;
        
            const cellType = svgToCellMap[svgId];
        
            if (cellType) {
              setActiveCell(cellType);
            } else {
              setActiveCell(CellTypeEnum.ALL);
            }
        };

        if (activeCell === ""){
            schemaElement.removeEventListener("cell-hover", handleHover);
            schemaElement.setAttribute("highlight", "");
        }
        schemaElement.addEventListener('cell-hover', handleHover);
        schemaElement.addEventListener('cell-click', handleClick);

        return () => {
            schemaElement.removeEventListener('cell-click', handleClick);
            schemaElement.removeEventListener('cell-hover', handleHover);
        };
    }, [handleCellTypeClick, setActiveCell, activeCell, setActiveTab]);

    useEffect(() => {
            const schemaElement = schemaRef.current;
            if (!schemaElement || !activeCell) return;
    
            const ontologyId = cellMapToOntologyId[activeCell]

            if (ontologyId) {
                const base = "http://purl.obolibrary.org/obo/";

                if (Array.isArray(ontologyId)) {
                    const purlList = ontologyId.map(id => base + id);
                    console.log(purlList);
                    schemaElement.highlight = purlList;
                } else {
                    schemaElement.highlight = [base + ontologyId];
                }
            }else {
                schemaElement.highlight = "";
            }
    
        }, [activeCell])

    return (
        <hra-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-renal-corpuscle"
            illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
        ></hra-medical-illustration>
    );
}

export default HubMapGlomSchema;