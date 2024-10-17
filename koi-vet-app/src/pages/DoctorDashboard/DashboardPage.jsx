import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import "./DashboardPage.css";
import { fetchDashboardAPI } from "../../apis";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState([]);

  const [time, setTime] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDashboardAPI(time);
      console.log("API Data:", response.data); // Kiểm tra dữ liệu API
      setDashboardData(response.data || []);
    };
    fetchData();
  }, [time]);

  //Polling 10s
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await fetchDashboardAPI(time);
      setDashboardData(response.data || []);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [time]);

  // Xủ lý dữ liệu nếu như API trả về bị thiếu dữ liệu
  const generateData = (length, formatter) => {
    return Array.from({ length }).map((_, i) => formatter(i) || {});
  };

  // Tạo dữ liệu 7 ngày, 6 tháng, hoặc 3 năm tùy thuộc vào `time`
  const formattedData = (() => {
    if (time === "day") {
      return generateData(7, (i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split("T")[0] || [];
        const matchedData = dashboardData.find((item) =>
          item.date?.startsWith(dateString)
        );
        return (
          matchedData || {
            date: dateString,
            totalAppointment: 0,
            totalKoi: 0,
            totalPond: 0,
            totalRevenue: 0,
          }
        );
      }).reverse();
    } else if (time === "month") {
      return generateData(6, (i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = date
          .toLocaleString("en-US", { month: "long" })
          .toUpperCase();
        const matchedData = dashboardData.find(
          (item) => item.month === monthName
        );
        console.log(`Checking month: ${monthName}`); // Debugging line

        return (
          matchedData || {
            month: monthName,
            totalAppointment: 0,
            totalKoi: 0,
            totalPond: 0,
            totalRevenue: 0,
          }
        );
      }).reverse();
    } else {
      return generateData(3, (i) => {
        const year = new Date().getFullYear() - i;
        const matchedData = dashboardData.find((item) => item.year == year);
        return (
          matchedData || {
            year: String(year),
            totalAppointment: 0,
            totalKoi: 0,
            totalPond: 0,
            totalRevenue: 0,
          }
        );
      }).reverse();
    }
  })();

  // Tổng hợp dữ liệu cho các card
  const totalAppointmentcard = formattedData.reduce(
    (acc, item) => acc + item.totalAppointment,
    0
  );
  const totalKoicard = formattedData.reduce(
    (acc, item) => acc + item.totalKoi,
    0
  );
  const totalPondcard = formattedData.reduce(
    (acc, item) => acc + item.totalPond,
    0
  );
  const totalRevenuecard = formattedData.reduce(
    (acc, item) => acc + item.totalRevenue,
    0
  );

  return (
    <div
      className="container"
      
    >
      <AdminHeader title="Dashboard" />
      <nav className="w-100" style={{ marginBottom: "20px" }}>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link custom-text-color"
            id="nav-day-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-day"
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
                labels: formattedData.map((item, index) =>
                  time === "day"
                    ? item.date || "N/A"
                    : item.month || item.year || "N/A"
                ),
                datasets: [
                  {
                    label: "Revenue",
                    data: formattedData.map((item) => item.totalRevenue || 0),
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
                labels: formattedData.map(
                  (item) => item.date || item.month || item.year
                ),
                datasets: [
                  {
                    label: "Koi",
                    data: formattedData.map((item) => item.totalKoi),
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
                    data: formattedData.map((item) => item.totalPond),
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
                labels: formattedData.map(
                  (item) => item.date || item.month || item.year
                ),
                datasets: [
                  {
                    label: "Appointment",
                    data: formattedData.map((item) => item.totalAppointment),
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
