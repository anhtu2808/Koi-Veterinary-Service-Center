import React, { useEffect, useState } from 'react'
import "./Schedual.css"
import { createScheduleAPI, fetchSchedualByVetIdAPI, fetchVetsAPI } from '../../apis'
import { toast } from 'react-toastify'
import { Switch } from 'antd'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Select from 'react-select';
import Loading from '../../components/Loading/Loading'
const Schedual = () => {
    const [selectedVetId, setSelectedVetId] = useState(null)
    const [veterinarians, setVeterinarians] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [selectedDate, setSelectedDate] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [schedules, setSchedules] = useState([])
    const [selectDateTrigger, setSelectDateTrigger] = useState(0)
    const handleDateClick = (date) => {
        if (isEditMode) {
            if (selectedDate.includes(date)) {
                setSelectedDate(selectedDate.filter(item => item !== date)) // xóa ngày đã chọn
            } else {
                setSelectedDate([...selectedDate, date]) // thêm ngày đã chọn
            }
            console.log(selectedDate)
        } else {
            console.log("View mode")
        }
    }
    // const fetchAppointments = async () => {
    //     const response = await fetchAppointmentsInDayVetIdAPI(selectedVetId, selectedDate)
    //     setAppointments(response.data)
    // }
    const fetchSchedual = async () => {
        await setSelectedDate([])
        await setSchedules([])
        const response = await fetchSchedualByVetIdAPI(selectedVetId)
        response.data.forEach(item => {
            setSchedules(prev => [...prev, item.date])
        });
        console.log(schedules)
    }
    const formatMonth = (date) => {
        return date.toLocaleString('vi-VN', { month: 'long', year: 'numeric' });
    }
    const handleChangeSelectedVet = (value) => {
        setSelectedVetId(value)
    }
    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };
    useEffect(() => {
        fetchSchedual()
    }, [selectedVetId, selectDateTrigger])
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
        setSelectDateTrigger(selectDateTrigger + 1)
        toast(response.message)
    }
    useEffect(() => {
        getVeterinarian()
    }, [])
    useEffect(() => {

    }, [selectedVetId])
    const renderDate = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
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
            if (day < 10) {
                day = `0${day}`
            }
            const date = `${year}-${month + 1}-${day}`;
            const isSelected = selectedDate.includes(date); // check xem ngày đó đã đc select chưa
            const isToday = schedules.includes(date); // check xem ngày đó đã có lịch chưa
            const isAvailable = selectedVetId && new Date(date) >= new Date(new Date().toDateString());
            days.push(
                <div
                    key={day}
                    className={`${isAvailable ? 'day' : 'disabled'} ${isToday ? 'current-day' : ''} ${isSelected ? 'chooosed-day' : ''}`}
                    onClick={() => isAvailable ? handleDateClick(date) : null}
                >
                    {day}

                </div>
            );
        }
        return days
    }
    return (
        <div className="container text-start">
            <AdminHeader title={"Veterinarian Schedual"} />
            <label htmlFor="select-veterinarian">Select Veterinarian</label>

            <div className='d-flex flex-row gap-5 align-items-center'>

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
                <label htmlFor="select-veterinarian">Edit mode:</label>
                <Switch checkedChildren="Edit" unCheckedChildren="View" />
            </div>
            <div className='d-flex flex-row gap-5'>
                <div className="calendar-container mt-5 mx-0 d-flex flex-row gap-5 justify-content-center">
                    {/* Header với nút điều hướng tháng */}
                    <div className='d-flex flex-column text-center align-items-center justify-content-center gap-5'>
                        <div className="calendar-header">
                            <button onClick={handlePreviousMonth}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-square-fill previous-month-btn" viewBox="0 0 16 16">
                                    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                                </svg>
                            </button>
                            <h2>{formatMonth(currentDate)}</h2>
                            <button onClick={handleNextMonth}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-square-fill next-month-btn" viewBox="0 0 16 16">
                                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                                </svg>
                            </button>
                        </div>
                        {/* Lưới các ngày trong tháng */}
                        <div className="days-grid">
                            {isLoading ? <Loading /> : renderDate()}
                        </div>
                        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className='d-flex flex-column gap-5 mt-5 calendar-container'>
                    <h3>Appointment List</h3>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td className='text-center'>
                                    <button className='btn btn-primary'>View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default Schedual