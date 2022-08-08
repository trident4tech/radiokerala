
CREATE TABLE class_order(
  co_id bigint NOT NULL,
  co_usr_id bigint,
  co_order bigint,
  co_class_id bigint, 
  created_at timestamp with time zone DEFAULT now(), 
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


COMMENT ON TABLE class_order IS 'Table for store class order data';
COMMENT ON COLUMN class_order.co_id IS 'The primary key field of the table';
COMMENT ON COLUMN class_order.co_usr_id IS 'User :usr_id';
COMMENT ON COLUMN class_order.co_order IS 'Order number';
COMMENT ON COLUMN class_order.co_class_id IS 'class.class_id';
COMMENT ON COLUMN class_order.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN class_order.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN class_order.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN class_order.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN class_order.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN class_order.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN class_order.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN class_order.ip_created IS 'Created ip address';
COMMENT ON COLUMN class_order.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN class_order.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE class_order_co_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY class_order ALTER COLUMN co_id SET DEFAULT nextval('class_order_co_id_seq');
ALTER TABLE ONLY class_order ADD CONSTRAINT class_order_pkey PRIMARY KEY (co_id);

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Class Ordering','','Ticketing','pages/classorder','Class Ordering');
