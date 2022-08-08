


DROP FUNCTION IF EXISTS logs();

CREATE OR REPLACE FUNCTION logs() 
RETURNS text AS $$
DECLARE
    tablename text;
    rec record;

BEGIN  
   

FOR rec IN SELECT
     table_name
FROM
    information_schema.tables
WHERE
    table_type = 'BASE TABLE'
AND
    table_schema NOT IN ('pg_catalog', 'information_schema') AND table_name like 'st_%'
       LOOP 
    IF rec.table_name != 'st_logs' THEN
        EXECUTE format('DROP TRIGGER IF EXISTS audit_logs on %I ',rec.table_name);
        EXECUTE format('CREATE TRIGGER audit_logs
              BEFORE INSERT 
              on  %I  FOR EACH ROW
            EXECUTE PROCEDURE insert_logs()',rec.table_name);

        EXECUTE format('DROP TRIGGER IF EXISTS audit_logs_update on %I ',rec.table_name);
        EXECUTE format('CREATE TRIGGER audit_logs_update
              AFTER UPDATE
              on  %I  FOR EACH ROW WHEN (OLD.* IS DISTINCT FROM NEW.*)
            EXECUTE PROCEDURE insert_logs()',rec.table_name);
    END IF;
END LOOP;

RETURN '';
END;
            
  $$ LANGUAGE plpgsql;

--SELECT * FROM logs();


--For each table

CREATE OR REPLACE FUNCTION tablelog(tablename text) 
RETURNS text AS $$
DECLARE
   BEGIN  
        EXECUTE format('DROP TRIGGER IF EXISTS audit_logs on %I ',tablename);
    EXECUTE format('CREATE TRIGGER audit_logs
          BEFORE INSERT 
          on  %I  FOR EACH ROW
        EXECUTE PROCEDURE insert_logs()',tablename);

    EXECUTE format('DROP TRIGGER IF EXISTS audit_logs_update on %I ',tablename);
    EXECUTE format('CREATE TRIGGER audit_logs_update
          AFTER UPDATE
          on  %I  FOR EACH ROW WHEN (OLD.* IS DISTINCT FROM NEW.*)
        EXECUTE PROCEDURE insert_logs()',tablename);
RETURN '';
END;
            
  $$ LANGUAGE plpgsql;



--Insert logs into log table

CREATE OR REPLACE FUNCTION insert_logs()
RETURNS TRIGGER AS $$
DECLARE
    newRecord JSON;
    oldRecord JSON;
    primarykey bigint;
    action text;
    tablename text;
    useragent text;
    logtime TIMESTAMP WITHOUT TIME ZONE;
        userid bigint;
        ipadd text;
        primarycolumn text;
        ri record;
BEGIN
    newRecord := row_to_json(NEW.*);    
        oldRecord := row_to_json(NEW.*);    
    tablename := TG_TABLE_NAME::TEXT;
    action := TG_OP;
    

        ipadd := NEW.ip_created;
        userid := NEW.u_createdby;  
        logtime := now();
        useragent := '';
        IF quote_ident(TG_TABLE_NAME) ='ticket_print' THEN
          useragent := NEW.ua_created;
        END IF;


FOR ri IN
            -- Fetch a ResultSet listing columns defined for this trigger's table.
            SELECT ordinal_position, column_name, data_type
            FROM information_schema.columns
            WHERE
                table_schema = quote_ident(TG_TABLE_SCHEMA)
            AND table_name = quote_ident(TG_TABLE_NAME)
            ORDER BY ordinal_position LIMIT 1

        LOOP
EXECUTE 'SELECT ($1).' || ri.column_name || '::text' INTO primarykey USING NEW;
END LOOP;


    IF TG_OP = 'UPDATE' THEN
          oldRecord :=  row_to_json(OLD.*);
         
            ipadd := NEW.ip_modified;
            userid := NEW.u_modifiedby;
            --logtime := NEW.t_modified;
      IF NEW.deleted_at IS NOT NULL THEN
        action := 'DELETE';
                ipadd := NEW.ip_deleted;
        userid := NEW.u_deletedby;
        --logtime := NEW.t_deleted;
      END IF;
    END IF;
    INSERT INTO st_logs (log_table_name,log_identity_key,log_action,log_ip_address,log_userid,log_time,log_old_data,log_new_data,log_ua) VALUES 
    (tablename,primarykey,action,ipadd,userid,logtime,oldRecord,newRecord,useragent);
RETURN NEW;
  END;

$$ LANGUAGE plpgsql;


-----------------------------------------------------------------------------------------------

CREATE TABLE st_logs (
log_id bigint NOT NULL,
log_table_name text,
log_identity_key bigint,
log_action text,
log_ip_address text,
log_userid bigint,
log_time timestamp with time zone,
log_old_data text,
log_new_data text,
deleted smallint DEFAULT 0 NOT NULL

);

COMMENT ON TABLE st_logs IS 'Table for the logs';
COMMENT ON COLUMN st_logs.log_id IS 'The primary key field of the table';
COMMENT ON COLUMN st_logs.log_table_name IS 'Table name';
COMMENT ON COLUMN st_logs.log_identity_key IS 'identity key';
COMMENT ON COLUMN st_logs.log_action IS 'log action';
COMMENT ON COLUMN st_logs.log_ip_address IS 'ip address';
COMMENT ON COLUMN st_logs.log_userid IS 'core_user.usr_id';
COMMENT ON COLUMN st_logs.log_time IS 'log time';
COMMENT ON COLUMN st_logs.log_old_data IS 'old data';
COMMENT ON COLUMN st_logs.log_new_data IS 'new data';
COMMENT ON COLUMN st_logs.deleted IS 'Is the row deleted: 0-No,1=Yes';


CREATE SEQUENCE st_logs_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
ALTER TABLE ONLY st_logs ALTER COLUMN log_id SET DEFAULT nextval('st_logs_log_id_seq');
ALTER TABLE ONLY st_logs ADD CONSTRAINT st_logs_pkey PRIMARY KEY (log_id);


----------------------------------------------------------------------------------

ALTER TABLE ONLY ticket_print ADD COLUMN ua_created text ;
COMMENT ON COLUMN ticket_print.ua_created IS 'User agent';


ALTER TABLE ONLY st_logs ADD COLUMN log_ua text ;
COMMENT ON COLUMN st_logs.log_ua IS 'User agent';

Select * from tablelog('ticket_print');
Select * from tablelog('permission_user');
Select * from tablelog('permission_role');


CREATE TABLE user_login_log (
ul_id bigint NOT NULL,
ul_usr_id bigint,
ul_log_status smallint default 1,
ul_log_ip text,
ul_log_ua text,
ul_login_seq_no text,
ul_log_time timestamp without time zone default now(),
deleted_at timestamp without time zone

);

COMMENT ON TABLE user_login_log IS 'Table for the login logs';
COMMENT ON COLUMN user_login_log.ul_id IS 'The primary key field of the table';
COMMENT ON COLUMN user_login_log.ul_usr_id IS 'users.usr_id';
COMMENT ON COLUMN user_login_log.ul_login_seq_no IS 'users.seq_no';
COMMENT ON COLUMN user_login_log.ul_log_status IS 'login status: 1=>Login, 2=>Logout';
COMMENT ON COLUMN user_login_log.ul_log_ua IS 'user agent';
COMMENT ON COLUMN user_login_log.ul_log_ip IS 'ip address';
COMMENT ON COLUMN user_login_log.ul_log_time IS 'log time';
COMMENT ON COLUMN user_login_log.deleted_at IS 'delete time';


CREATE SEQUENCE user_login_log_ul_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
ALTER TABLE ONLY user_login_log ALTER COLUMN ul_id SET DEFAULT nextval('user_login_log_ul_id_seq');
ALTER TABLE ONLY user_login_log ADD CONSTRAINT user_login_log_pkey PRIMARY KEY (ul_id);

