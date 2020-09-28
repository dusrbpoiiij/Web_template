import React from 'react'
import { withRouter } from 'react-router-dom';
import NavItem from './navbar.item';

const NavbarList = ({history}) => {

  // make active nev item with text primary
  const isActive = (history, path) => {
    if(history.location.pathname === path) {
      return 'text-gray-800 font-bold';
    } else {
      return "";
    }
  }

  return (
    <ul className="list-reset flex md:justify-end flex-1 items-center flex-col md:flex-row">
      <NavItem link='/' name='Home' listStyle={isActive(history, '/')} />
      <NavItem link='/shop' name='Shop' listStyle={isActive(history, '/shop')} />
      <NavItem link='/dashboard' name='Dashboard' listStyle={isActive(history, '/dashboard')} />
      <NavItem link='/login' name='Login' listStyle={isActive(history, '/login')} />
      <NavItem link='/register' name='Sign in' listStyle={isActive(history, '/register')} />
    </ul>
  )
}

export default withRouter(NavbarList);