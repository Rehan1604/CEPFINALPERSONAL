CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,

    token_number VARCHAR(20) UNIQUE NOT NULL,

    patient_id INTEGER NOT NULL,
    hospital_id INTEGER NOT NULL,

    priority VARCHAR(10) CHECK (priority IN ('RED', 'YELLOW', 'GREEN')) NOT NULL,

    status VARCHAR(20) CHECK (status IN ('WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')) DEFAULT 'WAITING',

    estimated_wait_time INTEGER DEFAULT 0,

    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
);

CREATE TABLE triage_submissions (

submission_id SERIAL PRIMARY KEY,

patient_name VARCHAR(120),
age INT,
gender VARCHAR(10),

chest_pain BOOLEAN,
breathing_difficulty BOOLEAN,
heavy_bleeding BOOLEAN,
unconscious BOOLEAN,
severe_burns BOOLEAN,
head_injury BOOLEAN,
accident BOOLEAN,
high_fever BOOLEAN,
vomiting BOOLEAN,
seizure BOOLEAN,

pain_level INT,
symptom_duration_hours INT,

priority_score INT,
triage_category VARCHAR(10),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(100) NOT NULL,
  age INT CHECK (age >= 0 AND age <= 120),
  gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),

  phone VARCHAR(15) UNIQUE NOT NULL,

  blood_group VARCHAR(5) CHECK (
    blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
  ),

  allergies TEXT[] DEFAULT '{}',

  emergency_contact VARCHAR(15),

  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),

  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    address TEXT,

    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),

    -- Capacity
    total_rooms INT NOT NULL,
    emergency_rooms INT NOT NULL,
    icu_beds INT NOT NULL,
    ventilators INT NOT NULL,

    -- Current Load
    occupied_rooms INT DEFAULT 0,
    available_rooms INT DEFAULT 0,

    occupied_icu INT DEFAULT 0,
    available_icu INT DEFAULT 0,

    staff_available INT DEFAULT 0,

    -- Status
    status VARCHAR(20)
    CHECK (status IN ('AVAILABLE', 'BUSY', 'FULL'))
    DEFAULT 'AVAILABLE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);