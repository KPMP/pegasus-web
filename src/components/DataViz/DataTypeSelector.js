import React, {Component} from "react";
import Select from "react-select/async";
import { Row, Col } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ConceptSelectContainer from '../ConceptSelect/ConceptSelectContainer'

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
    }

    handleSelect = (input) => {
        this.setState({inputValue: ""});
    };

    handleInputChange = (input) => {
        this.setState({inputValue: input})
    };

    render() {
        return (
            <React.Fragment>
                <Row xs="12" className='mb-4'>
                    <Col lg="2" className='d-table'>
                        <ConceptSelectContainer moreCharactersMessage={""} placeHolderText={""}/>
                    </Col>
                    <Col lg="2" className='d-table'>
                        <span className='d-table-cell'>in:</span>
                        <Select
                            options={[]}
                            onChange={this.handleSelect}
                            value={this.state.inputValue}
                            onInputChange={this.handleInputChange}
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
                    <Col lg='6' className=''>
                        <span className='d-table-cell pt-1'>(N=100 PARTICIPANTS; 50 HEALTHY REFERENCE; 30 CKD; 30 AKI)<FontAwesomeIcon icon={faQuestionCircle} className='ml-2'/></span>
                        <span className='d-table-cell pt-1 pl-4'><FontAwesomeIcon icon={faDownload} /></span>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default DataTypeSelector;
