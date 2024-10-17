import React, { useEffect, useState } from 'react'
import "./Schedual.css"
import { createScheduleAPI, fetchVetsAPI } from '../../apis'
import { toast } from 'react-toastify'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Select from 'react-select';
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
    const handleChangeSelectedVet = (value) => {
        setSelectedVetId(value)
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
            <AdminHeader title={"Veterinarian Schedual"} />
            <label htmlFor="select-veterinarian">Select Veterinarian</label>
            <Select
                className="w-50"
                options={
                    veterinarians.map((vet) => ({
                        value: vet.vetId,
                        label: `Name: ${vet.user.fullName} | username: ${vet.user.username}`
                    }))
                }
                placeholder="Select Veterinarian"
                isSearchable={true} // Kích hoạt tính năng search
                onChange={(selectedOption) => handleChangeSelectedVet(selectedOption.value)}
            />
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