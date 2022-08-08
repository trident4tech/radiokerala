ALTER TABLE ONLY ticket_print ADD COLUMN tp_cgst_data text default '';
COMMENT ON COLUMN ticket_print.tp_cgst_data IS 'CGST Data';

ALTER TABLE ONLY ticket_print ADD COLUMN tp_sgst_data text default '';
COMMENT ON COLUMN ticket_print.tp_sgst_data IS 'SGST Data';


