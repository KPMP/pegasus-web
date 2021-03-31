import React, {Component} from "react";
import Select from "react-select";
import { Row, Col } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer'
import {getTissueTypeOptions} from "../../helpers/Utils";
import AsyncSelect from "react-select/async/dist/react-select.esm";

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissueInputValue: getTissueTypeOptions(this.props.tissueType),
            tissueValue: null
        }
    }

    handleTissueSelect = (selected, actionMeta) => {
        this.props.setTissueType(selected.value);
        this.setState({tissueValue: selected});
    };

    handleInputChange = (input) => {
        this.setState({inputValue: input})
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
                            options={[]}
                            onChange={this.handleSelect}
                            value={this.state.inputValue}
                            onInputChange={this.handleInputChange}
                            className='select d-table-cell w-100 pl-2'
                        />
                    </Col>
                    <Col lg='5' className=''>
                        <span className='d-table-cell pt-1'>(N=100 PARTICIPANTS; 50 HEALTHY REFERENCE; 30 CKD; 30 AKI)<FontAwesomeIcon icon={faQuestionCircle} className='ml-2'/></span>
                        <span className='d-table-cell pt-1 pl-4'><FontAwesomeIcon icon={faDownload} /></span>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default DataTypeSelector;
