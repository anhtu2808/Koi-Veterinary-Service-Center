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
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';
import AllAppointment from './pages/AllAppointmentPage/AllAppointment';
import BookingPage from './pages/BookingPage/BookingPage';
import { useEffect } from 'react';
import { fetchMyInfoAPI } from './apis';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import UserProtectedRoute from './components/ProtectedRoute/UserProtectedRoute';
import AdminLayout from './pages/layout/AdminLayout';
import PondInformation from './pages/PondInformation/PondInformation';

function App() {
  const isAuthorized = useSelector(state => state?.user?.isAuthorized)
  const dispatch = useDispatch()

  useEffect(() => { // fetch my info when authorized
    if (isAuthorized) {
      const fetchMyInfo = async () => {
        const response = await fetchMyInfoAPI();
        console.log(response);
        if (response.status === 200) {
          dispatch(setUser(response.data))
        }
      }
      fetchMyInfo();

    }
  }, [isAuthorized, dispatch])
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/*" element={
          <UserLayout>
            <Routes>
              <Route path="/faq" element={<FAQ />} /> {/* Trang chủ User */}
              <Route path="/" element={<HomePage />} />
              <Route path="/medicine" element={<Medicine />} />
              {/* Thêm các route khác của User ở đây */}
              <Route path='/veterinarians' element={<VeterinarianPage />} />
              <Route path='/services' element={<ServicePage />} />
              <Route path='/vet-profile' element={<VetProfile />} />
              
              {/* Protected routes */}
              <Route element={<UserProtectedRoute />}>
                <Route path='/profile' element={<MyProfile />} />
                <Route path='/booking' element={<BookingPage />} />
              </Route>
            </Routes>
          </UserLayout>
        } />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<DocterDashboard />} />
              <Route path="/usermanagement" element={<UserManagementPage />} />
              <Route path="/allappointment" element={<AllAppointment />} />
              <Route path="/pondinformation/:pondId" element={<PondInformation />} />

              {/* Add more admin routes as needed */}
            </Routes>
          </AdminLayout>
        } />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
