import React, {Component} from "react";
import Select from "react-select";
import {Row, Col, Container} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer';
import { getTissueTypeOptions, getDataTypeOptions } from "../../helpers/Utils";

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissueInputValue: getTissueTypeOptions(this.props.tissueType),
            tissueValue: null,
            dataTypeInputValue: null,
            dataTypeOptions: []
        }
    }

    componentDidMount() {
        getDataTypeOptions(this.props.gene.symbol, "").then(
            (options) => {
                let selectedOption = options.find(item => this.props.dataType === item.value);
                this.setState({dataTypeOptions: options, dataTypeInputValue: selectedOption})
            },
            (error) => {
                this.setState({dataTypeOptions: []});
                console.log("There was a problem getting the data: " + error)
            }
        );
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
            },
            rt: {
                hrt: 0,
                aki: 12,
                ckd: 15,
                all: 27
            },
            rp: {
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

    handleInputChange(inputValue, action) {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            this.props.setDataType(inputValue.value);
            this.setState({ dataTypeInputValue: inputValue });
        }   
    };

    render() {
        let selectedValue = this.state.dataTypeInputValue;
        return (
            <Container className='pb-3 pt-2 px-0 sticky-top' id='dt-select-container'>
            <Container className='rounded border shadow-sm pb-4 px-4'>
                <Row xs="12">
                    <Col lg="2" id='concept-selector' className='px-2 pt-3'>
                        <ConceptSelectContainer searchType="gene" selectedConcept={{value: this.props.gene.symbol, name:""}} placeHolderText={""} smallFormat={true}/>
                    </Col>
                    <Col lg="3" className='d-table px-2 pt-3'>
                        <span className='d-table-cell text-bigger pr-2'>in:</span>
                        <Select
                            allowClear
                            options={getTissueTypeOptions()}
                            onChange={this.handleTissueSelect}
                            value={this.state.tissueValue}
                            inputValue={this.state.tissueInputValue}
                            defaultInputValue={getTissueTypeOptions(this.props.tissueType)}
                            onFocus={() => this.setState({tissueInputValue: ""})}
                            className='select d-table-cell w-100 pl-2'
                        />
                    </Col>
                    <Col lg="3" className='d-table px-2 pt-3'>
                        <label className='d-table-cell text-bigger pr-2'>in:</label>
                        <Select
                            value={selectedValue}
                            options={this.state.dataTypeOptions}
                            onChange={this.handleInputChange.bind(this)}
                            className='select d-table-cell w-100 pl-2'
                            styles={{menu: provided => ({...provided, zIndex:999})}}

                        />
                    </Col>
                    <Col lg='4' className='text-right pt-3'>
                        <a className="icon-container" href='https://www.kpmp.org/help-docs/data' target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faQuestionCircle} className='ml-2 kpmp-light-blue'/></a>
                    </Col>
                </Row>
                <Row xs="12" className='mt-1 pl-0' >
                    <Col lg="12" className='d-table pl-2'>
                        <span className='d-table-cell pt-1 dataset-info'>Dataset coverage: N={this.getDataCounts(this.props.dataType).all} PARTICIPANTS; {this.getDataCounts(this.props.dataType).hrt} HEALTHY REFERENCE; {this.getDataCounts(this.props.dataType).ckd} CKD; {this.getDataCounts(this.props.dataType).aki} AKI</span>
                    </Col>
                </Row>
            </Container>
            </Container>
        )
    }
}

export default DataTypeSelector;
