import React from 'react'

const Navbar = () => {

  const token = sessionStorage.getItem('token')
  const email = sessionStorage.getItem('email')
  const name = sessionStorage.getItem('username')

  // logout functionality
  const handleLogout = () => {
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-800 text-2xl font-bold">
          Gps Locator
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-gray-600">{name}  </div>
          <div className='text-gray-600 cursor-pointer' onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
