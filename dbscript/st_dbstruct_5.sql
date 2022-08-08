
CREATE TABLE invalid_tickets(
  it_id bigint NOT NULL,
  it_user bigint,
  it_ticket text,
  it_data text,
  it_time timestamp without time zone DEFAULT now(), 
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


COMMENT ON TABLE invalid_tickets IS 'Table invalid tickets';
COMMENT ON COLUMN invalid_tickets.it_id IS 'The primary key field of the table';
COMMENT ON COLUMN invalid_tickets.it_ticket IS 'tickt number';
COMMENT ON COLUMN invalid_tickets.it_data IS 'All data';
COMMENT ON COLUMN invalid_tickets.it_time IS 'Sync Time';
COMMENT ON COLUMN invalid_tickets.created_at IS 'Timestamp at which the row was created';
COMMENT ON COLUMN invalid_tickets.modified_at IS 'Timestamp at which the row was last modified';
COMMENT ON COLUMN invalid_tickets.deleted_at IS 'Timestamp at which the row was soft deleted';
COMMENT ON COLUMN invalid_tickets.deleted IS 'Is the row deleted: 0-No,1=Yes';
COMMENT ON COLUMN invalid_tickets.u_createdby IS 'The user id for those who created this row';
COMMENT ON COLUMN invalid_tickets.u_modifiedby IS 'The user id for those who last modified this row';
COMMENT ON COLUMN invalid_tickets.u_deletedby IS 'The user id for those who deleted this row';
COMMENT ON COLUMN invalid_tickets.ip_created IS 'Created ip address';
COMMENT ON COLUMN invalid_tickets.ip_modified IS 'Last modified ip address';
COMMENT ON COLUMN invalid_tickets.ip_deleted IS 'Deleted ip address';


CREATE SEQUENCE invalid_tickets_it_id_seq
 START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

ALTER TABLE ONLY invalid_tickets ALTER COLUMN it_id SET DEFAULT nextval('invalid_tickets_it_id_seq');
ALTER TABLE ONLY invalid_tickets ADD CONSTRAINT invalid_tickets_pkey PRIMARY KEY (it_id);

