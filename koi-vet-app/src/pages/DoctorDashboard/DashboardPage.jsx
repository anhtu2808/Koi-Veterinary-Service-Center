import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "./DashboardPage.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function DashboardPage() {
  return (
    <div
      className="container appointment-dashboard"
      style={{ backgroundColor: "#F1F3F4" }}
    >
      <h1>Dashboard</h1>
      <nav className="w-100" style={{ marginBottom: "20px" }}>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
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
            <i class="bi bi-calendar2-fill"></i> Year
          </button>
        </div>
      </nav>
      <div className="row dashboard-card">
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              backgroundColor: "#E74C35",
              color: "white",
            }}
          >
            Total Appointment
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              backgroundColor: "#FFC001 ",
              color: "white",
            }}
          >
            Total Koi
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              backgroundColor: "#01A15F",
              color: "white",
            }}
          >
            Total Pond
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              backgroundColor: "#9479DA ",
              color: "white",
            }}
          >
            Total Revenue
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div
            className="dataCard numberCard"
            // style={{ backgroundColor: "#0f3490 " }}
          >
            <Bar
              data={{
                labels: ["A", "B", "C", "D"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [100, 200, 300, 400], // cột Oy
                    backgroundColor: "#9479DA",
                    borderColor: "#9479DA",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className="row doughnut-line-chart">
        <div className="col-md-3">
          <div className="dataCard revenueCard">
            <Doughnut
              data={{
                labels: ["Pond"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [200], // cột Oy
                    backgroundColor: "#01A15F",
                    borderColor: "#01A15F",
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="dataCard revenueCard">
            <Doughnut
              data={{
                labels: ["Koi"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [100], // cột Oy
                    backgroundColor: "#FFC001",
                    borderColor: "#FFC001",
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
                    borderColor: "#E74C35",
                    backgroundColor: "#E74C35",
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
