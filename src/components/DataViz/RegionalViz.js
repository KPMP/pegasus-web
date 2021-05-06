import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';
import {formatTissueType, sum} from "../../helpers/Utils";
import LMDDotPlot from "../Plots/LMDDotPlot";
import LMDBoxPlot from "../Plots/LMDBoxPlot";
import Select from "react-select";


class RegionalViz extends Component {
    constructor(props) {
        super(props);
        this.state = { plotData: [], selectedPlot: { value: 'box', label: 'Box plot' } };
    };

    componentDidMount() {
        // get data
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        // update data
    }

    getPlotOptions = () => {
        return [
            { value: 'box', label: 'Box plot' },
            { value: 'dot', label: 'Dot plot' }
        ];
    };

    render() {
        let plot = this.state.selectedPlot.value === 'dot'?<LMDDotPlot/>:<LMDBoxPlot/>;
        return (
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer/>
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>
                    <Row xs='12'>
                        <Col lg='12'>
                            <h5>{this.props.gene.symbol} Expression</h5>
                            <hr/>
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                        <Col lg='3'>
                            <span className='d-table-cell pr-2 text-nowrap'>Display by: </span>
                            <Select
                                value={this.state.selectedPlot}
                                defaultValue={this.state.selectedPlot}
                                onChange={(option) => this.setState({selectedPlot: option})}
                                options={this.getPlotOptions()}
                                className='select d-table-cell w-100'
                            />
                        </Col>
                    </Row>
                    <Row xs='12' className='mb-4'>
                        <Col lg='12' className="text-center">
                            {plot}
                        </Col>
                    </Row>
                    <Row xs='12'>
                        <Col lg='12'>
                            <h5>{this.props.gene.symbol} expression comparison across regions in {formatTissueType(this.props.tissueType)}</h5>
                            <hr/>
                        </Col>
                        <Col lg='12'>
                            [expression table goes here]
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default RegionalViz;