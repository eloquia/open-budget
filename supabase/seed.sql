-- Parent Categories
insert into categories
  (name)
values
  ('Housing'),
  ('Food'),
  ('Living Expenses'),
  ('Transportation'),
  ('Hobbies & Enertainment'),
  ('Childcare'),
  ('Pets'),
  ('Medical'),
  ('Travel'),
  ('Miscellaneous');

-- Child Categories
insert into categories
  (name, parent_category_id)
values
  ('Rent', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Water', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Gas (for Home)', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Lawncare', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Insurance (Home)', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Internet', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Property Taxes', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Trash', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Cleaning (Home)', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Security (Home)', (SELECT id FROM categories WHERE name = 'Housing')),
  ('Other (Home)', (SELECT id FROM categories WHERE name = 'Housing')),

  ('Groceries', (SELECT id FROM categories WHERE name = 'Food')),
  ('Restaurants', (SELECT id FROM categories WHERE name = 'Food')),
  ('Takeout', (SELECT id FROM categories WHERE name = 'Food')),
  ('Bars', (SELECT id FROM categories WHERE name = 'Food')),
  ('Cafes', (SELECT id FROM categories WHERE name = 'Food')),
  ('Meal Prep Service', (SELECT id FROM categories WHERE name = 'Food')),
  ('Other (Food)', (SELECT id FROM categories WHERE name = 'Food')),

  ('Phone Bill', (SELECT id from categories WHERE name = 'Living Expenses')),
  ('Gas (Vehicle)', (SELECT id from categories WHERE name = 'Living Expenses')),
  ('Personal Care Items', (SELECT id from categories WHERE name = 'Living Expenses')),
  ('Home goods', (SELECT id from categories WHERE name = 'Living Expenses')),
  ('Personal Care Services', (SELECT id from categories WHERE name = 'Living Expenses')),
  ('Other (Living Expenses)', (SELECT id from categories WHERE name = 'Living Expenses')),

  ('Car Payment', (SELECT id from categories WHERE name = 'Transportation')),
  ('Lease Payment (Vehicle)', (SELECT id from categories WHERE name = 'Transportation')),
  ('Vehicle Insurance', (SELECT id from categories WHERE name = 'Transportation')),
  ('Public Transport', (SELECT id from categories WHERE name = 'Transportation')),
  ('Rideshare Service', (SELECT id from categories WHERE name = 'Transportation')),
  ('Other (Transportation)', (SELECT id from categories WHERE name = 'Transportation')),
  
  ('Gym', (SELECT id from categories WHERE name = 'Hobbies & Entertainment')),
  ('Streaming & Subscriptions', (SELECT id from categories WHERE name = 'Hobbies & Entertainment')),
  ('Books', (SELECT id from categories WHERE name = 'Hobbies & Entertainment')),
  ('Movie Theaters', (SELECT id from categories WHERE name = 'Hobbies & Entertainment')),
  ('Lessons/Education', (SELECT id from categories WHERE name = 'Hobbies & Entertainment')),
  ('Other (Hobbies & Entertainment)', (SELECT id from categories WHERE name = 'Hobbies & Entertainment')),
  
  ('Daycare', (SELECT id FROM categories WHERE name = 'Childcare')),
  ('Child Support', (SELECT id FROM categories WHERE name = 'Childcare')),
  ('Education (Childcare)', (SELECT id FROM categories WHERE name = 'Childcare')),
  ('Extracurriculars', (SELECT id FROM categories WHERE name = 'Childcare')),
  ('Nanny', (SELECT id FROM categories WHERE name = 'Childcare')),
  ('Other (Childcare)', (SELECT id FROM categories WHERE name = 'Childcare')),
  
  ('Boarding', (SELECT id FROM categories WHERE name = 'Pets')),
  ('Food & Treat', (SELECT id FROM categories WHERE name = 'Pets')),
  ('Grooming', (SELECT id FROM categories WHERE name = 'Pets')),
  ('Medication & Vet', (SELECT id FROM categories WHERE name = 'Pets')),
  ('Toys & Other Misc Goods', (SELECT id FROM categories WHERE name = 'Pets')),
  ('Insurance (Pets)', (SELECT id FROM categories WHERE name = 'Pets')),
  ('Other (Pets)', (SELECT id FROM categories WHERE name = 'Pets')),
  
  ('Therapy', (SELECT id FROM categories WHERE name = 'Medical')),
  ('Doctor Visits', (SELECT id FROM categories WHERE name = 'Medical')),
  ('Medication', (SELECT id FROM categories WHERE name = 'Medical')),
  ('Premiums (Outside of paycheck deductions)', (SELECT id FROM categories WHERE name = 'Medical')),
  ('Other (Medical)', (SELECT id FROM categories WHERE name = 'Medical')),
  
  ('Hotel & Lodging', (SELECT id FROM categories WHERE name = 'Travel')),
  ('Airfare', (SELECT id FROM categories WHERE name = 'Travel')),
  ('Transportation (Travel)', (SELECT id FROM categories WHERE name = 'Travel')),
  ('Parking (Travel)', (SELECT id FROM categories WHERE name = 'Travel')),
  ('Other (Travel)', (SELECT id FROM categories WHERE name = 'Travel')),

  ('Misc', (SELECT id FROM categories WHERE name = 'Miscellaneous')),
  ('Gifts', (SELECT id FROM categories WHERE name = 'Miscellaneous')),
  ('Donations', (SELECT id FROM categories WHERE name = 'Miscellaneous'));