INSERT INTO users
(first_name, last_name, email, password_digest, token)
VALUES
('Yveline', 'Say', 'sayyveline@gmail.com', 'bouboiub', 'nhonoin');

INSERT INTO jobs_data
(user_id, github_job_id, created_at, title, location, type,
  description, how_to_apply, company, company_url, company_logo,
  github_jobs_url)
VALUES
(1, 'github_job_id', 'created_at', 'title', 'location',
  'type', 'description', 'how_to_apply', 'company', 'company_url',
  'company_logo', 'github_jobs_url');
