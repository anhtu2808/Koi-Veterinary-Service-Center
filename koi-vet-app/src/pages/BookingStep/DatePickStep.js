import React from 'react'
import '../../components/DatePicker/datepicker.css'
const DatePickStep = () => {
  return (
    <div>
      
        <div className="calendar-container">
          {/* Header với nút điều hướng tháng */}
          <div className="calendar-header">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-square-fill previous-month-btn" viewBox="0 0 16 16">
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
              </svg>
            </button>
            <h2>Tháng 09, 2024</h2>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-square-fill next-month-btn" viewBox="0 0 16 16">
                <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
              </svg>
            </button>
          </div>

          {/* Lưới các ngày trong tháng */}
          <div className="days-grid">
            {/* Giả lập dữ liệu ngày của tháng */}
            <div className="day">1</div>
            <div className="day disabled">2</div> {/* Không có slot trống */}
            <div className="day">3</div>
            <div className="day">4</div>
            <div className="day">5</div>
            <div className="day disabled">6</div> {/* Không có slot trống */}
            <div className="day">7</div>

            <div className="day">8</div>
            <div className="day">9</div>
            <div className="day">10</div>
            <div className="day">11</div>
            <div className="day">12</div>
            <div className="day">13</div>
            <div className="day">14</div>

            <div className="day disabled">15</div> {/* Không có slot trống */}
            <div className="day">16</div>
            <div className="day">17</div>
            <div className="day">18</div>
            <div className="day">19</div>
            <div className="day">20</div>
            <div className="day">21</div>

            <div className="day">22</div>
            <div className="day">23</div>
            <div className="day">24</div>
            <div className="day">25</div>
            <div className="day">26</div>
            <div className="day">27</div>
            <div className="day disabled">28</div> {/* Không có slot trống */}

            <div className="day">29</div>
            <div className="day">30</div>
          </div>
          <hr/>
          <div className="slots text-start">
            <h3>Danh sách bác sĩ:</h3>
            <div className="slot">Anh Tú</div>
            <div className="slot">Phú Khang</div>
            <div className="slot">Trịnh Nhân</div>
            <div className="slot">Huy Vũ</div>
            <div className="slot">Chí Hào</div>
       
            <p>Chọn khung giờ để tiếp tục đặt lịch khám bệnh</p>
          </div>
          <hr/>
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