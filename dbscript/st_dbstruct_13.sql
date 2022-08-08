ALTER TABLE ONLY class ADD COLUMN class_cgst_per numeric(13,2) default 0;
COMMENT ON COLUMN class.class_cgst_per IS 'CGST Percentage';

ALTER TABLE ONLY class ADD COLUMN class_sgst_per numeric(13,2) default 0;
COMMENT ON COLUMN class.class_sgst_per IS 'SGST Percentage';

ALTER TABLE ONLY class ADD COLUMN class_igst_per numeric(13,2) default 0;
COMMENT ON COLUMN class.class_igst_per IS 'IGST Percentage';

ALTER TABLE ONLY ticket_class ADD COLUMN tc_cgst numeric(13,2) default 0;
COMMENT ON COLUMN ticket_class.tc_cgst IS 'CGST Percentage';

ALTER TABLE ONLY ticket_class ADD COLUMN tc_sgst numeric(13,2) default 0;
COMMENT ON COLUMN ticket_class.tc_sgst IS 'SGST Percentage';

ALTER TABLE ONLY ticket_class ADD COLUMN tc_cgst_rate numeric(13,2) default 0;
COMMENT ON COLUMN ticket_class.tc_cgst_rate IS 'CGST Rate';

ALTER TABLE ONLY ticket_class ADD COLUMN tc_sgst_rate numeric(13,2) default 0;
COMMENT ON COLUMN ticket_class.tc_sgst_rate IS 'SGST Rate';

ALTER TABLE ONLY ticket_class ADD COLUMN tc_gst numeric(13,2) default 0;
COMMENT ON COLUMN ticket_class.tc_gst IS 'GST Rate';