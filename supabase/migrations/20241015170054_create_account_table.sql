CREATE TYPE account_type AS ENUM (
  'checking',
  'savings',
  'credit_card',
  'investment',
  'loan',
  'cash',
  'cryptocurrency',
  'retirement',
  'other'
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  account_type account_type NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255),
  routing_number VARCHAR(255),
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
