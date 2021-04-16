import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getDataTypeOptions } from '../../helpers/Utils';
import Select from 'react-select';

class DiffexInfoBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTypeInputValue: getDataTypeOptions(this.props.dataType),
            dataTypeValue: null
        }
    }

    handleDataTypeSelect = (selected, actionMeta) =>
    {
        this.props.setDataType(selected.value);
        this.setState({dataTypeValue: selected});
    };

    render () {
        return (
            <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                <Row xs='12' className='mt-4'>
                    <Col lg="2" className='d-table'>
                        <Select
                            allowClear
                            options={getDataTypeOptions()}
                            onChange={this.handleDataTypeSelect}
                            value={this.state.dataTypeValue}
                            inputValue={this.state.dataTypeInputValue}
                            defaultInputValue={getDataTypeOptions(this.props.dataType)}
                            onFocus={() => this.setState({dataTypeInputValue: ""})}
                            className='select pl-2 d-table-cell w-100 pl-2'
                            styles={{menu: provided => ({...provided, zIndex:999})}}
                        />
                    </Col>
                    <Col xs='10'>
                        <h5> {(this.props.dataType === 'sn' || this.props.dataType === 'sc')?"differential expression*":"abundance*"} in {this.props.cluster} </h5>
                    </Col>
                </Row>


                
            </Container>
        );
    }
}

export default DiffexInfoBar;