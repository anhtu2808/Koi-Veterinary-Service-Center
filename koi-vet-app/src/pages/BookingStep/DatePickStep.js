import React, { useState } from 'react'
import '../../components/DatePicker/datepicker.css'
const response  = {
  "status": "200",
  "message": "Get Schedule ID Successfully",
  "data": [
      {
          "day": "2024-10-01",
          "slots": [
              {
                  "startTime": "08:00:00",
                  "endTime": "10:00:00"
              },
              {
                  "startTime": "13:00:00",
                  "endTime": "15:00:00"
              },
              {
                  "startTime": "16:30:00",
                  "endTime": "18:00:00"
              }
          ]
      },
      {
          "day": "2024-10-02",
          "slots": [
              {
                  "startTime": "09:30:00",
                  "endTime": "11:30:00"
              },
              {
                  "startTime": "14:00:00",
                  "endTime": "16:00:00"
              }
          ]
      },
      {
          "day": "2024-10-03",
          "slots": [
              {
                  "startTime": "10:00:00",
                  "endTime": "12:00:00"
              },
              {
                  "startTime": "15:30:00",
                  "endTime": "17:30:00"
              }
          ]
      },
      {
          "day": "2024-10-04",
          "slots": [
              {
                  "startTime": "08:30:00",
                  "endTime": "10:30:00"
              },
              {
                  "startTime": "11:00:00",
                  "endTime": "13:00:00"
              },
              {
                  "startTime": "14:30:00",
                  "endTime": "16:30:00"
              }
          ]
      },
      {
          "day": "2024-10-07",
          "slots": [
              {
                  "startTime": "09:00:00",
                  "endTime": "11:00:00"
              },
              {
                  "startTime": "13:30:00",
                  "endTime": "15:30:00"
              },
              {
                  "startTime": "16:00:00",
                  "endTime": "18:00:00"
              }
          ]
      },
      {
          "day": "2024-10-08",
          "slots": [
              {
                  "startTime": "10:30:00",
                  "endTime": "12:30:00"
              },
              {
                  "startTime": "14:00:00",
                  "endTime": "16:00:00"
              }
          ]
      },
      {
          "day": "2024-10-09",
          "slots": [
              {
                  "startTime": "08:00:00",
                  "endTime": "10:00:00"
              },
              {
                  "startTime": "11:30:00",
                  "endTime": "13:30:00"
              },
              {
                  "startTime": "15:00:00",
                  "endTime": "17:00:00"
              }
          ]
      }
  ]
}

const DatePickStep = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    // Điều chỉnh để thứ 2 là ngày đầu tuần
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];

    // Thêm tiêu đề cho các ngày trong tuần
    const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    weekDays.forEach(day => {
      days.push(<div key={`weekday-${day}`} className="weekday">{day}</div>);
    });

    // Thêm ô trống cho các ngày trước ngày đầu tiên của tháng
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="disabled"></div>);
    }

    // Render các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isDisabled = response.data.some(item => new Date(item.day) === new Date(year, month , day)); //
      console.log(isDisabled)
      days.push(
        <div
          key={day}
          className={`day ${isToday ? 'current-day' : ''} ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Xử lý logic khi chọn ngày ở đây
  }

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  }

  const handleNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  }

  const formatMonth = (date) => {
    return date.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });
  }

  return (
    <div>
      <div className="calendar-container">
        {/* Header với nút điều hướng tháng */}
        <div className="calendar-header">
          <button onClick={handlePreviousMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-square-fill previous-month-btn" viewBox="0 0 16 16">
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
            </svg>
          </button>
          <h2>{formatMonth(currentDate)}</h2>
          <button onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-square-fill next-month-btn" viewBox="0 0 16 16">
              <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
            </svg>
          </button>
        </div>

        {/* Lưới các ngày trong tháng */}
        <div className="days-grid">
          {renderDays()}
        </div>
        
        <hr />
        {/* Slot giả lập cho ngày 3 */}
        <div className="slots text-start">
          <h3>Khung giờ có sẵn cho ngày 03:</h3>
          <div className="slot">08:00- 9:30</div>
          <div className="slot">09:30-10:00</div>
          <div className="slot">09:30-10:00</div>
          <p>Chọn khung giờ để tiếp tục đặt lịch khám bệnh</p>
        </div>
      </div>
    </div>
  )
}

export default DatePickStep