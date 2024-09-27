import './App.css';
import FAQ from './pages/FAQ/FAQ';
import UserLayout from './pages/layout/UserLayout';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage/HomePage';
import Medicine from './pages/Medicine/Medicine';
import DocterDashboard from './pages/DoctorDashboard/DocterDashboard';
import VeterinarianPage from './pages/VeterinarianPage/VeterinarianPage';
import UnauthorizedPage from './pages/UnauthorizedPage/UnauthorizedPage';
import MyProfile from './pages/MyProfile/MyProfile';
import ServicePage from './pages/ServicePage/ServicePage';
import VetProfile from './pages/VetProfile/VetProfile';
import UserManagement from './pages/UserManagementPage/UserManagementPage';
import AllAppointment from './pages/AllAppointmentPage/AllAppointment';
import BookingPage from './pages/BookingPage/BookingPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
        <Route path="/*" element={
            <UserLayout>
              <Routes>
                <Route path="/faq" element={<FAQ/>} /> {/* Trang chủ User */}
                <Route path="/" element={<HomePage/>} />
                <Route path="/medicine" element={<Medicine/>} />
                {/* Thêm các route khác của User ở đây */}
                <Route path='/veterinarians' element={<VeterinarianPage/>}/>
                <Route path='/profile' element={<MyProfile/>} />
                <Route path='/services' element={<ServicePage/>}/>
                <Route path='/vet-profile' element={<VetProfile/>} />
                <Route path='/usermanagement' element={<UserManagement/>} />
                <Route path='/allappointment' element={<AllAppointment/>} />
                <Route path='/booking' element={<BookingPage/>} />
              </Routes>
            </UserLayout>
          } />
         <Route path="/doctor/*" element={<DocterDashboard />} />  
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
