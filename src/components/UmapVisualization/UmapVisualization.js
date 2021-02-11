import React, { Component } from 'react';

class UmapVisualization extends Component {
    render() {
        let {name, value} = this.props.selectedConcept;

        return( <div>You selected {value}. This page will show you umaps</div>);
    }
}

export default UmapVisualization;