import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const paths = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "hooks",
    path: "/hooks",
  },
  {
    name: "decorator",
    path: "/decorator",
  },
  {
    name: "generator",
    path: "/generator",
  },
  {
    name: "iterator",
    path: "/iterator",
  },
  {
    name: "proxy",
    path: "/proxy",
  },
  {
    name: "reflect",
    path: "/reflect",
  },
  {
    name: "symbol",
    path: "/symbol",
  },
  {
    name: "ant",
    path: "/ant",
  },
];

export default () => {
  const history = useHistory();
  

  return (
    <ul>
      {
        paths.map(el => <li key={el.path}><Link className={history.location.pathname === el.path ? 'active' : 'inActive'} to={el.path}>{el.name}</Link></li>)
      }
    </ul>
  );
};