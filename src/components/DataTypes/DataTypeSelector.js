import React, {Component} from "react";
import Select from "react-select/async";
import { Row, Col } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

class DataTypeSelector extends Component {
    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
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
                <Row xs="12" className=''>
                    <Col lg="2" className='text-center d-table'>
                        <Select
                            options={[]}
                            onChange={this.handleSelect}
                            value={this.state.inputValue}
                            onInputChange={this.handleInputChange}
                            className="select"
                        />
                    </Col>
                    <Col lg="2" className='d-table'>
                        <span className='d-table-cell align-middle'>in:</span>
                        <Select
                            options={[]}
                            onChange={this.handleSelect}
                            value={this.state.inputValue}
                            onInputChange={this.handleInputChange}
                            className='select d-table-cell align-middle'
                        />
                    </Col>
                    <Col lg="2" className='d-table'>
                        <label className='d-table-cell align-middle'>in:</label>
                        <Select
                            options={[]}
                            onChange={this.handleSelect}
                            value={this.state.inputValue}
                            onInputChange={this.handleInputChange}
                            className='select d-table-cell align-middle'
                        />
                    </Col>
                    <Col lg='6' className=''>
                        <span className='d-table-cell align-middle pt-1'>(N=100 PARTICIPANTS; 50 HEALTHY REFERENCE; 30 CKD; 30 AKI)<FontAwesomeIcon icon={faQuestionCircle} className='ml-2'/></span>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default DataTypeSelector;
