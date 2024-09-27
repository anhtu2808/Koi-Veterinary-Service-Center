import React from 'react'
import SideBar from '../../components/SideBar/SideBar'


function UserLayout({ children }) {
  return (
   <div className="col-md-12">
    <SideBar/>
    {children}
    
   </div>
  )
}

export default UserLayout