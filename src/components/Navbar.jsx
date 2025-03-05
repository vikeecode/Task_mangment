import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-48 ml-1 sm:place-content-evenly'>
      <NavLink to="/">
        Home
      </NavLink>

      <NavLink to="/pastes">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
