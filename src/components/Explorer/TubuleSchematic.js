// import React, { Component, useRef, useEffect } from 'react';
// import { fetchHubmapTermMap } from '../../helpers/ApolloClient';
// import CellTypeEnum from './CellTypeEnum';
// import { svgToCellMap, cellMapToOntologyId } from '../../helpers/Utils';


// function HubMapTubuleSchema({
//     handleCellTypeClick,
//     setActiveCell,
//     activeCell,
//     toggleCollapseTab
// }) {
//     const schemaRef = useRef(null);

//     useEffect(() => {
//         const schemaElement = schemaRef.current;
//         if (!schemaElement) return;
        
//         const handleClick = async (event) => { 
//             let ontologyId = event.detail.representation_of;
//             ontologyId = ontologyId.replace('http://purl.obolibrary.org/obo/', '').replace(/_/g, ':');
//             // Find the matching object in hubmapTermMap
//             const hubmapTermMap = await fetchHubmapTermMap();
//             const match = hubmapTermMap.find(
//                 obj => obj.hubmapOntologyId === ontologyId
//             );
//             if (match) {
//                 handleCellTypeClick(match.cellType);
//             }
//         }

//         // schemaElement.setAttribute("highlight", "UBERON:0001291")

//         const handleHover = (event) => {
//             if (event.detail){
//                 console.log(event.detail.representation_of)
//                 console.log(event.detail.svg_group_id);
//                 console.log(event.detail)
//             }
//             let svgId = event?.detail?.svg_group_id;

//             if(!svgId) return;

            
//             const cellType = svgToCellMap[svgId];
//             console.log(cellType);
//             if(cellType){
//                 switch (cellType) {
//                     case CellTypeEnum.PROXIMAL_TUBULEL:
//                         toggleCollapseTab({target: {dataset: {event: 0}}})
//                         break;
//                     case CellTypeEnum.DESCENDING_THIN_LIMB_LOOP_OF_HENLE:
//                         toggleCollapseTab({target: {dataset: {event: 1 }}})
//                         break;
//                     case CellTypeEnum.ASCENDING_THIN_LIMB_LOOP_OF_HENLE:
//                         toggleCollapseTab({target: {dataset: {event : 1}}})
//                         break;
//                     case CellTypeEnum.THICK_ASCENDING_LIMB_LOOP_OF_HENLE:
//                         toggleCollapseTab({target: {dataset : {event: 2}}})
//                         break;
//                     case CellTypeEnum.CONNECTING_TUBULE:
//                         toggleCollapseTab({target: { dataset: {event: 4}}})
//                         break;
//                     case CellTypeEnum.COLLECTING_DUCT:
//                         toggleCollapseTab({target:{ dataset: {event: 5}}})
//                         break;
//                     default:
//                         toggleCollapseTab({target: {dataset: {event: -1 }}})
//                 }
//                 if(cellType === CellTypeEnum.CONNECTING_TUBULE) {
//                 }

//                 setActiveCell(cellType)
//             }
//             else {
//                 setActiveCell(CellTypeEnum.ALL);
//             }

//         }

//         if (activeCell === ""){
//             schemaElement.removeEventListener("cell-hover", handleHover);
//             schemaElement.setAttribute("highlight", "");
//         }
//         schemaElement.addEventListener("cell-hover", handleHover);
//         schemaElement.addEventListener('cell-click', handleClick);

//         return () => {
//             schemaElement.removeEventListener('cell-click', handleClick);
//             schemaElement.removeEventListener("cell-hover", handleHover);
//         };
//     }, [handleCellTypeClick, setActiveCell, activeCell, toggleCollapseTab]);

//     useEffect(() => {
//         const schemaElement = schemaRef.current;
//         if (!schemaElement || !activeCell) return;

//         const ontologyId = cellMapToOntologyId[activeCell]
//         if (ontologyId) {
//             const base = "http://purl.obolibrary.org/obo/";
//             console.log(ontologyId)

//             if (Array.isArray(ontologyId)) {
//                 const purlList = ontologyId.map(id => base + id);
//                 console.log(purlList);
//                 schemaElement.highlight = purlList;
//             } else {
//                 schemaElement.highlight = [base + ontologyId];
//             }
//         }

//     }, [activeCell])

//     return (
//         <hra-medical-illustration
//             ref={schemaRef}
//             selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
//             illustrations="https://apps.humanatlas.io/api--staging/v1/ftu-illustrations"
//         ></hra-medical-illustration>
//     );
// }


// export default HubMapTubuleSchema;
import React, { useMemo } from "react";
import HraMedicalIllustration from "./HraMedicalIllustration";
import CellTypeEnum from "./CellTypeEnum";
import { svgToCellMap, cellMapToOntologyId } from "../../helpers/Utils";
import { fetchHubmapTermMap } from "../../helpers/ApolloClient";

function HubMapTubuleSchema({
  handleCellTypeClick,
  setActiveCell,
  activeCell,
  toggleCollapseTab
}) {

  const highlight = useMemo(() => {
    console.log(activeCell)
    const ontologyId = cellMapToOntologyId[activeCell];
    console.log(ontologyId)
    if (!ontologyId) return [];

    const base = "http://purl.obolibrary.org/obo/";

    if (Array.isArray(ontologyId)) {
      return ontologyId.map(id => base + id);
    }

    return [base + ontologyId];
  }, [activeCell]);


  const handleHover = (event) => {
    if(event.detail){
        console.log(event.detail)
    }
    const svgId = event?.detail?.svg_group_id;
    if (!svgId) return;

    const cellType = svgToCellMap[svgId];

    if (cellType) {
      switch (cellType) {
        case CellTypeEnum.PROXIMAL_TUBULEL:
          toggleCollapseTab({ target: { dataset: { event: 0 } } });
          break;
        case CellTypeEnum.DESCENDING_THIN_LIMB_LOOP_OF_HENLE:
        case CellTypeEnum.ASCENDING_THIN_LIMB_LOOP_OF_HENLE:
          toggleCollapseTab({ target: { dataset: { event: 1 } } });
          break;
        case CellTypeEnum.THICK_ASCENDING_LIMB_LOOP_OF_HENLE:
          toggleCollapseTab({ target: { dataset: { event: 2 } } });
          break;
        case CellTypeEnum.CONNECTING_TUBULE:
          toggleCollapseTab({ target: { dataset: { event: 4 } } });
          break;
        case CellTypeEnum.COLLECTING_DUCT:
          toggleCollapseTab({ target: { dataset: { event: 5 } } });
          break;
        default:
          toggleCollapseTab({ target: { dataset: { event: -1 } } });
      }

      setActiveCell(cellType);
    } else {
      setActiveCell(CellTypeEnum.ALL);
    }
  };


  const handleClick = async (event) => {
    let ontologyId = event.detail.representation_of
      .replace("http://purl.obolibrary.org/obo/", "")
      .replace(/_/g, ":");

    const hubmapTermMap = await fetchHubmapTermMap();

    const match = hubmapTermMap.find(
      obj => obj.hubmapOntologyId === ontologyId
    );

    if (match) {
      handleCellTypeClick(match.cellType);
    }
  };


  return (
    <HraMedicalIllustration
      highlight={highlight}
      onCellHover={handleHover}
      onCellClick={handleClick}
      selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
      illustrations="https://apps.humanatlas.io/api--staging/v1/ftu-illustrations"
    />
  );
}

export default HubMapTubuleSchema;