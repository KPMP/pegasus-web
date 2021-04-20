import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getDataTypeOptions } from '../../helpers/Utils';
import Select from 'react-select';

class DiffexInfoBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTypeInputValue: "",
            dataTypeOptions: []
        }
    }

    componentDidMount() {
        getDataTypeOptions("", this.props.cluster).then(
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

    handleDataTypeSelect = (selected, actionMeta) =>
    {
        this.props.setDataType(selected.value);
        this.setState({dataTypeInputValue: selected});
    };

    handleInputChange(inputValue, action) {
        if (action.action !== "input-blur" && action.action !== "menu-close") {
            this.setState({ dataTypeInputValue: inputValue });
        }
      }

    render () {
        let selectedValue = this.state.dataTypeInputValue;
        return (
            <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                <Row xs='12' className='mt-4'>
                    <Col lg="2" className='d-table'>
                        <Select
                            value={selectedValue}
                            options={this.state.dataTypeOptions}
                            onInputChange={this.handleInputChange.bind(this)}
                            onChange={this.handleDataTypeSelect}
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