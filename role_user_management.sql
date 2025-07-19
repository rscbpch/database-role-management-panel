create role 'admin';
grant all privileges on music_platform.* to 'admin' with grant option;

create role 'data_analyst';
grant select on music_platform.* to 'data_analyst';

create role 'backend_developer';
grant select, insert, update, delete on music_platform.* to 'backend_developer';

create role 'frontend_developer';
grant select on music_platform.song to 'frontend_developer';
grant select on music_platform.playlist to 'frontend_developer';
grant select on music_platform.album to 'frontend_developer';
grant select on music_platform.artist to 'frontend_developer';

create role 'qa_tester';
grant select, insert, update, delete on music_platform.* to 'qa_tester';

create role 'content_manager';
grant select, insert, update, delete on music_platform.song to 'content_manager';
grant select, insert, update, delete on music_platform.album to 'content_manager';
grant select, insert, update, delete on music_platform.artist to 'content_manager';

-- inert roles into table
use music_platform;

insert into roles (name) values 
('admin'),
('data_analyst'),
('backend_developer'),
('frontend_developer'),
('qa_tester'),
('content_manager');

insert into role_privilege (role_id, privilege) values 
(1, 'SELECT'), (1, 'INSERT'), (1, 'UPDATE'), (1, 'DELETE'), (1, 'ALTER'), 
(2, 'SELECT'),
(3, 'SELECT'), (3, 'INSERT'), (3, 'UPDATE'), (3, 'DELETE'),
(4, 'SELECT'),
(5, 'SELECT'), (5, 'INSERT'), (5, 'UPDATE'), (5, 'DELETE'),
(6, 'SELECT'), (6, 'INSERT'), (6, 'UPDATE'), (6, 'DELETE');