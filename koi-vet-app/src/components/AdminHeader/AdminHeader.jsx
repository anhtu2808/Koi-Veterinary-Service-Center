import React from 'react'

const AdminHeader = ({title}) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{title}</h1>
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
        </>
    )
}

export default AdminHeader