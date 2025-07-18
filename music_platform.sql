drop database if exists music_platform;
create database music_platform;
use music_platform;

create table subscriber (
	subscriber_id int primary key auto_increment,
	username varchar(255) unique not null,
	name varchar(255) not null,
	dob date not null,
	country varchar(255) not null,
	passwordHash varchar(255) not null
);

create table subscription (
	subscription_id int primary key auto_increment,
	subscriber_id int not null,
	plan_name varchar(255) not null,
	description text, 
	duration_in_days int not null,
	price decimal (5, 2) not null,
	foreign key (subscriber_id) references subscriber(subscriber_id)
);

create table subscription_history (
	history_id int primary key auto_increment,
	subscriber_id int not null,
	subscription_id int not null, 
	start_date date not null,
	end_date date not null,
	foreign key (subscriber_id) references subscriber(subscriber_id),
	foreign key (subscription_id) references subscription(subscription_id)
);

create table song (
	song_id int primary key auto_increment,
	title varchar(255) not null,
	duration_in_sec int not null,
	album_id int not null,
	release_date date not null
);

create table play_history (
	history_id int primary key auto_increment,
	subscriber_id int not null,
	song_id int not null,
	played_at date not null,
	foreign key (subscriber_id) references subscriber(subscriber_id),
	foreign key (song_id) references song(song_id)
);

create table playlist (
	playlist_id int primary key auto_increment,
	title varchar(255) not null,
	description text,
	created_at date not null,
	is_public boolean default false,
	subscriber_id int not null,
	foreign key (subscriber_id) references subscriber(subscriber_id)
);

create table playlist_song (
	playlist_id int,
	song_id int,
	added_at date not null,
	primary key (playlist_id, song_id),
	foreign key (playlist_id) references playlist(playlist_id),
	foreign key (song_id) references song(song_id)
);

create table artist (
	artist_id int primary key auto_increment,
	name varchar(255) not null,
	bio text,
	country varchar(255) not null
);

create table album (
	album_id int primary key auto_increment,
	title varchar(255) not null,
	release_date date not null,
	artist_id int not null,
	foreign key (artist_id) references artist(artist_id)
);

alter table song add foreign key (album_id) references album(album_id);

create table song_artist (
	artist_id int,
	song_id int,
	primary key (artist_id, song_id),
	foreign key (artist_id) references artist(artist_id),
	foreign key (song_id) references song(song_id)
);

create table subscriber_artist (
	subscriber_id int,
	artist_id int,
	primary key (subscriber_id, artist_id),
	foreign key (subscriber_id) references subscriber(subscriber_id),
	foreign key (artist_id) references artist(artist_id)
);

create table user (
  id int primary key auto_increment,
  username varchar(255) not null,
  password varchar(255) not null,
  role varchar(255) default 'user'
);

create table user_privileges (
  id int primary key auto_increment,
  user_id int,
  privilege varchar(255),
  foreign key (user_id) references user(id) on delete cascade
);


SELECT 
    table_schema AS "Database",
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)"
FROM 
    information_schema.tables
WHERE 
    table_schema = 'music_platform'
GROUP BY 
    table_schema;

