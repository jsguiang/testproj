import React from 'react';
import PropTypes from 'prop-types';

import './styles/switchButton.css';

export const SwitchButton = ({ onClick, isClicked }) => {
  const innerCircleClasses = isClicked ? 'is-clicked' : '';
  return (
    <div id="container-circles">
      <div
        id="outer-circle"
        onClick = {
          (e) => {
            if (!isClicked) {
              onClick();
            }
          }
        }
      >
        <div id="inner-circle" className={innerCircleClasses}>
        </div>
      </div>
    </div>
  );
};

SwitchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired
};

export default SwitchButton;
