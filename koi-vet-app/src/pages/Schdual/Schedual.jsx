import React, { useEffect, useState } from 'react'
import "./Schedual.css"
import { createScheduleAPI, fetchVetsAPI } from '../../apis'
import { toast } from 'react-toastify'
const Schedual = () => {
    const [selectedVetId, setSelectedVetId] = useState([])
    const [veterinarians, setVeterinarians] = useState([])
    const [selectedDate, setSelectedDate] = useState([])
    const handleDateClick = (date) => {
        if (selectedDate.includes(date)) {
            setSelectedDate(selectedDate.filter(item => item !== date)) // xóa ngày đã chọn
        } else {
            setSelectedDate([...selectedDate, date]) // thêm ngày đã chọn
        }
        console.log(selectedDate)
    }
    const handleChangeSelectedVet = (e) => {
        setSelectedVetId(e.target.value)
    }
    const getVeterinarian = async () => {
        const response = await fetchVetsAPI()
        setVeterinarians(response.data)
    }
    const handleSubmit = async () => {
        const response = await createScheduleAPI(
            {
                vet_id: selectedVetId,
                dates: selectedDate
            }
        )
        toast(response.message)
    }
    useEffect(() => {
        getVeterinarian()
    }, [])
    const renderDate = () => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDayOfMonth = new Date(year, month, 1).getDay();
        firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const days = []
        const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        weekDays.forEach(day => {
            days.push(<div key={`weekday-${day}`} className="weekday">{day}</div>);
        });
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="disabled"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${month + 1}-${day}`;
            const isToday = date === new Date().toDateString();
            const isSelected = selectedDate.includes(date);
            days.push(
                <div
                    key={day}
                    className={`day ${isToday ? 'current-day' : ''} ${isSelected ? 'chooosed-day' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }
        return days
    }
    return (
        <div className="container">
            <h1>Veterinarian Schedual</h1>
            <label htmlFor="select-veterinarian">Select Veterinarian</label>
            <select className="form-select w-50" id="select-veterinarian" onChange={handleChangeSelectedVet}>
                <option>Select Veterinarian</option>
                {veterinarians.map((vet) => (
                    <option key={vet.vetId} value={vet.vetId}>{vet.user.fullName}</option>
                ))}
            </select>
            <div>
      <div className="calendar-container mt-5">
        {/* Header với nút điều hướng tháng */}

        {/* Lưới các ngày trong tháng */}
        <div className="days-grid">
          {renderDate()}
        </div>
        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
      </div>
    </div>

        </div>
    )
}

export default Schedual