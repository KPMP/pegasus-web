import React, {Component} from "react";
import Select from "react-select";
import { Row, Col } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer'
import { getTissueTypeOptions, getDataTypeOptions } from "../../helpers/Utils";
import AsyncSelect from "react-select/async/dist/react-select.esm";

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissueInputValue: getTissueTypeOptions(this.props.tissueType),
            tissueValue: null,
            dataTypeInputValue: getDataTypeOptions(this.props.dataType),
            dataTypeValue: null
        }
    }

    getDataCounts = (dataType) => {
        const dataInfo = {
            sn: {
                hrt: 3,
                aki: 6,
                ckd: 10,
                all: 19
            },
            sc: {
                hrt: 0,
                aki: 12,
                ckd: 15,
                all: 27
            }
        };
        return dataInfo[dataType];
    };

    handleTissueSelect = (selected, actionMeta) => {
        this.props.setTissueType(selected.value);
        this.setState({tissueValue: selected});
    };

    handleDataTypeSelect = (selected, actionMeta) =>
    {
        if (this.props.dataType !== selected.value) {
            this.props.setDataType(selected.value);
            this.setState({dataTypeValue: selected});
        }
    };

    render() {
        return (
            <React.Fragment>
                <Row xs="12" className='mb-4'>
                    <Col lg="2" className='d-table'>
                        <ConceptSelectContainer placeHolderText={""} smallFormat={true}/>
                    </Col>
                    <Col lg="3" className='d-table'>
                        <span className='d-table-cell'>in:</span>
                        <Select
                            allowClear
                            options={getTissueTypeOptions()}
                            onChange={this.handleTissueSelect}
                            value={this.state.tissueValue}
                            inputValue={this.state.tissueInputValue}
                            defaultInputValue={getTissueTypeOptions(this.props.tissueType)}
                            onFocus={() => this.setState({tissueInputValue: ""})}
                            className='select pl-2 d-table-cell w-100 pl-2'
                        />
                    </Col>
                    <Col lg="2" className='d-table'>
                        <label className='d-table-cell'>in:</label>
                        <Select
                            allowClear
                            options={getDataTypeOptions()}
                            onChange={this.handleDataTypeSelect}
                            value={this.state.dataTypeValue}
                            inputValue={this.state.dataTypeInputValue}
                            defaultInputValue={getDataTypeOptions(this.props.dataType)}
                            onFocus={() => this.setState({dataTypeInputValue: ""})}
                            className='select pl-2 d-table-cell w-100 pl-2'
                        />
                    </Col>
                    <Col lg='5' className=''>
                        <span className='d-table-cell pt-1'>(N={this.getDataCounts(this.props.dataType).all} PARTICIPANTS; {this.getDataCounts(this.props.dataType).hrt} HEALTHY REFERENCE; {this.getDataCounts(this.props.dataType).ckd} CKD; {this.getDataCounts(this.props.dataType).aki} AKI)<FontAwesomeIcon icon={faQuestionCircle} className='ml-2'/></span>
                        <span className='d-table-cell pt-1 pl-4'><FontAwesomeIcon icon={faDownload} /></span>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default DataTypeSelector;
