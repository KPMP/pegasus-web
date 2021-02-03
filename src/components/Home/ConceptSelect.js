import React, {Component} from "react";
import AsyncSelect from "react-select/async";
import { Container, Row, Col } from 'reactstrap';
import { fetchAutoComplete } from "../../helpers/ApolloClient"
import { faDna, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ConceptSelect extends Component {

    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.state = {
            inputValue: ""
        }
    }

    handleSelect = (input) => {
        this.setState({inputValue: ""});
        this.props.setSelectedConcept(input.value);
    };

    handleInputChange = (input) => {
        this.setState({inputValue: input})
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

    handleNoOptions = ({inputValue}) => {
        if (inputValue.trim().length < 3) {
            return "Please enter 3 or more characters to start search"
        } else {
            return "No results found"
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
                        noOptionsMessage={this.handleNoOptions}
                        onChange={this.handleSelect}
                        value={this.state.inputValue}
                        onInputChange={this.handleInputChange}
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