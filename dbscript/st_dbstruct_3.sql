INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Dynamic Settings','v1/constant/list','Ticketing','/pages/list-constnts','Dynamic Settings');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Create/Edit Constant','v1/constant/create','Ticketing','v1/constant/create','Create/Edit Constant');


INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Schedule/Log Constants','v1/constant/viewscheduled','Ticketing','/pages/viewscheduled','Schedule/Log Constants');

        

DROP TABLE PAYMENT;

CREATE TABLE payment(
  payment_id bigint NOT NULL,
  payment_ticket_id bigint,
  payment_amount numeric(13,2),
  payment_order_status text,
  payment_transaction_date date,
  payment_hash_value text,
  payment_trans_status smallint DEFAULT 1 not null,
  payment_type smallint DEFAULT 1,
  payment_response text,
  created_at timestamp with time zone,
  modified_at timestamp with time zone,
  deleted_at timestamp with time zone,
  deleted smallint DEFAULT 0 NOT NULL,
  u_createdby bigint,   
  u_modifiedby bigint,
  u_deletedby bigint,
  ip_created text,   
  ip_modified text,
  ip_deleted text
);


COMMENT ON TABLE payment IS 'Table payment';
COMMENT ON COLUMN payment.payment_id IS 'The primary key field of the table';
COMMENT ON COLUMN payment.payment_ticket_id IS 'tickets.ticket_id';
COMMENT ON COLUMN payment.payment_amount IS 'Amount';
COMMENT ON COLUMN payment.payment_order_status IS 'Order details';
COMMENT ON COLUMN payment.payment_transaction_date IS 'Transaction Date';
COMMENT ON COLUMN payment.payment_hash_value IS 'Payment Hash Value';
COMMENT ON COLUMN payment.payment_trans_status IS 'Transaction Status: 1=>Attempt not completed, 2=>Success, 3=>Failed';
COMMENT ON COLUMN payment.payment_type IS 'Payment type: 1=>Paytm';
COMMENT ON COLUMN payment.payment_response IS 'Payment Response';
COMMENT ON COLUMN payment.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN payment.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN payment.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN payment.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN payment.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN payment.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN payment.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN payment.ip_created IS 'Created ip address';
COMMENT ON COLUMN payment.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN payment.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE payment_payment_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY payment ALTER COLUMN payment_id SET DEFAULT nextval('payment_payment_id_seq');
ALTER TABLE ONLY payment ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);



CREATE TABLE permission_user(
  pu_id bigint NOT NULL,
  pu_permission_id bigint,
  pu_usr_id bigint,
  pu_status smallint default 1 not null,  
  created_at timestamp with time zone,
  modified_at timestamp with time zone,
  deleted_at timestamp with time zone,
  deleted smallint DEFAULT 0 NOT NULL,
  u_createdby bigint,   
  u_modifiedby bigint,
  u_deletedby bigint,
  ip_created text,   
  ip_modified text,
  ip_deleted text
);


COMMENT ON TABLE permission_user IS 'Table permission user';
COMMENT ON COLUMN permission_user.pu_id IS 'The primary key field of the table';
COMMENT ON COLUMN permission_user.pu_permission_id IS 'permissions.id';
COMMENT ON COLUMN permission_user.pu_usr_id IS 'users.usr_id';
COMMENT ON COLUMN permission_user.pu_status IS 'Status: 1=>No, 2=>Yes';
COMMENT ON COLUMN permission_user.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN permission_user.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN permission_user.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN permission_user.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN permission_user.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN permission_user.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN permission_user.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN permission_user.ip_created IS 'Created ip address';
COMMENT ON COLUMN permission_user.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN permission_user.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE permission_user_pu_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY permission_user ALTER COLUMN pu_id SET DEFAULT nextval('permission_user_pu_id_seq');
ALTER TABLE ONLY permission_user ADD CONSTRAINT permission_user_pkey PRIMARY KEY (pu_id);



INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Collection Deposit','','Accounts','pages/accounts/collection','Collection Deposit');


INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Account Entry','','Accounts','pages/accounts/entry','Account Entry');


INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'ACCOUNTS_URL','http://accounts.dtpctvm.ticketbuddy.in/sso/index','Accounting URL');

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'ENABLE_PAYMENT','2','Is Enable Payment');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'ACL User','','Administration','acl-user','User ACL');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'View ticket class','','Master Data','pages/viewclass','View ticket class');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Edit profile','','Administration','edit-profile','Edit profile');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'View User','','Administration','viewuser','View User');



ALTER TABLE users ADD COLUMN usr_login_seq_no bigint ;
COMMENT ON COLUMN users.usr_login_seq_no IS 'login device sequence no';


ALTER TABLE users ADD COLUMN usr_is_logged_in smallint DEFAULT 1 ;
COMMENT ON COLUMN users.usr_is_logged_in IS '1 => not logged in 2 => logged in';