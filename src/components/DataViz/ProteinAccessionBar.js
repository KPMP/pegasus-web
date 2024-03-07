import { Component, Container } from "react";
import { Container, Row, Col } from 'reactstrap';

class ProteinAccessionBar extends Component{

  getTabGroup = (accessionNums) => {
      let tabs = []
      for (let accession of accessionNums) {
          tabs.push(<Button color="primary" onClick={() => this.handleAccessionChange(accession)} active={this.state.selectedAccession === accession}>{accession}</Button>)
      }
      return(<ButtonGroup>
          {tabs}
          </ButtonGroup>)
  }

  render() {
    return {
      <Container >

      </Container>
    }
  }
}

export default ProteinAccessionBar
