import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getDataTypeOptions } from '../../helpers/Utils';
import Select from 'react-select';

class DiffexInfoBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTypeInputValue: '',
            dataTypeOptions: []
        }
    }

    componentDidMount() {
        getDataTypeOptions('', this.props.cluster).then(
            (options) => {
                let selectedOption = options.find(item => this.props.dataType === item.value);
                this.setState({dataTypeOptions: options, dataTypeInputValue: selectedOption})
            },
            (error) => {
                this.setState({dataTypeOptions: []});
                console.log('There was a problem getting the data: ' + error)
            }
        );
        
    }

    handleInputChange(inputValue, action) {
        if (action.action !== 'input-blur' && action.action !== 'menu-close') {
            this.props.setDataType(inputValue.value);
            this.setState({ dataTypeInputValue: inputValue });
        }
    }

    render () {
        let selectedValue = this.state.dataTypeInputValue;
        return (
            <Container className='pb-3 pt-1 px-0 sticky-top' id='dt-select-container'>
                <Container className='rounded border shadow-sm pb-4 p-4'>
                <Row xs='12'>
                    <Col lg='2' className='d-table'>
                        <Select
                            menuIsOpen={true}
                            value={selectedValue}
                            options={this.state.dataTypeOptions}
                            onChange={this.handleInputChange.bind(this)}
                            className='select d-table-cell w-100 pl-2'
                            classNamePrefix="datatypes"
                            styles={{menu: provided => ({...provided, zIndex:999})}}
                        />
                    </Col>
                    <Col xs='10' className='mt-2'>
                        <h5> {(this.props.dataType === 'sn' || this.props.dataType === 'sc')?'differential expression*':'abundance*'} in {this.props.cluster} </h5>
                    </Col>
                </Row>
                </Container>
            </Container>
        );
    }
}

export default DiffexInfoBar;