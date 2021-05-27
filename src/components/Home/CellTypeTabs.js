import React, { useState } from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import TabSection from './TabSection';
import AccordionTabSection from './AccordionTabSection';

const CellTypeTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div id="cell-type-tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Glomerular / Renal Corpuscle
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Tubules
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Interstitium
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Vessels
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabSection data={props.data['Renal Corpuscle']} tabId='1' isGlomerulusSchematic={true} handleCellTypeClick={props.handleCellTypeClick} />
        <AccordionTabSection data={props.data.Tubules} tabId='2' isNephronSchematic={true} handleCellTypeClick={props.handleCellTypeClick} />
        <AccordionTabSection data={props.data.Interstitium} tabId='3' handleCellTypeClick={props.handleCellTypeClick} />
        <TabSection data={props.data.Vessels} tabId='4' handleCellTypeClick={props.handleCellTypeClick} />
      </TabContent>
    </div>
  );
}

export default CellTypeTabs;