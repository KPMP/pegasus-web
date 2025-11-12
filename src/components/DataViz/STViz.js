import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DataTypeSelectorContainer from './DataTypeSelectorContainer';

class STViz extends Component {


    render() {
        return (
            <div className='height-wrapper mb-3'>
            <Container id='outer-wrapper'>
                <DataTypeSelectorContainer isLoadingUmap={false} />
                <Container className='mt-3 rounded border p-3 shadow-sm mb-5'>

                    <Row xs='12'>
                        <Col lg='6'>
                            <Row xs='12' className='mb-4'>
                                <Col lg='12'>
                                    <h5>ST VIS PAGE</h5>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6' className="umapPlot-container">
                                <img
                            id="umapPlot"
                            alt="all samples of single nucleus UMAP"
                            src="/img/sn_reference-UMAP_all-samples_2024-02-06.svg" />
                                </Col>
                            </Row>
                        </Col>

                        <Col lg='6'>
                            <Row xs='12' className='mb-4'>
                                <Col lg='12'>
                                    <div className={'featurePlot-title-hidden'}><h5>St Viz Expression</h5><hr /></div>
                                </Col>
                            </Row>
                            <Row className='featurePlot-loader-background'>
                                <Col lg='12' className="featurePlot-container">
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </Container>
            </div>
        )
    }
}

export default STViz;
