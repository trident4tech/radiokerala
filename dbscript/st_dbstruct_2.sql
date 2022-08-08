ALTER TABLE ONLY destination ADD COLUMN dest_terms text;
COMMENT ON COLUMN destination.dest_terms IS 'Destination terms';

ALTER TABLE ONLY destination ADD COLUMN dest_display_terms_ticket smallint DEFAULT 1 NOT NULL;
COMMENT ON COLUMN destination.dest_display_terms_ticket IS 'Destination terms display in ticket: 1=>No, 2=>Yes';

ALTER TABLE ONLY destination ADD COLUMN dest_allow_scan_verify smallint DEFAULT 1 NOT NULL;
COMMENT ON COLUMN destination.dest_allow_scan_verify IS 'Allow verify on scan: 1=>No, 2=>Yes';


INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Daily Financial Report','v1/zoho/summary','Reports','pages/financial','Daily Financial Report');



DROP TRIGGER IF EXISTS counter_updation ON counter_history;
DROP FUNCTION IF EXISTS counter_updation() ;
CREATE OR REPLACE FUNCTION counter_updation() RETURNS TRIGGER AS
$BODY$
BEGIN
        UPDATE counter_history SET ch_is_latest=1 WHERE ch_counter_id = NEW.ch_counter_id AND ch_id!=NEW.ch_id ;
    RETURN NEW;
END;
$BODY$
language plpgsql;
CREATE TRIGGER counter_updation AFTER INSERT  ON counter_history
FOR EACH ROW EXECUTE PROCEDURE counter_updation();
UPDATE counter_history SET ch_is_latest=1;

ALTER TABLE ONLY ticket_print ADD COLUMN tp_ch_id bigint;
COMMENT ON COLUMN ticket_print.tp_ch_id IS 'Counter history.ch_id';


DROP TRIGGER IF EXISTS ticket_updation ON ticket_print;
DROP FUNCTION IF EXISTS ticket_updation() ;
CREATE OR REPLACE FUNCTION ticket_updation() RETURNS TRIGGER AS
$BODY$
BEGIN
    UPDATE ticket_print SET tp_ch_id=(SELECT ch_id FROM counter_history WHERE ch_is_latest=2 AND ch_counter_id = NEW.tp_counter_id AND ch_usr_id=NEW.tp_usr_id) WHERE tp_id=NEW.tp_id;
    RETURN NEW;
END;
$BODY$
language plpgsql;
CREATE TRIGGER ticket_updation AFTER INSERT ON ticket_print
FOR EACH ROW EXECUTE PROCEDURE ticket_updation();


INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'COUNTER_ROLE','5','Counter staff roleid');


ALTER TABLE ONLY users ADD COLUMN usr_is_rec_mandorty smallint default 1;
COMMENT ON COLUMN users.usr_is_rec_mandorty IS 'Received amount is mandatory: 1=>No, 2=>Yes';

ALTER TABLE ONLY ticket_print ADD COLUMN tp_classdata text ;
COMMENT ON COLUMN ticket_print.tp_classdata IS 'Class data';

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'COUNTER_UGRP','18','Counter staff Usergroup Id');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Print Ticket','v1/tickets/print','Ticketing','pages/tickets/print','Print Ticket');


INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'COPYRIGHT','© Ticketbuddy 2022. All Rights Reserved.','copyright');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'TERMS_AND_COND','By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app.  ','Terms & Conditions');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PRIVACY_POLICY',' You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.','Privacy policy');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'REFUND_POLICY','All refunds related to cancelled bookings will be credited to the bank account of the customer within 15 working days.','Refund Policy');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'ENABLE_TERMS','1','Enable Terms & Conditions');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'ENABLE_REFUND_POLICY','1','Enable Refund Policy');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'ENABLE_PRIVACY_POLICY','1','Enable Privacy Policy');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'CONTACT','<p><img src="http://mykalamassery.webapiservices.in/skins/default1/images/logo-black.png" alt="Kalamassery Municipality" width="140" height="143"></p>
        <p><strong>Kalamassery Municipality</strong><br>
        Ernakulam, Kerala, India, Pin:695033<br>Email: itkalamassery@gmail.com</p>
        <p><a href="http://www.kalamasserymunicipality.lsgkerala.gov.in/" target="_blank">kalamasserymunicipality.lsgkerala.gov.in</a></p>
        <p>Phone: 9633349800</p>','Contact');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'MONTH_ZOHO','118668000022747416','Month report zoho');
 
 INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'DAILY_ZOHO','118668000022747413','Daily report zoho');

 INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'SALE_ZOHO','118668000022747412','Sales report zoho');





/**Staging*/
INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PAYTM_MID','Cochin79132462319127','MID For Paytm ( Staging ) ');
INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PAYTM_MURCHANT_KEY','D%#NTjhk0PVsoo91','Merchant Key ( Staging ) ');
INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'WEB_SITE','APPSTAGING','Web site ');




/**Live*/
INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PAYTM_MID','Cochin36966952358821','MID For Paytm ( Live ) ');
INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PAYTM_MURCHANT_KEY','Yp2png8LUluj%GKJ','Merchant Key ( Live ) ');
INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'WAP','APPSTAGING','Web site ');

 INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'PRINT_FOLIO','2','Print folio 1=>No, 2=>Yes');


