import React, { Component, useRef, useEffect } from 'react';
import { fetchHubmapTermMap } from '../../helpers/ApolloClient';
import CellTypeEnum from './CellTypeEnum';
import { svgToCellMap, cellMapToOntologyId } from '../../helpers/Utils';


function HubMapTubuleSchema({
    handleCellTypeClick,
    setActiveCell,
    activeCell,
    toggleCollapseTab
}) {
    const schemaRef = useRef(null);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement) return;
        
        const handleClick = async (event) => { 
            let ontologyId = event.detail.representation_of;
            ontologyId = ontologyId.replace('http://purl.obolibrary.org/obo/', '').replace(/_/g, ':');
            // Find the matching object in hubmapTermMap
            const hubmapTermMap = await fetchHubmapTermMap();
            const match = hubmapTermMap.find(
                obj => obj.hubmapOntologyId === ontologyId
            );
            if (match) {
                handleCellTypeClick(match.cellType);
            }
        }

        // schemaElement.setAttribute("highlight", "UBERON:0001291")

        const handleHover = (event) => {
            if (event.detail){
                console.log(event.detail.representation_of)
                console.log(event.detail.svg_group_id);
                console.log(event.detail)
            }
            let svgId = event?.detail?.svg_group_id;

            if(!svgId) return;

            
            const cellType = svgToCellMap[svgId];
            console.log(cellType);
            if(cellType){
                switch (cellType) {
                    case CellTypeEnum.PROXIMAL_TUBULEL:
                        toggleCollapseTab({target: {dataset: {event: 0}}})
                        break;
                    case CellTypeEnum.DESCENDING_THIN_LIMB_LOOP_OF_HENLE:
                        toggleCollapseTab({target: {dataset: {event: 1 }}})
                        break;
                    case CellTypeEnum.ASCENDING_THIN_LIMB_LOOP_OF_HENLE:
                        toggleCollapseTab({target: {dataset: {event : 1}}})
                        break;
                    case CellTypeEnum.THICK_ASCENDING_LIMB_LOOP_OF_HENLE:
                        toggleCollapseTab({target: {dataset : {event: 2}}})
                        break;
                    case CellTypeEnum.CONNECTING_TUBULE:
                        toggleCollapseTab({target: { dataset: {event: 4}}})
                        break;
                    case CellTypeEnum.COLLECTING_DUCT:
                        toggleCollapseTab({target:{ dataset: {event: 5}}})
                        break;
                    default:
                        toggleCollapseTab({target: {dataset: {event: -1 }}})
                }
                if(cellType === CellTypeEnum.CONNECTING_TUBULE) {
                }

                setActiveCell(cellType)
            }
            else {
                setActiveCell(CellTypeEnum.ALL);
            }

        }

        if (activeCell === ""){
            schemaElement.removeEventListener("cell-hover", handleHover);
            schemaElement.setAttribute("highlight", "");
        }
        schemaElement.addEventListener("cell-hover", handleHover);
        schemaElement.addEventListener('cell-click', handleClick);

        return () => {
            schemaElement.removeEventListener('cell-click', handleClick);
            schemaElement.addEventListener("cell-hover", handleHover);
        };
    }, [handleCellTypeClick, setActiveCell, activeCell, toggleCollapseTab]);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement || !activeCell) return;

        const ontologyId = cellMapToOntologyId[activeCell]
        if (ontologyId){
            console.log(ontologyId)
            if (typeof ontologyId === 'object'){
                const base = "http://purl.obolibrary.org/obo/"
                const purlList = ontologyId.map(id => base+id);
                console.log(purlList)
                // console.log("object detected!")
                schemaElement.setAttribute("highlight", JSON.stringify(purlList))
            }
            const purl = "http://purl.obolibrary.org/obo/"+ontologyId
            schemaElement.setAttribute("highlight", purl);
        }

    }, [activeCell])

    return (
        <hra-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
            illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
        ></hra-medical-illustration>
    );
}


export default HubMapTubuleSchema;