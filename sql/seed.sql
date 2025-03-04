

INSERT INTO users (username, password_hash)
VALUES ('testuser', 'hashed_password_here');

INSERT INTO sessions (user_id, session_token, expires_at)
VALUES (1, 'random_token_string', DATE_ADD(NOW(), INTERVAL 1 DAY));