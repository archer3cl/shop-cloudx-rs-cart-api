insert into users (id, name, email, password) values ('da8a3c23-879e-445b-b655-d67bf7b1859a','Alex Vieyra', 'archer3cl', 'password');
insert into carts (user_id, created_at, updated_at, status) values ('eed0044d-f5d0-4095-90dc-1c7393051cbf','da8a3c23-879e-445b-b655-d67bf7b1859a', '4/12/2022', '7/13/2022', 'OPEN');
insert into carts (user_id, created_at, updated_at, status) values ('e55a73e5-d8d3-4f46-80c5-ff6d52f76eb4','da8a3c23-879e-445b-b655-d67bf7b1859a', '4/12/2022', '7/13/2022', 'ORDERED');
insert into cart_items (cart_id, product_id, count, product) values ('e55a73e5-d8d3-4f46-80c5-ff6d52f76eb4', '622d5cf1-a97e-4316-bc04-b0ff4cdc3cf1', 90, '{"description":"Short Product Description1","price":24,"title":"ProductOne"}');
insert into orders ("address", "statusHistory", "created_at", "updated_at", "user_id", "cart_id") values ('{"comment":"D","address":"C","lastName":"A","firstName":"B"}', '[{"comment":"","status":"OPEN","timestamp":1680769083475}]', DEFAULT, DEFAULT, 'da8a3c23-879e-445b-b655-d67bf7b1859a', 'e55a73e5-d8d3-4f46-80c5-ff6d52f76eb4') 