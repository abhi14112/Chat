import React from 'react'
import Navbar from './Navbar'
const Layout = ({children}) => {
  return (
    <div className='bg-primary text-secondary flex flex-col h-screen overflow-hidden'>
    <div className='px-8 py-4 shadow-sm shadow-neutral'>
        <Navbar/>
    </div>
    <div className='flex-1'>
            {children}
    </div>
    </div>
  )
}
export default Layout