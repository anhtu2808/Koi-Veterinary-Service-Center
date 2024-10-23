import React from "react";

const InvoiceList = ({appointmentId}) => {
    return (
        <div className=" d-flex flex-column gap-3 align-items-center">
            <h3>Invoice List</h3>

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody> 
                    <tr>
                        <td>1</td>
                        <td>2024-01-01</td>
                        <td>John Doe</td>
                        <td>100</td>
                        <td>Paid</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
