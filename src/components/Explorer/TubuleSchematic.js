import React, {useRef, useEffect } from 'react';
import { fetchHubmapTermMap } from '../../helpers/ApolloClient';
import CellTypeEnum from './CellTypeEnum';
import { svgToCellMap, cellMapToOntologyId } from '../../helpers/Utils';


function HubMapTubuleSchema({
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
            if (event?.detail?.svg_group_id === "Renal_Corpuscle"){
                setActiveCell(CellTypeEnum.ALL);
                setActiveTab('1');
            }else {
                let ontologyId = event.detail.representation_of;
                ontologyId = ontologyId.replace('http://purl.obolibrary.org/obo/', '').replace(/_/g, ':');
                // Find the matching object in hubmapTermMap
                const hubmapTermMap = await fetchHubmapTermMap();
                hubmapTermMap.forEach(obj => {
                    if (obj.hubmapOntologyId === ontologyId) {
                        handleCellTypeClick(obj.cellType);
                    }
                });
                setActiveTab('2');
            }
                
            
        }

        const handleHover = (event) => {
            let svgId = event?.detail?.svg_group_id;
            if(!svgId) return;

            const cellType = svgToCellMap[svgId];
            if(cellType){
                switch (cellType) {
                    case CellTypeEnum.MACULA_DENSA_CELL:
                        toggleCollapseTab({target: {dataset: {event: 2}}})
                        break;
                    case CellTypeEnum.DISTAL_CONVOLUTED_TUBULE:
                        toggleCollapseTab({target: {dataset: {event: 3}}})
                        break;
                    case CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_1:
                        toggleCollapseTab({target: {dataset: {event: 0}}})
                        break;
                    case CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_2:
                        toggleCollapseTab({target: {dataset: {event: 0}}})
                        break;
                    case CellTypeEnum.PROXIMAL_TUBULE_EPITHELIAL_SEGMENT_3:
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
                    case CellTypeEnum.CORTICAL_COLLECTING_DUCT_PRINCIPAL:
                        toggleCollapseTab({target: { dataset: {event: 5}}})
                        break;
                    case CellTypeEnum.OUTER_MEDULLARY_COLLECTING_DUCT_PRINCIPAL:
                        toggleCollapseTab({target: { dataset: {event: 5}}})
                        break;
                    case CellTypeEnum.INNER_MEDULLARY_COLLECTING_DUCT:
                         toggleCollapseTab({target: { dataset: {event: 5}}})
                        break;
                    case CellTypeEnum.COLLECTING_DUCT:
                        toggleCollapseTab({target:{ dataset: {event: 5}}})
                        break;
                    default:
                        toggleCollapseTab({target: {dataset: {event: -1 }}})
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
            schemaElement.removeEventListener("cell-hover", handleHover);
        };
    }, [handleCellTypeClick, setActiveCell, activeCell, toggleCollapseTab, setActiveTab]);

    useEffect(() => {
        const schemaElement = schemaRef.current;
        if (!schemaElement || !activeCell) return;

        const ontologyId = cellMapToOntologyId[activeCell]
        if (ontologyId) {
            const base = "http://purl.obolibrary.org/obo/";

            if (Array.isArray(ontologyId)) {
                const purlList = ontologyId.map(id => base + id);

                schemaElement.highlight = purlList;
            } else {
                schemaElement.highlight = [base + ontologyId];
            }
        }

    }, [activeCell])

    return (
        <hra-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
            illustrations="https://apps.humanatlas.io/api--staging/v1/ftu-illustrations"
        ></hra-medical-illustration>
    );
}


export default HubMapTubuleSchema;
