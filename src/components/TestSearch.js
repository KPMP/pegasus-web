import React, { Component } from 'react';
import { createFragmentContainer } from 'react-relay';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import graphql from 'babel-plugin-relay/macro';

class TestSearch extends Component {
    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Gene Search</Label>
                        <Input type="text" name="gene" id="gene_search" placeholder="put gene here" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                <div>
                    {this.props.genes.map((gene, index) => {return <div>{gene.symbol}</div>})}
                </div>
            </div>
        )}
}

export default createFragmentContainer(TestSearch, {
    genes: graphql`        
        fragment TestSearch_genes on MyGeneInfoHit {
            id
            symbol
            name
        }
    `,
});