import React from 'react';
import './PreLoader.css'; // Đảm bảo bạn đã tạo file CSS này

const PreLoader = () => {
    return (
        <div id="preloader">
            <div className="loader"></div>
        </div>
    );
};

export default PreLoader;
