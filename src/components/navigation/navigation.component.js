import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../app.constants';
import ToggleButton from '../toggleButton/toggleButton.component';
import NavList from '../navList/navList.component';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <Link to={ROUTES.home} className="navbar-brand">
        Sonalake Task
      </Link>

      <ToggleButton isOpen={isOpen} toggle={onToggle} />
      <NavList isOpen={isOpen} />
    </nav>
  );
};

export default Navigation;
