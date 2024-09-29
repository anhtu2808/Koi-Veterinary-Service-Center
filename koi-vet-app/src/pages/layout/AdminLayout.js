import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SideBar from '../../components/SideBar/SideBar'

function AdminLayout({ children }) {
  return (
    <>

      <div className="container-fluid">
        <div className="row">
          <SideBar />
          {children}
        </div>
      </div>
    
    </>
  )
}

export default AdminLayout