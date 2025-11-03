select * From Employees;
select * From Comments;
select * From Projects;
select * From TaskItems;
USE ProjectManagementDB;
GO

-- ==========================
-- 1️⃣ Employees
-- ==========================
INSERT INTO Employees (Name, Email, Role)
VALUES
('Alice Johnson', 'alice@company.com', 'Manager'),
('Bob Smith', 'bob@company.com', 'Developer'),
('Carol White', 'carol@company.com', 'Tester'),
('David Brown', 'david@company.com', 'Developer'),
('Evelyn Green', 'evelyn@company.com', 'Designer');

-- ==========================
-- 2️⃣ Projects
-- ==========================
INSERT INTO Projects (Name, Description, StartDate, EndDate, ManagerId)
VALUES
('Project Falcon', 'AI-powered project management tool', '2025-01-10', '2025-12-20', 1),
('Project Hydra', 'Cloud migration and automation', '2025-03-01', '2025-11-15', 1);

-- ==========================
-- 3️⃣ TaskItems
-- ==========================
INSERT INTO TaskItems 
(Title, Description, Status, Priority, ProjectId, AssignedToId, DueDate, CreatedAt, UpdatedAt)
VALUES
('Setup project structure', 'Initialize backend and frontend structure', 'In Progress', 'High', 1, 2, '2025-02-10', '2025-01-20', '2025-01-25'),
('Design database schema', 'Define all tables and relationships', 'Completed', 'Medium', 1, 1004, '2025-03-05', '2025-01-28', '2025-03-06'),
('API integration', 'Connect backend to frontend', 'Pending', 'High', 1, 1002, '2025-04-15', '2025-02-10', '2025-02-12'),
('Cloud setup', 'Deploy application to Azure', 'In Progress', 'High', 2, 1003, '2025-06-01', '2025-03-01', '2025-03-10'),
('Testing & QA', 'Perform end-to-end testing', 'Pending', 'Low', 2, 1006, '2025-08-10', '2025-04-05', '2025-04-10');
GO
-- ==========================
-- 4️⃣ Comments
-- ==========================
INSERT INTO Comments (Text, CreatedAt, EmployeeId, TaskId)
VALUES
('Database design looks solid.', '2025-03-06', 2, 6),
('I’ll handle the API endpoints.', '2025-03-15', 1004, 7),
('Testing scheduled for next sprint.', '2025-04-05', 1002, 8),
('Deployment pipeline needs review.', '2025-04-10', 1003, 9),
('Frontend build successful.', '2025-05-01', 1006, 10);
GO

INSERT INTO Projects (Name, Description, StartDate, EndDate, ManagerId)
VALUES
('Project Alpha', 'AI-powered customer analytics platform', '2025-01-05', '2025-11-15', 1),
('Project Beta', 'Blockchain-based payment gateway integration', '2025-02-10', '2025-12-20', 1),
('Project Gamma', 'Cloud-native CRM enhancement', '2025-03-01', '2025-10-30', 1),
('Project Delta', 'IoT monitoring for smart factories', '2025-01-22', '2025-09-25', 1),
('Project Epsilon', 'Edge computing optimization system', '2025-02-15', '2025-11-30', 1),
('Project Zeta', 'Web-based logistics management tool', '2025-03-10', '2025-12-10', 1),
('Project Eta', 'AI chat assistant for support teams', '2025-01-17', '2025-08-28', 1),
('Project Theta', 'Cloud cost optimization dashboard', '2025-02-22', '2025-10-12', 1),
('Project Iota', 'Inventory management automation system', '2025-03-05', '2025-11-18', 1),
('Project Kappa', 'Cybersecurity risk assessment platform', '2025-04-02', '2025-12-25', 1),
('Project Lambda', 'Remote workforce collaboration suite', '2025-01-11', '2025-09-09', 1),
('Project Mu', 'SaaS billing and subscription manager', '2025-02-07', '2025-12-01', 1),
('Project Nu', 'Predictive maintenance for manufacturing', '2025-03-12', '2025-11-05', 1),
('Project Xi', 'E-commerce analytics and insights', '2025-01-23', '2025-09-15', 1),
('Project Omicron', 'AI-driven health monitoring system', '2025-02-18', '2025-10-10', 1),
('Project Pi', 'Smart energy consumption tracker', '2025-03-06', '2025-12-22', 1),
('Project Rho', 'Video conferencing enhancement API', '2025-01-16', '2025-09-28', 1),
('Project Sigma', 'Social media campaign optimizer', '2025-02-05', '2025-10-30', 1),
('Project Tau', 'Financial fraud detection AI', '2025-03-02', '2025-12-18', 1),
('Project Upsilon', 'Cross-platform mobile framework upgrade', '2025-01-19', '2025-09-17', 1),
('Project Phi', 'AI model training pipeline automation', '2025-02-23', '2025-11-11', 1),
('Project Chi', 'Customer feedback sentiment analyzer', '2025-03-13', '2025-12-05', 1),
('Project Psi', 'Remote IoT device firmware updater', '2025-01-27', '2025-09-30', 1),
('Project Omega', 'AI-driven document summarizer', '2025-02-08', '2025-10-20', 1),
('Project Nova', 'Next-gen AR/VR collaboration hub', '2025-03-09', '2025-11-29', 1),
('Project Orion', 'AI for HR talent prediction', '2025-01-25', '2025-10-08', 1),
('Project Pegasus', 'Secure data sharing infrastructure', '2025-02-03', '2025-12-14', 1),
('Project Titan', 'Scalable data lake modernization', '2025-03-11', '2025-11-02', 1),
('Project Apollo', 'Automated deployment orchestration', '2025-01-13', '2025-09-27', 1),
('Project Vega', 'Cloud-native API gateway', '2025-02-21', '2025-10-18', 1),
('Project Phoenix', 'Disaster recovery automation system', '2025-03-08', '2025-12-27', 1),
('Project Ares', 'AI-powered bug detection tool', '2025-01-09', '2025-09-20', 1),
('Project Atlas', 'Employee productivity tracker', '2025-02-12', '2025-11-12', 1),
('Project Helios', 'Renewable energy management portal', '2025-03-14', '2025-12-19', 1),
('Project Artemis', 'Digital workspace analytics system', '2025-01-24', '2025-10-09', 1),
('Project Hera', 'AI chatbot for e-commerce', '2025-02-16', '2025-11-28', 1),
('Project Zeus', 'Smart contract auditing system', '2025-03-03', '2025-12-08', 1),
('Project Poseidon', 'Marine data collection platform', '2025-01-21', '2025-09-22', 1),
('Project Hades', 'Cyber threat intelligence dashboard', '2025-02-28', '2025-10-22', 1),
('Project Kronos', 'Workforce scheduling automation', '2025-03-04', '2025-11-26', 1),
('Project Hyperion', 'Big data pipeline optimization', '2025-01-18', '2025-09-26', 1),
('Project Nemesis', 'AI security log analyzer', '2025-02-25', '2025-12-11', 1),
('Project Eros', 'User engagement tracking engine', '2025-03-07', '2025-12-21', 1),
('Project Gaia', 'Environmental monitoring AI', '2025-01-28', '2025-10-02', 1),
('Project Iris', 'AI image recognition module', '2025-02-13', '2025-11-07', 1),
('Project Aurora', 'Real-time traffic monitoring system', '2025-03-01', '2025-12-15', 1),
('Project Borealis', 'Cloud cost forecasting AI', '2025-01-26', '2025-09-29', 1),
('Project Draco', 'Secure API authentication service', '2025-02-09', '2025-10-28', 1),
('Project OrionX', 'AI-based hiring recommendation engine', '2025-03-15', '2025-12-30', 1),
('Project Vulcan', 'Serverless computing optimization', '2025-01-10', '2025-09-24', 1),
('Project Centauri', 'AI-driven supply chain tracker', '2025-02-11', '2025-11-01', 1),
('Project Zenith', 'Autonomous drone control software', '2025-03-10', '2025-12-17', 1),
('Project Lynx', 'Data-driven marketing automation', '2025-01-22', '2025-10-06', 1),
('Project Griffin', 'Real-time IoT analytics dashboard', '2025-02-17', '2025-12-03', 1),
('Project Chimera', 'Intelligent document parser', '2025-03-05', '2025-11-24', 1),
('Project Solaris', 'Energy-efficient cloud hosting', '2025-01-14', '2025-09-21', 1),
('Project AtlasX', 'Advanced data visualization portal', '2025-02-19', '2025-10-19', 1),
('Project Pandora', 'AI-driven threat detection system', '2025-03-02', '2025-12-16', 1),
('Project Quantum', 'Quantum computing simulation engine', '2025-01-30', '2025-09-18', 1),
('Project Halo', 'AI-powered digital assistant', '2025-02-20', '2025-12-07', 1),
('Project Matrix', 'Next-gen data storage architecture', '2025-03-08', '2025-12-28', 1),
('Project Astra', 'Space telemetry analysis AI', '2025-01-12', '2025-09-23', 1),
('Project SolarisX', 'AI optimization for EV charging', '2025-02-14', '2025-11-14', 1),
('Project Arcadia', 'VR training simulation platform', '2025-03-06', '2025-12-09', 1),
('Project OrionPrime', 'Smart device automation network', '2025-01-15', '2025-09-25', 1),
('Project TitanX', 'Big data stream processing engine', '2025-02-24', '2025-10-29', 1),
('Project VulcanAI', 'AI-enhanced cybersecurity assistant', '2025-03-04', '2025-12-23', 1),
('Project Aegis', 'Cloud-based backup automation', '2025-01-20', '2025-09-28', 1),
('Project Chronos', 'Workflow automation platform', '2025-02-06', '2025-11-22', 1),
('Project Nebula', 'Cloud security visualization tool', '2025-03-11', '2025-12-26', 1),
('Project OrionCloud', 'Serverless orchestration engine', '2025-01-11', '2025-09-19', 1),
('Project Helix', 'AI code optimization assistant', '2025-02-26', '2025-10-21', 1),
('Project Apex', 'E-learning personalization engine', '2025-03-01', '2025-11-17', 1),
('Project Echo', 'Voice command recognition system', '2025-01-17', '2025-09-30', 1),
('Project NovaX', 'Automated project analytics', '2025-02-22', '2025-10-24', 1),
('Project Prism', 'AI image processing suite', '2025-03-12', '2025-12-13', 1),
('Project Core', 'Enterprise cloud migration tool', '2025-01-19', '2025-09-27', 1),
('Project DeltaX', 'Automated testing AI system', '2025-02-27', '2025-12-04', 1),
('Project Argon', 'AI-based product recommendation system', '2025-03-14', '2025-12-31', 1),
('Project Pluto', 'Data anonymization framework', '2025-01-16', '2025-09-26', 1),
('Project Orbit', 'Space communication optimizer', '2025-02-18', '2025-10-25', 1),
('Project Nimbus', 'AI cloud orchestration tool', '2025-03-07', '2025-11-16', 1),
('Project VegaX', 'Smart warehouse automation', '2025-01-28', '2025-09-22', 1),
('Project QuantumX', 'AI simulation and analytics hub', '2025-02-08', '2025-10-31', 1),
('Project Cobalt', 'Next-gen cybersecurity engine', '2025-03-03', '2025-11-27', 1),
('Project AtlasPro', 'Global logistics optimization system', '2025-01-25', '2025-09-29', 1),
('Project NebulaX', 'AI risk management platform', '2025-02-10', '2025-12-06', 1),
('Project Eclipse', 'Cloud infrastructure monitoring AI', '2025-03-13', '2025-12-20', 1),
('Project NimbusX', 'Hybrid cloud control center', '2025-01-13', '2025-09-28', 1),
('Project OrionNext', 'AI-powered business forecasting tool', '2025-02-28', '2025-11-25', 1),
('Project Horizon', 'AI predictive analytics engine', '2025-03-10', '2025-12-29', 1),
('Project TitanAI', 'Machine learning pipeline manager', '2025-01-22', '2025-09-30', 1),
('Project AlphaX', 'AI-powered collaboration suite', '2025-02-19', '2025-12-19', 1),
('Project SigmaX', 'AI-based data analytics framework', '2025-03-09', '2025-12-25', 1),
('Project NovaPrime', 'Smart city monitoring dashboard', '2025-01-15', '2025-09-21', 1),
('Project HeliosX', 'Solar energy optimization AI', '2025-02-14', '2025-11-23', 1),
('Project Aether', 'Decentralized cloud platform', '2025-03-05', '2025-12-24', 1),
('Project Genesis', 'AI-driven customer insights system', '2025-01-12', '2025-09-20', 1),
('Project Catalyst', 'Automation workflow designer', '2025-02-21', '2025-10-26', 1),
('Project Infinity', 'AI-enhanced cloud resource manager', '2025-03-02', '2025-12-10', 1);
