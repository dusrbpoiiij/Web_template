import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import NavbarToggle from './navbar.toggle';
import NavbarList from './navbar.list';
import './navbar.css';


const Header = () => {

  // implement toggle state 
  const [active, setActive] = useState(false)

  // Scroll Event
  const [back, setBack] = useState(0)
  const handleBackState = () => {
    const scrollY = window.scrollY
    if (scrollY > 100) {
      setBack(1)
    } else {
      setBack(0)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleBackState)
    return () => {
      window.removeEventListener('scroll', handleBackState)
    }
    }, [handleBackState]
  )

  // toggle controller 
  const menuState = () => {
    setActive(!active);
  }

  return (
      <nav id="header" className={`fixed w-full z-30 top-0 text-white ${back === 1 ? 'bg-white lg:text-gray-800 shadow' : ''}`}>
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <Link to="/" className="no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              LANDING
            </Link>
          </div>

          {/* Toggle when mobile */}
          <NavbarToggle active={active} menuState={menuState} />

          {/* Navbar list */}
          <div className={`${active ? 'flex menu-con--isActive' : 'hidden'} w-full flex-grow md:flex md:items-center md:w-auto mx-2 mt-2 md:mt-0 bg-white md:bg-transparent text-black p4 lg:p-0 z-20`} id="nav-content">
            <NavbarList />
          </div>

        </div>

        <hr className="
        border-b  opacity-25 my-0 py-0 'border-gray-100" />

      </nav>
  )
}

export default Header;
