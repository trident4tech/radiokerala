ALTER TABLE ONLY users ADD COLUMN usr_token text;
COMMENT ON COLUMN users.usr_token IS 'Token ';

ALTER TABLE ONLY class ADD COLUMN class_fmis_id bigint;
COMMENT ON COLUMN class.class_fmis_id IS 'FMIS ledger id ';

/**Staging Paytm*/
INSERT INTO core_constants (const_name,const_value) VALUES ('PAYTM_MODE','STAGE');
INSERT INTO core_constants (const_name,const_value) VALUES ('PAYTM_URL','https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=');

/**Production*/
INSERT INTO core_constants (const_name,const_value) VALUES ('PAYTM_MODE','PROD');
INSERT INTO core_constants (const_name,const_value) VALUES ('PAYTM_URL','https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=');
INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'New Ticket (Mobile)','','Ticketing','pages/mob','New Ticket (Mob)');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'MIS_ZOHO','118668000021177400','Mis Zoho');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Day Report OB/CB','','Report','pages/dayreportob','Day Report OB/CB');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Daily Income Ledger','','Report','pages/dailyincome','Daily Income Ledger');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'DAILY_INCOME','118668000024223358','Daily Income Ledger Zoho');
