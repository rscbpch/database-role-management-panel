# subscription history of a user
select sh.start_date, sh.end_date, sub.duration_in_days, sub.plan_name
	from subscription_history sh 
	join subscription sub on sh.subscription_id = sub.subscription_id
	where sh.subscriber_id = 10
	order by sh.start_date desc;

# subscribers and their plans
select s.username, sub.plan_name, sub.price
	from subscriber s
	join subscription sub on s.subscriber_id = sub.subscriber_id
	limit 200;

# show playlist user and songs in it
select pl.title as playlist_title, sub.username, s.title as song_title
	from playlist pl
	join subscriber sub on pl.subscriber_id = sub.subscriber_id
	join playlist_song pls on pl.playlist_id = pls.playlist_id
	join song s on pls.song_id = s.song_id
	where pl.playlist_id = 2;

# most popular artists by total plays
select a.name, count(ph.history_id) as total_plays
	from artist a 
	join song_artist sa  on a.artist_id = sa.artist_id
	join play_history ph on sa.song_id = ph.song_id group by a.artist_id
	order by total_plays desc
	limit 10;

# last X days played
select s.title, p.played_at
	from play_history p
	join song s on p.song_id = s.song_id
	where p.subscriber_id = 1
	and p.played_at >= curdate() - interval 365 day;
	

# artists and album amount
select a.name, count(al.album_id) as album_count
	from artist a 
	join album al on a.artist_id = al.artist_id
	group by a.artist_id
	order by album_count desc;

# songs from a public playlist
select pl.title as playlist_title, s.title as song_title, s.duration_in_sec
	from playlist_song pls
	join playlist pl on pls.playlist_id = pl.playlist_id
	join song s on pls.song_id = s.song_id
	where pl.is_public = true and pl.playlist_id = 1000;


# subscriber signups age group
SELECT DATE_FORMAT(dob, '%Y') AS birth_year, COUNT(*) AS signups
FROM subscriber
GROUP BY birth_year
ORDER BY birth_year DESC;

# users following an artist
SELECT sub.username, sub.country
FROM subscriber_artist sa
JOIN subscriber sub ON sa.subscriber_id = sub.subscriber_id
WHERE sa.artist_id = 10000;

# most played songs
select s.title, count(p.history_id) as play_count
	from play_history p
	join song s on p.song_id = s.song_id
	group by p.song_id
	order by play_count desc
	limit 10;


# indexes
create index idx_sh_subscriber on subscription_history(subscriber_id);
create index idx_sub_subscriber on subscription(subscriber_id);
create index idx_playlist_id on playlist(playlist_id);
create index idx_pls_playlist_song on playlist_song(playlist_id, song_id);
create index idx_song_id on song(song_id);
create index idx_subscriber_dob on subscriber(dob);
create index idx_sa_song on song_artist(song_id);
create index idx_sa_artist on song_artist(artist_id);
create index idx_ph_song on play_history(song_id);
create index idx_ph_sub_played on play_history(subscriber_id, played_at);
create index idx_album_artist on album(artist_id);
create index idx_subartist_artist on subscriber_artist(artist_id);
create index idx_subartist_sub on subscriber_artist(subscriber_id);


select * from subscriber s;




