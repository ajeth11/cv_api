const CREATE_TALE = `CREATE TABLE cv_details (
  cv_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,                 
  email VARCHAR(50) NOT NULL,
  phone_no VARCHAR(10) NOT NULL,
  summary TEXT NOT NULL,
  experience_json JSON,
  education_json JSON,  
  skill JSON NOT NULL,
  created_by INT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (cv_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id)
  );`