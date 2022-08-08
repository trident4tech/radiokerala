
INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'View Destination','','Master Data','pages/destview','View Destination');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'List Destination','','Master Data','pages/destinationlist','List Destination');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Edit Destination','','Master Data','pages/destedit','Edit Destination');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Delete Destination','','Master Data','pages/destdelete','Delete Destination');

INSERT INTO permissions (name,url,search_category,per_pwa_url,per_menu) VALUES(
'Status Change Destination','','Master Data','pages/deststatus','Status Change Destination');


CREATE TABLE change_history(
  ch_id bigint NOT NULL,
  ch_date date,
  ch_is_imported smallint DEFAULT 1,
  ch_dest_id bigint,
  ch_dest_name text,
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


COMMENT ON TABLE change_history IS 'Table for store change history';
COMMENT ON COLUMN change_history.ch_id IS 'The primary key field of the table';
COMMENT ON COLUMN change_history.ch_dest_id IS 'Destination :dest_id';
COMMENT ON COLUMN change_history.ch_date IS 'Date';
COMMENT ON COLUMN change_history.ch_dest_name IS 'Destination name';
COMMENT ON COLUMN change_history.ch_is_imported IS 'Is imported to FMIS:1=>No, 2=>Yes';
COMMENT ON COLUMN change_history.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN change_history.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN change_history.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN change_history.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN change_history.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN change_history.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN change_history.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN change_history.ip_created IS 'Created ip address';
COMMENT ON COLUMN change_history.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN change_history.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE change_history_ch_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY change_history ALTER COLUMN ch_id SET DEFAULT nextval('change_history_ch_id_seq');
ALTER TABLE ONLY change_history ADD CONSTRAINT change_history_pkey PRIMARY KEY (ch_id);
