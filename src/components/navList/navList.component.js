import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const NavList = ({ isOpen }) => {
  return (
    <div
      className={classNames('collapse', 'navbar-collapse', {
        show: isOpen
      })}
    >
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            List View
            <span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavList;
