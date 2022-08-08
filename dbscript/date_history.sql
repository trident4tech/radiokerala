
CREATE TABLE date_history(
  dh_id bigint NOT NULL,
  dh_tp_id bigint,
  dh_changed_by bigint,
  dh_changed_at timestamp without time zone DEFAULT now(),  
  dh_current_date date,
  dh_new_date date,
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


COMMENT ON TABLE date_history IS 'Table for store change date history';
COMMENT ON COLUMN date_history.dh_id IS 'The primary key field of the table';
COMMENT ON COLUMN date_history.dh_tp_id IS 'ticket_print.tp_id';
COMMENT ON COLUMN date_history.dh_changed_by IS 'Changed user.usr_id';
COMMENT ON COLUMN date_history.dh_current_date IS 'Old date';
COMMENT ON COLUMN date_history.dh_new_date IS 'New date';
COMMENT ON COLUMN date_history.dh_changed_at IS 'Changed time';
COMMENT ON COLUMN date_history.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN date_history.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN date_history.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN date_history.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN date_history.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN date_history.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN date_history.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN date_history.ip_created IS 'Created ip address';
COMMENT ON COLUMN date_history.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN date_history.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE date_history_dh_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY date_history ALTER COLUMN dh_id SET DEFAULT nextval('date_history_dh_id_seq');
ALTER TABLE ONLY date_history ADD CONSTRAINT date_history_pkey PRIMARY KEY (dh_id);

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Change Date','','Ticketing','pages/changedate','Change Date');
