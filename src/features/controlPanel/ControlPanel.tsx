import React from 'react';
import DropdownComponent from '../dropdownComponent/DropdownComponent';
import './controlPanelStyle.css';

const ControlPanel = () => {
  console.log('ControlPanelComponent:Rendered');

  const onClickPlaceholder = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Export');
  };

  return (
    <>
      <div className="controlPanel">
        <div className="panelElements">
          <DropdownComponent />
          <button className="newCategory" onClick={onClickPlaceholder}>
            {'=> Export'}
          </button>
        </div>
      </div>
      <div className="underline"></div>
    </>
  );
};

export default ControlPanel;
