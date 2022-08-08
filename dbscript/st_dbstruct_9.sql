
CREATE TABLE token_history(
  th_id bigint NOT NULL,
  th_usr_id bigint,
  th_order bigint,
  th_class_id bigint, 
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


COMMENT ON TABLE token_history IS 'Table for store class order data';
COMMENT ON COLUMN token_history.th_id IS 'The primary key field of the table';
COMMENT ON COLUMN token_history.th_usr_id IS 'User :usr_id';
COMMENT ON COLUMN token_history.th_order IS 'Order number';
COMMENT ON COLUMN token_history.th_class_id IS 'class.class_id';
COMMENT ON COLUMN token_history.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN token_history.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN token_history.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN token_history.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN token_history.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN token_history.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN token_history.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN token_history.ip_created IS 'Created ip address';
COMMENT ON COLUMN token_history.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN token_history.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE token_history_th_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY token_history ALTER COLUMN th_id SET DEFAULT nextval('token_history_th_id_seq');
ALTER TABLE ONLY token_history ADD CONSTRAINT token_history_pkey PRIMARY KEY (th_id);
