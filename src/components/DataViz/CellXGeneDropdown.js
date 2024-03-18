import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CellXGeneDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle =() => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="down" className="cellxgene-dropdown">
                <DropdownToggle caret className='float-end' color='primary'>View DiffEx in CellXGene</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" target="_blank" rel="noopener noreferrer" href={this.props.v1}>
                        Version 1.0 (Nature 2023)
                    </DropdownItem>
                    <DropdownItem disabled>
                        Version 1.5 (Coming Soon)
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default CellXGeneDropdown;