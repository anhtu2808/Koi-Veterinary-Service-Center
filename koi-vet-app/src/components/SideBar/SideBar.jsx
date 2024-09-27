import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-1">
                    <ul className="nav flex-column">
                        <li className="nav-item py-2">
                            <Link className="nav-link active" href="#">
                                <i className="fas fa-tachometer-alt"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="fas fa-users"></i> Users
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="far fa-calendar-alt"></i> All Appointment
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="far fa-images"></i> Photos
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="fas fa-sitemap"></i> Hierarchy
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="far fa-envelope"></i> Message
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="far fa-question-circle"></i> Help
                            </Link>
                        </li>
                        <li className="nav-item py-2">
                            <Link className="nav-link" href="#">
                                <i className="fas fa-cog"></i> Setting
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
  )
}

export default SideBar