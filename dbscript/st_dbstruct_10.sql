

CREATE TABLE local_data(
  ld_id bigint NOT NULL,
  ld_usr_id bigint,
  ld_verdata text,
  ld_ticketdata text,
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


COMMENT ON TABLE local_data IS 'Table for store local data';
COMMENT ON COLUMN local_data.ld_id IS 'The primary key field of the table';
COMMENT ON COLUMN local_data.ld_usr_id IS 'User :usr_id';
COMMENT ON COLUMN local_data.ld_verdata IS 'Verification data';
COMMENT ON COLUMN local_data.ld_ticketdata IS 'Ticket data';
COMMENT ON COLUMN local_data.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN local_data.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN local_data.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN local_data.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN local_data.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN local_data.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN local_data.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN local_data.ip_created IS 'Created ip address';
COMMENT ON COLUMN local_data.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN local_data.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE local_data_ld_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY local_data ALTER COLUMN ld_id SET DEFAULT nextval('local_data_ld_id_seq');
ALTER TABLE ONLY local_data ADD CONSTRAINT local_data_pkey PRIMARY KEY (ld_id);

INSERT INTO core_constants (const_name,const_value,const_description) VALUES(
'FMIS_URL','http://accounts.dtpctvm.ticketbuddy.in/','FMIS url');

