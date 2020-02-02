import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ text, link }) => {
  return (
    <div className="col-sm-6 text-sm-right">
      <Link to={link}>
        <button type="button" className="btn btn-primary mb-3">
          {text}
        </button>
      </Link>
    </div>
  );
};

export default LinkButton;
