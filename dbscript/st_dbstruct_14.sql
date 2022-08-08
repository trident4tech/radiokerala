INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PAYMODE','2','Payment mode 2=>Upto UPI, 3=>Upto POS');

ALTER TABLE ONLY destination ADD COLUMN dest_paymode smallint default 2;
COMMENT ON COLUMN destination.dest_paymode IS 'Payment mode: 2=>UPI, 3=>POS';

