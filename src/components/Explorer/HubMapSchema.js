import React, { useRef, useEffect, Component } from 'react';

function HubMapSchema(props) {
  const ref = useRef(null);

  useEffect(() => {
    // Manually attach event listeners or call imperative methods if needed
    const element = ref.current;
    if (!element) return;

    const handleClick = (event) => {
      console.log('HubMapSchema clicked', event.detail);
    };

    element.addEventListener('cell-click', handleClick);

    return () => {
      element.removeEventListener('cell-click', handleClick);
    };
  }, []);

  // Pass properties as attributes (which are treated as strings)

  return (
    <hra-medical-illustration
      ref={ref}
      selected-illustration="https://purl.humanatlas.io/2d-ftu/kidney-nephron"
      illustrations="https://cdn.humanatlas.io/digital-objects/graph/2d-ftu-illustrations/latest/assets/2d-ftu-illustrations.jsonld"
    />
  );
  
}

class HubMapSchemaComponent extends Component {

  render() {
    return (
      <HubMapSchema />
    );
  }
}

export default HubMapSchemaComponent;  


    