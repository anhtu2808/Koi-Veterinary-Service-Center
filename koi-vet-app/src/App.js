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
import { setCustomer, setUser, setVeterinarian } from './store/userSlice';
import UserProtectedRoute from './components/ProtectedRoute/UserProtectedRoute';
import AdminLayout from './pages/layout/AdminLayout';
import PondInformation from './pages/PondInformation/PondInformation';
import AppointmentDetail from './pages/AppointmentDetail/AppointmentDetail';
import KoiInformation from './pages/KoiInformation/KoiInformation';
import InputKoiPage from './pages/InputKoiPage/InputKoiPage';
import InputPondPage from './pages/InputPondPage/InputPondPage';
import PondDetail from './pages/PondDetail/PondDetail';
import KoiDetail from './pages/KoiDetail/KoiDetail';
import AdminProtectedRoute from './components/ProtectedRoute/AdminProtectedRoute';
import ProfileLayout from './pages/layout/ProfileLayout';
import Koi from './components/Koi/Koi';
import InvoiceListPage from './pages/InvoiceListPage/InvoiceListPage';
import MedicineListPage from './pages/MedicineListPage/MedicineListPage';
import ServicePageDetail from './pages/ServicePageDetail/ServicePageDetail';
import KoiTreatmentPage from './pages/KoiTreatmentPage/KoiTreatmentPage';
import Pond from './components/Pond/Pond';
import PaymentFailPage from './pages/PaymentFailPage/PaymentFailPage';
import PondTreatmentPage from './pages/PondTreatmentPage/PondTreatmentPage';
import GGM from './pages/GoogleMeet/GGM';
import PaymentSuccessPage from './pages/PaymentSuccessPage/PaymentSuccessPage';
import Rating from './pages/Rating/Rating';
import ImageUpload from './components/testImage';
import PaymentCheckout from './pages/PaymentCheckout/PaymentCheckout';
import DashboardPage from './pages/DoctorDashboard/DashboardPage';
import Schedual from './pages/Schdual/Schedual';
import ServiceManagementPage from './pages/ServiceManagementPage/ServiceManagementPage';
import HomeVisitPricePage from './pages/HomeVisitPricePage/HomeVisitPricePage';
import 'react-quill/dist/quill.snow.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

function App() {
  const isAuthorized = useSelector(state => state?.user?.isAuthorized)
  const user = useSelector(state => state?.user)
  const dispatch = useDispatch()

  useEffect(() => { // fetch my info when authorized
    if (isAuthorized) {
      const fetchMyInfo = async () => {
        const response = await fetchMyInfoAPI();
        if (response.status === 200) {
          dispatch(setUser(response.data))
          dispatch(setCustomer(response.data.customer))
          dispatch(setVeterinarian(response.data.veterinarian))
        }
      }
      fetchMyInfo();
    }
  }, [isAuthorized, dispatch])
  const getCookie = (name) => {
    let cookieArr = document.cookie.split(";");

    return cookieArr
  }
  useEffect(() => {
    let authToken = getCookie("authToken");
    console.log(authToken);
  }, [])
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/medpage" element={<MedicineListPage />} />
          <Route path="/image" element={<ImageUpload />} />
          <Route path="/ggm" element={<GGM />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/*" element={
            <UserLayout>
              <Routes>
                <Route path="/services/:serviceId" element={<ServicePageDetail />} />
                <Route path="/faq" element={<FAQ />} /> {/* Trang chủ User */}
                <Route path="/" element={<HomePage />} />
                {/* Thêm các route khác của User ở đây */}
                <Route path='/veterinarians' element={<VeterinarianPage />} />
                <Route path='/services' element={<ServicePage />} />
                <Route path='/vetprofile/:vetId' element={<VetProfile />} />
                <Route path='/booking/paymentsuccess' element={<PaymentSuccessPage />} />
                <Route path='/booking/paymentfail' element={<PaymentFailPage />} />
                {/* Protected routes */}
                <Route element={<UserProtectedRoute />}>
                  <Route path='/booking' element={<BookingPage />} />
                  <Route path="/createkoi" element={<KoiDetail isCreate={true} />} />
                  <Route path="/createpond" element={<PondDetail isCreate={true} />} />
                  <Route path="/profile/*" element={
                    <ProfileLayout>
                      <Routes>
                        <Route path="/" element={<MyProfile />} />
                        <Route path='/koi' element={<Koi isAppointment={false} title="All My Koi" />} />
                        <Route path='/pond' element={<Pond isAppointment={false} title="All My Pond" />} />
                        <Route path='/koi/:koiId' element={
                          <KoiDetail
                            isCreate={false}
                            isUpdate={true}
                            isAppointment={false} />
                        } />
                        <Route path='/pond/:pondId' element={
                          <PondDetail
                            isCreate={false}
                            isUpdate={true}
                            isAppointment={false} />
                        } />

                        <Route path='/appointment' element={<AllAppointment />} />
                        <Route path="/appointment/:appointmentId" element={<AppointmentDetail />} />
                        <Route path="/google-meet/:appointmentId" element={<GGM />} />
                        <Route path="/koi-treatment/:appointmentId" element={<KoiTreatmentPage />} />
                        <Route path="/pond-treatment/:appointmentId" element={<PondTreatmentPage />} />
                        <Route path="/koidetail/:appointmentId" element={<KoiDetail isUpdate={false} isCreate={false} isAppointment={true} />} />
                        <Route path="/ponddetail/:appointmentId" element={<PondDetail isUpdate={false} isVeterinarian={false} isCreate={false} isAppointment={true} />} />
                      </Routes>
                    </ProfileLayout>


                  } >


                  </Route>
                </Route>
              </Routes>
            </UserLayout>
          } />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                {/* Protected routes */}
                <Route element={<AdminProtectedRoute />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/usermanagement" element={<UserManagementPage />} />
                  <Route path="/appointment" element={<AllAppointment />} />
                  <Route path="/appointment/:appointmentId" element={<AppointmentDetail />} />
                  <Route path="/pondinformation" element={<PondInformation />} />
                  <Route path="/inputkoipage" element={<InputKoiPage />} />
                  <Route path="/inputpondpage" element={<InputPondPage />} />
                  <Route path="/pondinformation" element={<PondInformation />} />
                  <Route path="/koiinformation" element={<KoiInformation />} />
                  <Route path="/ponddetail" element={<PondDetail />} />
                  <Route path="/koi-treatment/:appointmentId" element={<KoiTreatmentPage />} />
                  <Route path="/pond-treatment/:appointmentId" element={<PondTreatmentPage />} />
                  <Route path="/google-meet/:appointmentId" element={<GGM />} />
                  <Route path="/koidetail/:appointmentId" element={<KoiDetail isUpdate={true} isCreate={false} isAppointment={true} />} />
                  <Route path="/ponddetail/:appointmentId" element={<PondDetail isUpdate={true} isVeterinarian={true} isCreate={false} isAppointment={true} />} />
                  <Route path="/koidetail" element={<KoiDetail isUpdate={false} isCreate={true} isAppointment={false} />} />
                  <Route path="/invoice" element={<InvoiceListPage />} />
                  <Route path="/medicine" element={<Medicine />} />
                  <Route path="/medpage" element={< MedicineListPage />} />
                  <Route path="/paymentcheckout/:appointmentId" element={<PaymentCheckout />} />
                  <Route path="/usermanagement" element={<UserManagementPage />} />
                  <Route path="/schedual" element={<Schedual />} />
                  <Route path="/servicemanagement" element={<ServiceManagementPage />} />
                  <Route path="/homevisitprice" element={<HomeVisitPricePage />} />
                </Route>

                {/* <Route path="/koiinformation" element={<KoiInformation />} /> */}
                {/* <Route path="/pondinformation/:pondId" element={<PondInformation />} /> */}
                Add more admin routes as needed
              </Routes>
            </AdminLayout>
          } />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
        />
      </Router>
    </PersistGate>
  );
}

export default App;
