

CREATE TABLE survey(
  sr_id bigint NOT NULL,
  sr_usr_id bigint,
  sr_lat text,
  sr_lng text,
  sr_quality smallint,
  sr_type smallint,
  sr_file_id bigint,
  sr_accuracy text,
  sr_name text,
  sr_mob text,
  sr_feedback text,
  sr_agent_data text,
  sr_is_offline smallint DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(), 
  updated_at timestamp with time zone,
  deleted_at timestamp with time zone,
  deleted smallint DEFAULT 0 NOT NULL,
  u_createdby bigint,   
  u_modifiedby bigint,
  u_deletedby bigint,
  ip_created text,   
  ip_modified text,
  ip_deleted text
);


COMMENT ON TABLE survey IS 'Table for store local data';
COMMENT ON COLUMN survey.sr_id IS 'The primary key field of the table';
COMMENT ON COLUMN survey.sr_usr_id IS 'User :usr_id';
COMMENT ON COLUMN survey.sr_feedback IS 'Feedback';
COMMENT ON COLUMN survey.sr_lat IS 'Lattitude';
COMMENT ON COLUMN survey.sr_lng IS 'Longitude';
COMMENT ON COLUMN survey.sr_name IS 'User Name';
COMMENT ON COLUMN survey.sr_mob IS 'User mobile no.';
COMMENT ON COLUMN survey.sr_is_offline IS 'Is offline :1=>No, 2=>Yes';
COMMENT ON COLUMN survey.sr_agent_data IS 'Browser Details.';
COMMENT ON COLUMN survey.sr_file_id IS 'file.file_id';
COMMENT ON COLUMN survey.sr_accuracy IS 'Accuracy';
COMMENT ON COLUMN survey.sr_quality IS 'Audio Quality: 1=>Very Good, 2=>Good, 3=>Poor';
COMMENT ON COLUMN survey.sr_type IS 'Source Type: 1=>Car Radio, 2=>Normal Radio';
COMMENT ON COLUMN survey.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN survey.updated_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN survey.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN survey.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN survey.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN survey.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN survey.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN survey.ip_created IS 'Created ip address';
COMMENT ON COLUMN survey.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN survey.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE survey_sr_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY survey ALTER COLUMN sr_id SET DEFAULT nextval('survey_sr_id_seq');
ALTER TABLE ONLY survey ADD CONSTRAINT survey_pkey PRIMARY KEY (sr_id);


ALTER TABLE ONLY survey ADD COLUMN sr_date date ;
COMMENT ON COLUMN survey.sr_date IS 'Survey Data';

ALTER TABLE ONLY survey ADD COLUMN sr_time text;
COMMENT ON COLUMN survey.sr_time IS 'Survey Time';