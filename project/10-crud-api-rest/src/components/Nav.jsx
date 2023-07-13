import React from 'react'
import { NavLink, Link } from 'react-router-dom'
function Nav() {
  return (
    <header>
      <Link> <h1>crud</h1></Link>
      <nav>
        <NavLink to='/posts'>post</NavLink>
        <NavLink to='/about'>about</NavLink>
        <NavLink to='/contacts'>contacts</NavLink>
      </nav>
    </header>
  )
}

export default Nav