import React, { useState } from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import TabSection from './TabSection';
import AccordionTabSection from './AccordionTabSection';
import '@fontsource/libre-franklin';
import CellTypeEnum from './CellTypeEnum';
const CellTypeTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [activeCell, setActiveCell] = useState(CellTypeEnum.ALL);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div id="cell-type-tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
              setActiveCell(CellTypeEnum.ALL)
            }}
          >
            Glomerulus / Renal Corpuscle
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
              setActiveCell(CellTypeEnum.ALL)
            }}
          >
            Tubules
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
              setActiveCell(CellTypeEnum.ALL)
            }}
          >
            Interstitium
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
              setActiveCell(CellTypeEnum.ALL);
            }}
          >
            Vessels
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabSection data={props.data['Glomerulus / Renal Corpuscle']}
          tabId='1'
          activeTab={activeTab}
          isGlomerulusSchematic={true}
          handleCellTypeClick={props.handleCellTypeClick}
          setActiveTab={toggle}
          setActiveCell={setActiveCell}
          activeCell={activeCell}
          topLevelLink='Glomerulus / Renal Corpuscle' />
        <AccordionTabSection data={props.data.Tubules}
          tabId='2'
          isNephronSchematic={true}
          activeTab={activeTab}
          handleCellTypeClick={props.handleCellTypeClick}
          setActiveTab={toggle}
          setActiveCell={setActiveCell}
          activeCell={activeCell}
          topLevelLink='Tubules' />
        <AccordionTabSection data={props.data.Interstitium}
          tabId='3'
          handleCellTypeClick={props.handleCellTypeClick}
          topLevelLink='Intersitium' />
        <TabSection data={props.data.Vessels}
          tabId='4'
          handleCellTypeClick={props.handleCellTypeClick}
          topLevelLink='Vessels' />
      </TabContent>
    </div>
  );
}

export default CellTypeTabs;