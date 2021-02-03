import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import { Container, Row, Col } from 'reactstrap';
import { fetchAutoComplete } from "../../helpers/ApolloClient"
import { faDna, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ConceptSelect extends Component {

    handleSelect = (input) => {
        this.setState({input: input});
        this.props.setSelectedConcept(input.value);
    };

    getLabelIcon = (type) => {
        switch(type) {
            case "cell_type":
                return <FontAwesomeIcon icon={faMicroscope} className="mr-2"/>
            case "gene":
                return <FontAwesomeIcon icon={faDna} className="mr-2"/>
            default:
                return <FontAwesomeIcon icon={faDna} className="mr-2"/>
        }
    };

    getOptions = async (searchString) => {
        const results = await fetchAutoComplete(searchString);
        return results.map(
            (result) => {
                let highlightedAliases = [];
                let aliases = result.aliases;
                if (aliases) {
                    highlightedAliases = result.aliases.map((item, index) =>
                        item.toLowerCase().includes(searchString.toLowerCase())?<strong>{index > 0 && ', '}{item}</strong>:<span>{index > 0 && ', '}{item}</span>
                    , this);
                }
                const labelIcon = this.getLabelIcon(result.type);
                return {
                    label: <div>{labelIcon}
                        {result.value} {result.aliases && <span>({highlightedAliases})</span>}</div>,
                    value: result
                }
            }, this
        );
    };

    render() {
        return (
            <React.Fragment>
                <Row xs="12">
                    <Col>
                        <h5>Search</h5>
                    </Col>
                </Row>
            <Row xs="12">
                <Col>
                    <AsyncSelect
                        loadOptions={this.getOptions}
                        onChange={(input) => this.handleSelect(input)}
                        placeholder="Enter gene, protein, or cell type"
                        className="select"
                        />
                </Col>
            </Row>
            </React.Fragment>
        )
    }
}

export default ConceptSelect;