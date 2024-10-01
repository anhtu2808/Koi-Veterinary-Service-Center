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
          <main className="col-md-9 col-lg-10 px-md-4 mx-auto main-content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

    </>
  )
}

export default AdminLayout