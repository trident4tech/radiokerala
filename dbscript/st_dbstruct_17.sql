ALTER TABLE ONLY destination ADD COLUMN dest_gstin text default '';
COMMENT ON COLUMN destination.dest_gstin IS 'GSTIN ';
CREATE TABLE danger_alert(
  da_id bigint NOT NULL,
  da_dest_id bigint,
  da_lat text,
  da_lng text,
  da_description text,
  created_at timestamp with time zone DEFAULT now(), 
  modified_at timestamp with time zone,
  deleted_at timestamp with time zone,
  deleted smallint DEFAULT 0 NOT NULL,

CREATE TABLE weather_alert(
  wa_id bigint NOT NULL,
  wa_date date,
  wa_description text,
  wa_is_general smallint DEFAULT 1,
  wa_file_id bigint,
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

COMMENT ON TABLE danger_alert IS 'for store details of destination danger alert';
COMMENT ON COLUMN danger_alert.da_dest_id IS 'destination.dest_id';
COMMENT ON COLUMN danger_alert.da_lat IS 'latitude';
COMMENT ON COLUMN danger_alert.da_lng IS 'longtitude';
COMMENT ON COLUMN danger_alert.da_description IS 'description';
CREATE SEQUENCE danger_alert_da_id_seq
);


COMMENT ON TABLE weather_alert IS 'Table for store change history';
COMMENT ON COLUMN weather_alert.wa_id IS 'The primary key field of the table';
COMMENT ON COLUMN weather_alert.wa_file_id IS 'core_files :file_id';
COMMENT ON COLUMN weather_alert.wa_date IS 'Date';
COMMENT ON COLUMN weather_alert.wa_description IS 'Description';
COMMENT ON COLUMN weather_alert.wa_is_general IS 'Is General :1=>No, 2=>Yes';
COMMENT ON COLUMN weather_alert.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN weather_alert.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN weather_alert.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN weather_alert.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN weather_alert.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN weather_alert.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN weather_alert.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN weather_alert.ip_created IS 'Created ip address';
COMMENT ON COLUMN weather_alert.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN weather_alert.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE weather_alert_wa_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
ALTER TABLE ONLY danger_alert ALTER COLUMN da_id SET DEFAULT nextval('danger_alert_da_id_seq');
ALTER TABLE ONLY danger_alert ADD CONSTRAINT danger_alert_pkey PRIMARY KEY (da_id);



CREATE TABLE danger_alert_alerts(
  daa_id bigint NOT NULL,
  daa_da_id bigint,
  daa_alert_id bigint,
  created_at timestamp with time zone DEFAULT now(), 
  modified_at timestamp with time zone,
  deleted_at timestamp with time zone,
  deleted smallint DEFAULT 0 NOT NULL,

ALTER TABLE ONLY weather_alert ALTER COLUMN wa_id SET DEFAULT nextval('weather_alert_wa_id_seq');
ALTER TABLE ONLY weather_alert ADD CONSTRAINT weather_alert_pkey PRIMARY KEY (wa_id);

CREATE TABLE weather_destinations(
  wd_id bigint NOT NULL,
  wd_wa_id bigint,
  wd_dest_id bigint,
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
COMMENT ON TABLE danger_alert_alerts IS 'Danger Alerts';
COMMENT ON COLUMN danger_alert_alerts.daa_da_id IS 'danger_alert.da_id';
COMMENT ON COLUMN danger_alert_alerts.daa_alert_id IS 'core_alert.alert_id';
CREATE SEQUENCE danger_alert_alerts_daa_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
ALTER TABLE ONLY danger_alert_alerts ALTER COLUMN daa_id SET DEFAULT nextval('danger_alert_alerts_daa_id_seq');
ALTER TABLE ONLY danger_alert_alerts ADD CONSTRAINT danger_alert_alerts_pkey PRIMARY KEY (daa_id);






CREATE TABLE core_alert(
  alert_id bigint NOT NULL,
  alert_type bigint DEFAULT 1,
  alert_name text,
  alert_description text,
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
COMMENT ON TABLE core_alert IS 'Core alerts';
COMMENT ON COLUMN core_alert.alert_type IS '1 => Destination danger alerts';
COMMENT ON COLUMN core_alert.alert_name IS 'alert name';
CREATE SEQUENCE core_alert_alert_id_seq
);


COMMENT ON TABLE weather_destinations IS 'Table for store change history';
COMMENT ON COLUMN weather_destinations.wd_id IS 'The primary key field of the table';
COMMENT ON COLUMN weather_destinations.wd_wa_id IS 'weather_alert.wa_id';
COMMENT ON COLUMN weather_destinations.wd_dest_id IS 'destination.wa_id';

COMMENT ON COLUMN weather_destinations.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN weather_destinations.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN weather_destinations.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN weather_destinations.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN weather_destinations.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN weather_destinations.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN weather_destinations.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN weather_destinations.ip_created IS 'Created ip address';
COMMENT ON COLUMN weather_destinations.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN weather_destinations.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE weather_destinations_wd_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
ALTER TABLE ONLY core_alert ALTER COLUMN alert_id SET DEFAULT nextval('core_alert_alert_id_seq');
ALTER TABLE ONLY core_alert ADD CONSTRAINT core_alert_alert_pkey PRIMARY KEY (alert_id);

ALTER TABLE ONLY weather_destinations ALTER COLUMN wd_id SET DEFAULT nextval('weather_destinations_wd_id_seq');
ALTER TABLE ONLY weather_destinations ADD CONSTRAINT weather_destinations_pkey PRIMARY KEY (wd_id);

