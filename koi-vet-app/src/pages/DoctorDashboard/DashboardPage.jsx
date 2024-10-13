import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

function DashboardPage() {
  return (
    <div className="container">
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      <div className="row">
        <div className="headcard">
          <nav className="w-100">
            <div className="nav nav-tabs " id="nav-tab" role="tablist">
              <button
                className="nav-link custom-text-color"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                <i className="fas fa-calendar-day me-2 text-primary"></i>Day
              </button>
              <button
                className="nav-link custom-text-color"
                id="nav-disabled-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-disabled"
                type="button"
                role="tab"
                aria-controls="nav-disabled"
                aria-selected="false"
              >
                <i className="fas fa-calendar-alt me-2 text-success"></i>
                Month
              </button>
              <button
                className="nav-link custom-text-color"
                id="nav-disabled-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-disabled"
                type="button"
                role="tab"
                aria-controls="nav-disabled"
                aria-selected="false"
              >
                <i className="fas fa-calendar-year me-2 text-info"></i>Year
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="card"></div>
        </div>
        <div className="col-md-3">
          <div className="card"></div>
        </div>
        <div className="col-md-3">
          <div className="card"></div>
        </div>
        <div className="col-md-3">
          <div className="card"></div>
        </div>
      </div>
      <div className="row">
        <div className="dataCard numberCard">
          <Bar
            data={{
              labels: ["A", "B", "C", "D"], // cột Ox
              datasets: [
                {
                  label: "Revenue",
                  data: [100, 200, 300, 400], // cột Oy
                  backgroundColor: "rgba(255, 206, 86, 0.8)",
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="dataCard revenueCard">
            <Doughnut
              data={{
                labels: ["A", "B"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [100, 200], // cột Oy
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="dataCard categoryCard">
            <Line
              data={{
                labels: ["A", "B", "C", "D"], // cột Ox
                datasets: [
                  {
                    label: "Appointment",
                    data: [100, 300, 50, 150], // cột Oy
                    borderColor: "red",
                    backgroundColor: "red",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
