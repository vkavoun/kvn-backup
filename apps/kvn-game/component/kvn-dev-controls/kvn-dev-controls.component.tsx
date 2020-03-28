import React from 'react';

import './kvn-dev-controls.component.scss';

function KvnDevControlsComponent({ handleResetClick }) {
  return (
    <div className="kvn-dev-controls-component">
      <button onClick={handleResetClick}>RESET</button>
    </div>
  );
}

export default KvnDevControlsComponent;
