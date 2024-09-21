import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import FAQ from './pages/FAQ/FAQ';
import UserLayout from './pages/layout/UserLayout';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={
            <UserLayout>
              <Routes>
                <Route path="/faq" element={<FAQ/>} /> {/* Trang chủ User */}
                
                {/* Thêm các route khác của User ở đây */}
              </Routes>
            </UserLayout>
          } />
      </Routes>
    </Router>
  );
}

export default App;
