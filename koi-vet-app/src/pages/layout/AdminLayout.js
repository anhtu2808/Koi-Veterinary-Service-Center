import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SideBar from '../../components/SideBar/SideBar'

function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminLayout