import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import "./DashboardPage.css";
import { fetchDashboardAPI } from "../../apis";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState([]);

  const [time, setTime] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDashboardAPI(time);
      setDashboardData(response.data);
    };
    fetchData();

    const intervalId = setInterval(fetchData, 10000); // Lấy dữ liệu mỗi 10 giây
    return () => clearInterval(intervalId);
  }, [time]);

  let totalAppointmentcard = 0;
  let totalKoicard = 0;
  let totalPondcard = 0;
  let totalRevenuecard = 0;
  for (let i = 0; i < dashboardData.length; i++) {
    totalAppointmentcard += dashboardData[i].totalAppointment;
    totalKoicard += dashboardData[i].totalKoi;
    totalPondcard += dashboardData[i].totalPond;
    totalRevenuecard += dashboardData[i].totalRevenue;
  }

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
            onClick={() => setTime("day")}
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
            onClick={() => setTime("month")}
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
            onClick={() => setTime("year")}
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: "#E74C35",
              color: "white",
            }}
          >
            Total Appointment
            <p>{totalAppointmentcard}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: "#FFC001 ",
              color: "white",
            }}
          >
            Total Koi
            <p>{totalKoicard}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: "#01A15F",
              color: "white",
            }}
          >
            Total Pond
            <p>{totalPondcard}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: "#9479DA ",
              color: "white",
            }}
          >
            Total Revenue
            <p>{totalRevenuecard} VND</p>
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
                labels: dashboardData.map((item) =>
                  item.date ? item.date.split("T")[0] : "N/A"
                ), // cột Ox
                datasets: [
                  {
                    label: "Revenue",
                    data: dashboardData.map((item) => item.totalRevenue || 0), // cột Oy
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
        <div className="col-md-6">
          <div className="dataCard categoryCard">
            <Radar
              data={{
                labels: dashboardData.map(
                  (item) => item.day || item.date.split("T")[0]
                ),
                datasets: [
                  {
                    label: "Koi",
                    data: dashboardData.map((item) => item.totalKoi || 0), // Dữ liệu cho Koi và Pond
                    backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền
                    borderColor: "rgba(75, 192, 192, 1)", // Màu viền
                    borderWidth: 1,
                    pointBackgroundColor: "rgba(75, 192, 192, 1)", // Màu điểm
                    pointBorderColor: "#fff", // Màu viền điểm
                    pointHoverBackgroundColor: "#fff", // Màu nền khi hover
                    pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Màu viền khi hover
                  },
                  {
                    label: "Pond",
                    data: dashboardData.map((item) => item.totalPond || 0), // Dữ liệu cho Koi và Pond
                    backgroundColor: "rgba(255, 165, 0, 0.2)", // Màu nền
                    borderColor: "rgba(255, 165, 0, 1)", // Màu viền
                    borderWidth: 1,
                    pointBackgroundColor: "rgba(255, 165, 0, 1)", // Màu điểm
                    pointBorderColor: "#fff", // Màu viền điểm
                    pointHoverBackgroundColor: "#fff", // Màu nền khi hover
                    pointHoverBorderColor: "rgba(255, 165, 0, 1)", // Màu viền khi hover
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
                labels: dashboardData.map((item) => item.day || item.date), // cột Ox
                datasets: [
                  {
                    label: "Appointment",
                    data: dashboardData.map(
                      (item) => item.totalAppointment || 0
                    ), // cột Oy
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
