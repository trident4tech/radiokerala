ALTER TABLE ONLY ticket_print  ADD COLUMN tp_is_cancelled smallint DEFAULT 1;
COMMENT ON COLUMN ticket_print.tp_is_cancelled IS '1=>no, 2=>Yes';

ALTER TABLE ONLY ticket_print  ADD COLUMN tp_cancelled_by bigint;
COMMENT ON COLUMN ticket_print.tp_cancelled_by IS 'users.usr_id';

ALTER TABLE ONLY ticket_print  ADD COLUMN tp_cancel_time timestamp without time zone  ;
COMMENT ON COLUMN ticket_print.tp_cancel_time IS 'Cancelled time';

ALTER TABLE ONLY ticket_print  ADD COLUMN tp_cancel_reason text;
COMMENT ON COLUMN ticket_print.tp_cancel_reason IS 'Cancelation Reason';

INSERT INTO permissions (name,url,search_category,category,per_pwa_url,per_menu) VALUES ('Cancel Ticket','v1/ticketing/cancel','Ticketing',2,'pages/tickets/cancel','Cancel');

INSERT INTO permissions (name,url,search_category,category,per_pwa_url,per_menu) VALUES ('Unlink Device','user/unlinkdevice','Unlink Device',2,'pages/unlinkdevice','Cancel');

