CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
  (uuid_generate_v4(), uuid_generate_v4(), '2024-07-28 10:00:00', '2024-07-28 10:00:00', 'OPEN'),
  (uuid_generate_v4(), uuid_generate_v4(), '2024-07-28 11:00:00', '2024-07-28 11:00:00', 'OPEN'),
  (uuid_generate_v4(), uuid_generate_v4(), '2024-07-28 12:00:00', '2024-07-28 12:00:00', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count) 
 SELECT 
 	id AS cart_id,
	uuid_generate_v4() AS product_id,
	floor(random() * 10 + 1)::int AS product_count
 FROM carts;
  
SELECT * FROM carts;
SELECT * FROM cart_items;
DELETE FROM cart_items;
DELETE FROM carts;