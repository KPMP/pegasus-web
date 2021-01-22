import React from "react"
import { createFragmentContainer, QueryRenderer } from "react-relay"
import environment from "../helpers/RelayEnvironment"
import TestSearch from "./TestSearch"
import graphql from 'babel-plugin-relay/macro';

// Below you can usually use one query renderer per page
// and it represents the root of a query
export default function TestSearchRenderer({geneSearch}) {
    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
        query TestSearchRendererQuery($geneSearch: String!) {
          # The root field for the query
          genes(symbol: $geneSearch) {
            # A reference to your fragment container
            ...TestSearch_genes
          }
        }
      `}
            variables={"EGF"}
            render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>;
                } else if (props) {
                    return <TestSearch genes={props.genes} />;
                }
                return <div>Loading</div>;
            }}
        />
    );
}