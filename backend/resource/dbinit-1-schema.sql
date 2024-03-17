--
-- IMPORTANT: In dbeaver (and possibly others), this must be executed as "execute SQL script" (alt+x), not "execute"
-- SQL statement" (ctrl+enter), otherwise it won't work (my guess: it only executes the last statement then).
--
drop schema "edu2" cascade;
create schema "edu2";

create table "edu2"."Author" (
    "id" bigint not null primary key generated always as identity,
    "name" varchar not null
);

create table "edu2"."Course" (
    "id" bigint not null primary key generated always as identity,
    "authorId" bigint not null references "edu2"."Author" ("id"),
    "title" varchar not null,
    "description" varchar not null,
    "scriptLibrary" varchar not null
);

create table "edu2"."Unit" (
    "id" bigint not null primary key generated always as identity,
    "courseId" bigint not null references "edu2"."Course" ("id"),
    "index" integer not null,
    "title" varchar not null,
    "description" varchar not null,
    "exerciseUrl" varchar null,
    "exerciseDefinition" jsonb not null,
    "exerciseScript" varchar not null
);

-- Images are linked to a course, not the author, because they are assumed to be rarely shared, and the course is
-- less dependent on the author and more self-contained this way. We might link them to a single unit later if
-- necessary.
create table "edu2"."Image" (
    "id" bigint not null primary key generated always as identity,
    "courseId" bigint not null references "edu2"."Course" ("id"),
    "contentType" varchar not null,
    "data" bytea not null
);
