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
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Appointment</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                      <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                            className="rounded-circle"
                            width="30"
                            height="30"
                          />
                          Hello, Lekan
                        </button>
                      </div>
                    </div>
                  </div>
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