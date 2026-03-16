import React, { Component, useRef, useEffect } from 'react';
import { fetchHubmapTermMap } from '../../helpers/ApolloClient';
import CellTypeEnum from './CellTypeEnum';

function HubMapGlomSchema(props) {

    const schemaRef = useRef(null);

    // SVG group → CellTypeEnum
    const mapSvgGroupToCellType = (svgGroupId) => {
        switch (svgGroupId) {
            case "Afferent_Arteriole_Endothelial_Cell_18":
                return CellTypeEnum.AFFERENT_ARTERIOLE_ENDOTHELIAL_CELL;

            case "Epithelial_Cell_Proximal_Tubule":
                return CellTypeEnum.PROXIMAL_TUBULEL;

            case "Glomerular_Mesangial_Cell":
                return CellTypeEnum.MESANGIUM;

            case "Parietal_Epithelial_Cell":
                return CellTypeEnum.PARIETAL;

            case "Glomerular_Visceral_Epithelial_Cell":
                return CellTypeEnum.VISCERAL_EPITHELIUM;

            case "Glomerular_Capillary_Endothelial_Cell":
                return CellTypeEnum.GLOMERULAR;

            default:
                return null;
        }
    };

    // CellTypeEnum → SVG group (reverse mapping)
    const mapCellTypeToSvgGroup = (cellType) => {
        switch (cellType) {
            case CellTypeEnum.AFFERENT_ARTERIOLE_ENDOTHELIAL_CELL:
                return "Afferent_Arteriole_Endothelial_Cell_18";

            case CellTypeEnum.PROXIMAL_TUBULEL:
                return "Epithelial_Cell_Proximal_Tubule";

            case CellTypeEnum.MESANGIUM:
                return "Glomerular_Mesangial_Cell";

            case CellTypeEnum.PARIETAL:
                return "Parietal_Epithelial_Cell";

            case CellTypeEnum.VISCERAL_EPITHELIUM:
                return "Glomerular_Visceral_Epithelial_Cell";

            case CellTypeEnum.GLOMERULAR:
                return "Glomerular_Capillary_Endothelial_Cell";

            default:
                return null;
        }
    };

    useEffect(() => {

        const schemaElement = schemaRef.current;
        if (!schemaElement) return;

        const handleClick = async (event) => {

            let ontologyId = event.detail.representation_of;

            ontologyId = ontologyId
                .replace('http://purl.obolibrary.org/obo/', '')
                .replace(/_/g, ':');

            const hubmapTermMap = await fetchHubmapTermMap();

            hubmapTermMap.forEach(obj => {
                if (obj.hubmapOntologyId === ontologyId) {
                    props.handleCellTypeClick(obj.cellType);
                }
            });
        };

        const handleHover = (event) => {
            console.log(event)

            if (!event.detail) return;

            const cellType = mapSvgGroupToCellType(event.detail.svg_group_id);

            if (cellType) {
                props.handleSchematicHoverEnter(cellType);
            }
        };

        schemaElement.addEventListener('cell-click', handleClick);
        schemaElement.addEventListener('cell-hover', handleHover);

        return () => {
            schemaElement.removeEventListener('cell-click', handleClick);
            schemaElement.removeEventListener('cell-hover', handleHover);
        };

    }, [props.handleCellTypeClick, props.handleSchematicHoverEnter]);



    // When hovering buttons in TabSection
    // fire the same event the schematic would emit
    useEffect(() => {

        const schemaElement = schemaRef.current;

        if (!schemaElement || !props.activeCell) return;

        const svgGroupId = mapCellTypeToSvgGroup(props.activeCell);
        console.log(schemaElement)
        if (!svgGroupId) return;

        // props.handleSchematicHoverEnter(svgGroupId)

        const hoverEvent = new CustomEvent("cell-hover", {
            target: schemaElement,
            detail: {
                svg_group_id: svgGroupId
            },
            bubbles: true
        });
        // console.log(hoverEvent)

        // const handleHover = (event) => {
        //     console.log(event);
        // }

        // schemaElement.addEventListener("cell-hover", handleHover)
        schemaElement.dispatchEvent(hoverEvent);
        console.log(hoverEvent)

    }, [props.activeCell, props.handleSchematicHoverEnter]);



    return (
        <hra-medical-illustration
            ref={schemaRef}
            selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-renal-corpuscle"
            illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
        />
    );
}


class GlomerulusSchematic extends Component {

    render() {
        return (
            <HubMapGlomSchema
                handleCellTypeClick={this.props.handleCellTypeClick}
                handleSchematicHoverEnter={this.props.handleSchematicHoverEnter}
                activeCell={this.props.activeCell}
            />
        );
    }
}

export default GlomerulusSchematic;