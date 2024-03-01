BEGIN;

DO
$$
    DECLARE
        table_to_drop text;
    BEGIN
        FOR table_to_drop IN (SELECT table_name
                              FROM information_schema.tables
                              WHERE table_schema = 'public'
                                AND table_type = 'BASE TABLE')
            LOOP
                EXECUTE 'DROP TABLE IF EXISTS ' || table_to_drop || ' CASCADE';
            END LOOP;
    END
$$;

CREATE TABLE IF NOT EXISTS userRole
(
    roleID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    name   character varying(255) NOT NULL,
    PRIMARY KEY (roleID)
);

CREATE TABLE IF NOT EXISTS testStatus
(
    statusID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    name     character varying(255) NOT NULL,
    PRIMARY KEY (statusID)
);

CREATE TABLE IF NOT EXISTS Module
(
    ModuleID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Label    character varying(255) NOT NULL,
    PRIMARY KEY (ModuleID)

);

CREATE TABLE IF NOT EXISTS Users
(
    UserID   integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Email    character varying(255) NOT NULL UNIQUE,
    RoleID   integer                NOT NULL,
    Password character varying(255) NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (RoleID) REFERENCES userRole (RoleID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sprint
(
    SprintID  integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Title     character varying(255) NOT NULL,
    StartDate date                   NOT NULL,
    DueDate   date                   NOT NULL,
    PRIMARY KEY (SprintID)
);

CREATE TABLE IF NOT EXISTS Test
(
    TestID      SERIAL PRIMARY KEY,
    Name        VARCHAR(255) NOT NULL,
    Description VARCHAR(255) DEFAULT NULL,
    lastUpdate  DATE         DEFAULT CURRENT_DATE CHECK (lastUpdate >= CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS Testing
(
    SprintID       integer,
    TestID         integer,
    StatusID       integer NOT NULL DEFAULT 1,
    UserID         INTEGER          DEFAULT NULL,
    completionDate DATE             DEFAULT NULL,
    UNIQUE (SprintID, TestID),
    FOREIGN KEY (SprintID) REFERENCES Sprint (SprintID) MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY (TestID) REFERENCES Test (TestId) MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY (StatusID) REFERENCES TestStatus (statusid) MATCH SIMPLE,
    FOREIGN KEY (UserID) REFERENCES Users (Userid) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS TestModule
(
    TestID   integer NOT NULL,
    ModuleID integer NOT NULL,
    FOREIGN KEY (TestID) REFERENCES Test (TestID) MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY (ModuleID) REFERENCES Module (ModuleID) MATCH SIMPLE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TestStep
(
    StepID     integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    TestID     integer                NOT NULL,
    StepNR     integer                NOT NULL,
    Title      character varying(255) NOT NULL,
    TestLog    character varying(255)          DEFAULT null,
    weight     integer                         Default 0,
    completion boolean                         DEFAULT FALSE,
    PRIMARY KEY (StepID),
    FOREIGN KEY (TestID) REFERENCES Test (TestID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Attachment
(
    AttachmentID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    StepId   integer                    NOT NULL,
    path         character varying(255) NOT NULL,
    Primary key (AttachmentID),
    FOREIGN KEY (StepId) REFERENCES TestStep (StepID) MATCH SIMPLE ON DELETE CASCADE
);

END;

insert into userRole (name)
values ('admin'),
       ('developer'),
       ('tester');

INSERT INTO Users (email, RoleID, password)
VALUES ('admin', 1, '$2a$12$vsDm8ca0k/BhR/FiCVJn3.dUoUMw2.x64T2PmgAAnfvFI7pUA.FrC'),
       ('developer', 2, '$2a$12$JtIJIApdrVJL3KKctEERJOXfMc2bXzawugrLoeUllGERgDOm6IuuS'),
       ('tester', 3, '$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy'),
       ('tester2', 3, '$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy');


insert into module (label)
values ('LogIn Page'),
       ('Register Page'),
       ('Home Page'),
       ('Users Page');

insert into teststatus (name)
values ('To do'),
       ('Passed'),
       ('Blocker'),
       ('Bug');

insert into test(name, description)
values ('Check if first and last name are added correctly', 'first and last name shall be correct'),
       ('Check if wrong passwords are rejected', 'wrong passwords shall be rejected'),
       ('Check if wrong username are rejected', 'wrong usernames shall be rejected'),
       ('Check if background color is not red', 'red background shall not be accepted'),
       ('Verify the sidebar is on the side', 'sidebar shall be on the side'),
       ('Confirm confirmation works correctly', 'confirmation shall work'),
       ('Verify statuses are shown correctly', 'data stored shall be shown'),
       ('Statuses update from front end should be updated in database', 'data stored shall be updated'),
       ('Unassigning a user from a test, works correctly', 'does not crash'),
       ('Assigning a user from a test, works correctly', 'does not crash'),
       ('Making a test uploads the full data', 'does not crash'),
       ('Restarting a sprint copies all data from the old one', 'does not crash'),
       ('Not logged in users should be redirected to log in.', 'does not crash'),
       ('Admins should be able to create new users', 'does not crash'),
       ('Non admins shall not be able to create new users', 'does not crash'),
       ('Header logout option works', 'does not crash'),
       ('All test steps are shown on the test case page', 'does not crash'),
       ('Creating a test works correctly, all sprints and modules are added.', 'does not crash');

insert into teststep (testid, stepnr, title, testlog, weight)
values (1, 1, 'Open users page', 'nothing to note', 1),
       (1, 2, 'Check first name', 'nothing to note 2', 1),
       (1, 3, 'Check last name', 'nothing to note 3', 12),
       (2, 1, 'Open log in page', 'emptyness', 0),
       (2, 2, 'Enter incorrect password', 'impossible to guess', 1),
       (2, 3, 'Press Log in Button', 'pressed log in button', 20),
       (2, 4, 'Check error text says incorrect log in', 'chill', 1),
       (3, 1, 'Open log in page', 'some log', 1),
       (3, 2, 'Enter incorrect username', 'some log 2', 2),
       (3, 3, 'Press log in Button', 'pressed log in button', 3),
       (3, 4, 'Check erro text', 'And nothing else matters', 4),
       (5, 1, 'Check background is not red 1', '', 3),
       (6, 1, 'Check background is not red 2', '', 1),
       (7, 1, 'Check background is not red 3', '', 7),
       (8, 1, 'Check background is not red 4', '', 8),
       (9, 1, 'Check background is not red 5', '', 2),
       (9, 2, 'Check background is not red 6', '', 7),
       (10, 1, 'Check background is not red 11', '', 14),
       (11, 1, 'Check background is not red 12', '', 20),
       (12, 1, 'Check background is not red 13', '', 2),
       (13, 1, 'Check background is not red 14', '', 1),
       (14, 1, 'Check background is not red ...', '', 0),
       (15, 1, 'Check background is not red', '', 2),
       (16, 1, 'Check background is not red', '', 3),
       (17, 1, 'Check background is not red', '', 4),
       (18, 1, 'Check background is not red', '', 5),
       (18, 2, 'Check background is not red', '', 6),
       (18, 3, 'Check background is not red', '', 7),
       (18, 4, 'Check background is not red', '', 8),
       (18, 5, 'Check background is not red', '', 9),
       (18, 6, 'Check background is not red', '', 10),
       (18, 7, 'Check background is not red', '', 11),
       (18, 8, 'Check background is not red', '', 12),
       (18, 9, 'Check background is not red', '', 13),
       (18, 10, 'Check background is not red', '', 14),
       (18, 11, 'Check background is not red', '', 15),
       (18, 12, 'Check background is not red', '', 14),
       (18, 13, 'Check background is not red', '', 13),
       (18, 14, 'Check background is not red', '', 12),
       (18, 15, 'Check background is not red', '', 11),
       (18, 16, 'Check background is not red', '', 10),
       (18, 17, 'Check background is not red', '', 9),
       (18, 18, 'Check background is not red', '', 8),
       (18, 19, 'Check background is not red', '', 7),
       (18, 20, 'Check background is not red', '', 6),
       (18, 21, 'Check background is not red', '', 5),
       (18, 22, 'Check background is not red', '', 4),
       (18, 23, 'Check background is not red', '', 3),
       (18, 24, 'Check background is not red', '', 2),
       (18, 25, 'Check background is not red last one', '', 1);


INSERT INTO sprint (title, startdate, duedate)
VALUES ('Sprint 0', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '5 days'),
       ('Sprint 1', CURRENT_DATE + INTERVAL '6 days', CURRENT_DATE + INTERVAL '11 days'),
       ('Sprint 2', CURRENT_DATE + INTERVAL '12 days', CURRENT_DATE + INTERVAL '41 days'),
       ('Sprint 3', CURRENT_DATE + INTERVAL '42 days', CURRENT_DATE + INTERVAL '44 days');

insert into testmodule (testid, moduleid)
values (1, 1),
       (1, 4),
       (2, 2),
       (2, 3),
       (3, 3),
       (4, 1),
       (4, 2),
       (4, 3),
       (4, 4),
       (5, 3),
       (5, 4),
       (6, 2),
       (7, 3),
       (7, 4),
       (8, 1),
       (9, 2),
       (9, 2),
       (10, 3),
       (11, 1),
       (11, 2),
       (11, 4),
       (12, 3),
       (13, 1),
       (14, 2),
       (15, 4),
       (15, 3),
       (16, 2),
       (16, 1),
       (16, 3),
       (17, 1),
       (17, 4),
       (18, 2);

insert into testing (sprintid, testid, statusid, UserID)
values (1, 14, 1, 1),
       (1, 4, 1, null),
       (1, 6, 2, 3),
       (1, 7, 3, 1),
       (1, 1, 3, 2),
       (1, 3, 3, 2),
       (1, 13, 4, 3),

       (2, 1, 1, 1),
       (2, 2, 1, 1),
       (2, 3, 1, 1),
       (2, 4, 1, 2),
       (2, 5, 2, 2),
       (2, 6, 4, 3),

       (3, 1, 2, 3),
       (3, 3, 2, 3),
       (3, 5, 2, 3),
       (3, 7, 2, 2),
       (3, 9, 2, 2),
       (3, 11, 2, 1),
       (3, 13, 2, 1),
       (3, 15, 2, 2),
       (3, 17, 2, 2),
       (3, 18, 1, 3),

       (4, 2, 1, 1),
       (4, 4, 1, 2),
       (4, 5, 1, 2),
       (4, 7, 1, 3),
       (4, 8, 2, 1),
       (4, 10, 2, 2),
       (4, 11, 2, 1),
       (4, 12, 2, 1),
       (4, 13, 3, 2),
       (4, 14, 3, 3),
       (4, 15, 4, 1),
       (4, 16, 4, 2),
       (4, 17, 4, 1),
       (4, 18, 4, 1);