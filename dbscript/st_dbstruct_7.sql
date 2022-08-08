ALTER TABLE ONLY users ADD COLUMN usr_is_ticket_staff smallint default 1;
COMMENT ON COLUMN users.usr_is_ticket_staff IS 'Is ticketing staff: 1=>No, 2=>Yes';

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Invalid Tickets','','Ticketing','pages/invalid','Invalid Tickets');
