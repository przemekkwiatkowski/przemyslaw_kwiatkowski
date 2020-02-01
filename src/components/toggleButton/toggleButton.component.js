import React from 'react';
import classNames from 'classnames';

const ToggleButton = ({ isOpen, toggle }) => {
  const handleClick = () => toggle();

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classNames('navbar-toggler', {
        collapsed: !isOpen
      })}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
};

export default ToggleButton;
