SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
	"id" serial NOT NULL,
    "username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  -- what is OIDS???
  OIDS=FALSE
);

CREATE TABLE public.workspace (
	"id" serial NOT NULL,
  	"name" varchar NOT NULL,
	"workspace" varchar NOT NULL,
	CONSTRAINT "workspace_pk" PRIMARY KEY ("id")
) WITH (
  -- what is OIDS???
  OIDS=FALSE
);

CREATE TABLE public.user_workspace (
	"id" serial NOT NULL,
    "user_id" bigint NOT NULL,
	"workspace_id" bigint NOT NULL,
	CONSTRAINT "user_workspace_pk" PRIMARY KEY ("id")
    -- FOREIGN KEY ("user_id") REFERENCES public.users("id"),
    -- FOREIGN KEY ("workspace_id") REFERENCES public.workspace("id")
) WITH (
  -- what is OIDS???
  OIDS=FALSE
);

CREATE TABLE public.snacks (
	"id" varchar NOT NULL,
	CONSTRAINT "snacks_pk" PRIMARY KEY ("id")
) WITH (
  -- what is OIDS???
  OIDS=FALSE
);

CREATE TABLE public.stickies (
	"stickie_id" serial NOT NULL,
	"id" varchar NOT NULL,
	"description" varchar NOT NULL,
	"snack_id" varchar NOT NULL,
	"assigned_id" varchar NOT NULL,
	"workspace_id" varchar NOT NULL,
	CONSTRAINT "stickies_pk" PRIMARY KEY ("stickie_id")
) WITH (
  -- what is OIDS???
  OIDS=FALSE
);

CREATE TABLE public.sessions (
	"id" varchar NOT NULL,
	CONSTRAINT "session_pk" PRIMARY KEY ("id")
) WITH (
  -- what is OIDS???
  OIDS=FALSE
);

-- CREATE TABLE public.userWorkspaceJoin (
--   "id" integer NOT NULL,
--   "User_UserID" varchar NOT NULL,
--   "Workspace_WorkspaceID" varchar NOT NULL,
--   CONSTRAINT "userworkspacejoin_pk" PRIMARY KEY ("id")
-- ) WITH (
--   -- what is OIDS???
--   OIDS=FALSE
-- )
-- ALTER TABLE public.stickies ADD CONSTRAINT "stickies_fk0" FOREIGN KEY ("snack_id") REFERENCES  public.snacks("id");
-- ALTER TABLE public.stickies ADD CONSTRAINT "stickies_fk1" FOREIGN KEY ("assigned_id") REFERENCES  public.users("id");
-- ALTER TABLE public.stickies ADD CONSTRAINT "stickies_fk2" FOREIGN KEY ("workspace_id") REFERENCES  public.workspace("id");
-- ALTER TABLE public.userWorkspaceJoin ADD CONSTRAINT "userworkspacejoin_fk0" FOREIGN KEY ("User_UserID") REFERENCES  public.user("UserID");
-- ALTER TABLE public.userWorkspaceJoin ADD CONSTRAINT "userworkspacejoin_fk1" FOREIGN KEY ("Workspace_WorkspaceID") REFERENCES  public.workspace("WorkspaceID");

ALTER TABLE public.user_workspace ADD CONSTRAINT "user_workspace_fk0" FOREIGN KEY (user_id) REFERENCES public.users("id");
ALTER TABLE public.user_workspace ADD CONSTRAINT "user_workspace_fk1" FOREIGN KEY (workspace_id) REFERENCES public.workspace("id");

INSERT INTO public.users (username, password) VALUES ('test1', 'test1');
INSERT INTO public.users (username, password) VALUES ('test2', 'test2');
INSERT INTO public.users (username, password) VALUES ('test3', 'test3');

INSERT INTO public.workspace (name, workspace) VALUES ('scrum1', '{column: 1}');
INSERT INTO public.workspace (name, workspace) VALUES ('scrum2', '{column: 2}');
INSERT INTO public.workspace (name, workspace) VALUES ('scrum3', '{column: 3}');
INSERT INTO public.workspace (name, workspace) VALUES ('scrumtest', '{
  "To Start":{},
  "In Progress":{},
  "Blocked":{},
  "In Review":{},
  "Complete":
    {
      "sticky1":{
          "title":"Discuss Github Pronunciation",
          "description":"Description: Is it github, or jithub?",
          "snack":"Snack: Trail-Mix"
        },
      "sticky2":{
          "title":"Discuss Github Pronunciation",
          "description":"Description: Is it github, or jithub?",
          "snack":"Snack: Trail-Mix"
        }
    },
  "ssid":"2"
}');


INSERT INTO public.user_workspace VALUES (1, 1, 1);
INSERT INTO public.user_workspace VALUES (2, 2, 2);
INSERT INTO public.user_workspace VALUES (3, 3, 3);
