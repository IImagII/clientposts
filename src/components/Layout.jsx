import React from 'react'
import { NavBar } from './NavBar'

export const Layout = ({ children }) => {
   return (
      <>
         <div className='md:container md:mx-auto'>
            <NavBar />
            {children}
         </div>
      </>
   )
}
