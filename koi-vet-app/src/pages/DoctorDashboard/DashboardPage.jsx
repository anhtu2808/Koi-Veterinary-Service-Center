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
      style={{ backgroundColor: "#1f2b6c", color: "white" }}
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
              backgroundColor: "#22887f",
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
              backgroundColor: "#33dfd0",
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
              backgroundColor: "#FFC300",
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
              backgroundColor: "#C70039 ",
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
            style={{ backgroundColor: "#0f3490 " }}
          >
            <Bar
              data={{
                labels: ["A", "B", "C", "D"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [100, 200, 300, 400], // cột Oy
                    backgroundColor: "rgba(201, 2, 255, 0.8)",
                  },
                ],
              }}
              options={{
                color: "white",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: "white" }, // X-axis labels
                    grid: { color: "rgba(255, 255, 255, 0.2)" }, // Grid lines color
                  },
                  y: {
                    ticks: { color: "white" }, // Y-axis labels
                    grid: { color: "rgba(255, 255, 255, 0.2)" }, // Grid lines color
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="row doughnut-line-chart">
        <div className="col-md-3">
          <div
            className="dataCard revenueCard"
            style={{ backgroundColor: "#0f3490 " }}
          >
            <Doughnut
              data={{
                labels: ["B"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [200], // cột Oy
                    backgroundColor: ["rgba(70, 210, 64, 0.8)"],
                    borderColor: ["rgba(70, 210, 64, 0.8)"],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: "white" }, // Legend text color
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="dataCard revenueCard"
            style={{ backgroundColor: "#0f3490 " }}
          >
            <Doughnut
              data={{
                labels: ["A"], // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: [100], // cột Oy
                    backgroundColor: ["rgba(250, 192, 19, 0.8)"],
                    borderColor: ["rgba(250, 192, 19, 0.8)"],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: { color: "white" }, // Legend text color
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="dataCard categoryCard"
            style={{ backgroundColor: "#0f3490 " }}
          >
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
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255, 255, 255, 0.2)" },
                  },
                  y: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255, 255, 255, 0.2)" },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: "white" },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
