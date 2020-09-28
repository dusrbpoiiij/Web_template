import React from 'react'
import {Link} from 'react-router-dom';

const NavItem = ({link, listStyle, name}) => {
  return (
    
    <li className={`inline-block text-left text-gray-800 no-underline py-2 px-4 lg:${listStyle}`}>
      <Link to={link} className="">
        <span>{name}</span>
        </Link>
    </li>
    
  )
}

export default NavItem
