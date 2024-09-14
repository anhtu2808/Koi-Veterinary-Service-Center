-- Xóa cơ sở dữ liệu cũ (nếu có)
USE master;
DROP DATABASE IF EXISTS KoiVeterinaryService;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE KoiVeterinaryService;
USE KoiVeterinaryService;

-- Bảng Roles quản lý các loại vai trò người dùng
CREATE TABLE Roles (
    role_id INT IDENTITY(1,1) PRIMARY KEY,
    role_name NVARCHAR(50) NOT NULL -- Các giá trị sẽ là 'Customer', 'Veterinarian', 'Staff', 'Manager'
);

-- Thêm các vai trò vào bảng Roles
INSERT INTO Roles (role_name) VALUES ('Customer');
INSERT INTO Roles (role_name) VALUES ('Veterinarian');
INSERT INTO Roles (role_name) VALUES ('Staff');
INSERT INTO Roles (role_name) VALUES ('Manager');

-- Bảng Users quản lý người dùng chung
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    role_id INT, -- Tham chiếu đến bảng Roles
    phone NVARCHAR(15),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Bảng Customers quản lý khách hàng
CREATE TABLE Customers (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT, -- Tham chiếu đến bảng Users
    address NVARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Bảng Veterinarians quản lý bác sĩ thú y
CREATE TABLE Veterinarians (
    vet_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT, -- Tham chiếu đến bảng Users
    specialization NVARCHAR(255), -- Chuyên môn của bác sĩ
    available BIT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Bảng Services quản lý các dịch vụ
CREATE TABLE Services (
    service_id INT IDENTITY(1,1) PRIMARY KEY,
    service_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    base_price DECIMAL(10, 2) NOT NULL, -- Giá cơ bản của dịch vụ
    delivery_price DECIMAL(10, 2), -- Giá di chuyển
    kilomet_price FLOAT,  -- Giá cho mỗi kilomet
    fish_quantity INT, -- Số lượng cá
    fish_price DECIMAL(10, 2), -- Giá dịch vụ tính theo số lượng cá
    pond_quantity INT, 
    pond_price DECIMAL(10, 2), 
    tank_quantity INT, 
    tank_price DECIMAL(10, 2)
);
-- Bảng Pond quản lý thông tin hồ cá
CREATE TABLE Pond (
    pond_id INT IDENTITY(1,1) PRIMARY KEY,
    status NVARCHAR(255),
    depth FLOAT, -- Chiều sâu của hồ cá 
    perimeter FLOAT, -- Diện tích hồ cá (m2)
    customer_id INT, -- Tham chiếu đến bảng Customers
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


-- Bảng Koi quản lý thông tin cá Koi
CREATE TABLE Koi (
    koi_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT, -- Tham chiếu đến bảng Customers
    name NVARCHAR(100) NOT NULL,
    breed NVARCHAR(100), -- Giống cá
    age INT, -- Tuổi của cá Koi
    height INT, -- Chiều cao
    kilogram FLOAT, -- Khối lượng
    health_status NVARCHAR(255), -- Tình trạng sức khỏe
    notes NVARCHAR(MAX), -- Ghi chú thêm
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
-- Bảng Appointments quản lý lịch hẹn
CREATE TABLE Appointments (
    appointment_id INT IDENTITY(1,1) PRIMARY KEY,
    vet_id INT, -- Tham chiếu đến bảng Veterinarians
    service_id INT, -- Tham chiếu đến bảng Services
    koi_id INT, -- Cá Koi liên quan
	pond_id int , 
    appointment_date DATETIME NOT NULL, -- Ngày hẹn
    appointment_status BIT, -- Trạng thái của lịch hẹn   
    start_time TIME, -- Giờ bắt đầu
    end_time TIME, -- Giờ kết thúc
    location NVARCHAR(255), -- Địa điểm ('center' or 'home')
    status NVARCHAR(50) CHECK (status IN ('pending', 'completed', 'cancelled')), -- Trạng thái của lịch hẹn
    result NVARCHAR(MAX), -- Kết quả sau khi khám
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (vet_id) REFERENCES Veterinarians(vet_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id),
    FOREIGN KEY (koi_id) REFERENCES Koi(koi_id),
    FOREIGN KEY (pond_id) REFERENCES Pond(pond_id)


);

-- Bảng Prescription quản lý đơn thuốc (1:1 với Services)
CREATE TABLE Prescription (
    pres_id INT IDENTITY(1,1) PRIMARY KEY,
		appointment_id int unique , 
    medicine_name NVARCHAR(255), -- Tên thuốc
    pres_quantity INT, -- Số lượng thuốc
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE


);



-- Bảng VetSchedules quản lý lịch làm việc của bác sĩ thú y
CREATE TABLE VetSchedules (
    schedule_id INT IDENTITY(1,1) PRIMARY KEY,
    vet_id INT, -- Tham chiếu đến bảng Veterinarians
    available_date DATE NOT NULL, -- Ngày có thể làm việc
    available_time_from TIME NOT NULL, -- Thời gian bắt đầu
    available_time_to TIME NOT NULL, -- Thời gian kết thúc
    is_available BIT DEFAULT 1, -- Bác sĩ có rảnh không
    is_booked BIT DEFAULT 0, -- Lịch này đã được đặt chưa
    FOREIGN KEY (vet_id) REFERENCES Veterinarians(vet_id),
    CHECK (available_time_from < available_time_to) -- Ràng buộc logic
);

-- Bảng Feedback quản lý đánh giá và phản hồi của khách hàng
CREATE TABLE Feedback (
    feedback_id INT IDENTITY(1,1) PRIMARY KEY,
    appointment_id INT UNIQUE, -- Tham chiếu đến bảng Appointments
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Đánh giá từ 1 đến 5 sao
    comments NVARCHAR(MAX), -- Bình luận của khách hàng
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE
);

-- Bảng Invoices quản lý hóa đơn (1:1 với Appointments)
CREATE TABLE Invoices (
    invoice_id INT IDENTITY(1,1) PRIMARY KEY,
    appointment_id INT UNIQUE, -- Tham chiếu đến bảng Appointments, quan hệ 1:1
    invoice_date DATETIME DEFAULT GETDATE(), -- Ngày hóa đơn
    total_amount DECIMAL(10, 2), -- Tổng tiền
    payment_status NVARCHAR(50) DEFAULT 'unpaid', -- Trạng thái thanh toán
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE -- Ràng buộc 1:1
);

-- Bảng HomeInfo quản lý thông tin trang chủ
CREATE TABLE News (
    new_id INT  PRIMARY KEY,
    new_name NVARCHAR(255), -- Tin tức
	description nvarchar(max ) ,
	img nvarchar(255) ,
user_id int , 
FOREIGN KEY (user_id) REFERENCES Users(user_id)
	) ;
Create table fag( 
fag_id int primary key ,
fag_name  NVARCHAR(255),
description nvarchar(max ) ,
user_id int , 
FOREIGN KEY (user_id) REFERENCES Users(user_id)


);







