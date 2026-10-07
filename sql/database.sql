CREATE DATABASE IF NOT EXISTS medicare_plus;
USE medicare_plus;

CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    password VARCHAR(255),
    dob DATE,
    gender ENUM('Male','Female','Other'),
    blood_group VARCHAR(5),
    address TEXT,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    specialization VARCHAR(100),
    department VARCHAR(100),
    qualification VARCHAR(200),
    experience_years INT,
    bio TEXT,
    profile_image VARCHAR(255),
    consultation_fee DECIMAL(10,2),
    available_days VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATE,
    appointment_time TIME,
    visit_type ENUM('First Visit','Follow-up'),
    symptoms TEXT,
    medical_history TEXT,
    insurance_provider VARCHAR(100),
    insurance_id VARCHAR(50),
    status ENUM('Pending','Confirmed','Completed','Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE IF NOT EXISTS medical_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_id INT,
    diagnosis TEXT,
    prescription TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    subject VARCHAR(200),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserts
INSERT INTO departments (name, description, icon) VALUES 
('Cardiology', 'Heart and cardiovascular diseases', 'fa-heart'),
('Neurology', 'Disorders of the nervous system', 'fa-brain'),
('Orthopedics', 'Musculoskeletal system', 'fa-bone'),
('Pediatrics', 'Medical care of infants and children', 'fa-child'),
('Dermatology', 'Skin conditions and diseases', 'fa-spa'),
('Ophthalmology', 'Eye and vision care', 'fa-eye'),
('Dentistry', 'Oral health and dental care', 'fa-tooth'),
('Psychiatry', 'Mental health disorders', 'fa-user-md'),
('Gastroenterology', 'Digestive system disorders', 'fa-stomach'),
('Oncology', 'Cancer treatment', 'fa-ribbon'),
('Gynecology', 'Women''s health', 'fa-female'),
('Urology', 'Urinary tract system', 'fa-vial');

INSERT INTO doctors (full_name, email, phone, specialization, department, qualification, experience_years, bio, consultation_fee, available_days) VALUES 
('Dr. Sarah Jenkins', 'sarah@medicare.com', '1234567890', 'Cardiologist', 'Cardiology', 'MD, FACC', 15, 'Expert in heart conditions.', 150.00, 'Mon,Wed,Fri'),
('Dr. Michael Chen', 'michael@medicare.com', '1234567891', 'Neurologist', 'Neurology', 'MD, PhD', 12, 'Specialist in nervous system.', 180.00, 'Tue,Thu'),
('Dr. Emily Williams', 'emily@medicare.com', '1234567892', 'Pediatrician', 'Pediatrics', 'MD, FAAP', 10, 'Experienced in child care.', 120.00, 'Mon,Tue,Wed,Thu,Fri'),
('Dr. James Wilson', 'james@medicare.com', '1234567893', 'Orthopedic Surgeon', 'Orthopedics', 'MD, FAAOS', 20, 'Expert in bone and joint surgery.', 200.00, 'Wed,Fri'),
('Dr. Olivia Davis', 'olivia@medicare.com', '1234567894', 'Dermatologist', 'Dermatology', 'MD, FAAD', 8, 'Skin specialist.', 130.00, 'Mon,Thu'),
('Dr. Robert Taylor', 'robert@medicare.com', '1234567895', 'Ophthalmologist', 'Ophthalmology', 'MD, FAAO', 14, 'Eye care expert.', 140.00, 'Tue,Wed,Fri'),
('Dr. Sophia Martinez', 'sophia@medicare.com', '1234567896', 'Dentist', 'Dentistry', 'DDS', 9, 'Oral health professional.', 100.00, 'Mon,Tue,Thu'),
('Dr. William Anderson', 'william@medicare.com', '1234567897', 'Psychiatrist', 'Psychiatry', 'MD, APA', 16, 'Mental health expert.', 160.00, 'Wed,Thu,Fri');

INSERT INTO patients (full_name, email, phone, password, dob, gender, blood_group, address) VALUES 
('John Doe', 'john@example.com', '5551234567', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1990-05-15', 'Male', 'O+', '123 Main St'),
('Jane Smith', 'jane@example.com', '5559876543', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1985-08-22', 'Female', 'A-', '456 Oak Ave');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, visit_type, symptoms, status) VALUES 
(1, 1, '2023-11-15', '10:00:00', 'First Visit', 'Chest pain', 'Completed'),
(2, 3, '2023-11-18', '14:30:00', 'Follow-up', 'Routine check', 'Completed'),
(1, 4, '2023-12-05', '11:00:00', 'First Visit', 'Knee pain', 'Confirmed'),
(2, 5, '2023-12-10', '09:15:00', 'First Visit', 'Skin rash', 'Pending'),
(1, 1, '2023-12-20', '10:30:00', 'Follow-up', 'Review test results', 'Confirmed');
