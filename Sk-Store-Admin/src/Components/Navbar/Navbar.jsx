import React from 'react'
import "./Navbar.css"
import navLogo from "../../assets/nav-logo.svg"
import navProfile from "../../assets/nav-profile.svg"
import navbar from "../../assets/logo.png"
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>

      <img src={navbar} alt="" />
      {/* <img src={navLogo} alt="" /> */}
      <div>

      <p>SK-STORE</p>
      <span>Admin Panel</span>
      </div>
      </div>

      <img src={navProfile} alt="" className='nav-profile' />
    </div>
  )
}

export default Navbar
