import mysql.connector
import time
import statistics

print("🔁 BENCHMARK RUNNING WITH: runs=1")

# ------------------------
# DB Connection Details
# ------------------------
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "music_platform"
}

# ------------------------
# Queries to Benchmark
# ------------------------
QUERIES = {
    "Subscription History": """
        select sh.start_date, sh.end_date, sub.duration_in_days, sub.plan_name
        from subscription_history sh 
        join subscription sub on sh.subscription_id = sub.subscription_id
        where sh.subscriber_id = 10
        order by sh.start_date desc;
    """,
    "Subscribers and Their Plans": """
        select s.username, sub.plan_name, sub.price
        from subscriber s
        join subscription sub on s.subscriber_id = sub.subscriber_id
        limit 200;
    """,
    "Playlist and Songs": """
        select pl.title as playlist_title, sub.username, s.title as song_title
        from playlist pl
        join subscriber sub on pl.subscriber_id = sub.subscriber_id
        join playlist_song pls on pl.playlist_id = pls.playlist_id
        join song s on pls.song_id = s.song_id
        where pl.playlist_id = 2;
    """,
    "Most Popular Artists": """
        select a.name, count(ph.history_id) as total_plays
        from artist a 
        join song_artist sa  on a.artist_id = sa.artist_id
        join play_history ph on sa.song_id = ph.song_id group by a.artist_id
        order by total_plays desc
        limit 10;
    """,
    "Recent Plays (Last 365 Days)": """
        select s.title, p.played_at
        from play_history p
        join song s on p.song_id = s.song_id
        where p.subscriber_id = 1
        and p.played_at >= curdate() - interval 365 day;
    """,
    "Artist Album Count": """
        select a.name, count(al.album_id) as album_count
        from artist a 
        join album al on a.artist_id = al.artist_id
        group by a.artist_id
        order by album_count desc;
    """,
    "Public Playlist Songs": """
        select pl.title as playlist_title, s.title as song_title, s.duration_in_sec
        from playlist_song pls
        join playlist pl on pls.playlist_id = pl.playlist_id
        join song s on pls.song_id = s.song_id
        where pl.is_public = true and pl.playlist_id = 1000;
    """,
    "Subscriber Signups by Birth Year": """
        SELECT DATE_FORMAT(dob, '%Y') AS birth_year, COUNT(*) AS signups
        FROM subscriber
        GROUP BY birth_year
        ORDER BY birth_year DESC;
    """,
    "Users Following Artist 10000": """
        SELECT sub.username, sub.country
        FROM subscriber_artist sa
        JOIN subscriber sub ON sa.subscriber_id = sub.subscriber_id
        WHERE sa.artist_id = 10000;
    """,
    "Most Played Songs": """
        select s.title, count(p.history_id) as play_count
        from play_history p
        join song s on p.song_id = s.song_id
        group by p.song_id
        order by play_count desc
        limit 10;
    """
}

# ------------------------
# Benchmarking Logic
# ------------------------
def run_benchmark(cursor, query, runs=1):
    times = []
    for _ in range(runs):
        start = time.perf_counter()
        # print("Executing query...")
        cursor.execute(query)
        # print("Fetching results...")
        rows = cursor.fetchall()
        # print(f"Got {len(rows)} rows")
        end = time.perf_counter()
        times.append(end - start)
    return {
        "min": min(times),
        "max": max(times),
        "avg": sum(times) / len(times),
        "stddev": statistics.stdev(times) if len(times) > 1 else 0
    }

# ------------------------
# Run Everything
# ------------------------
def main():
    print("⏳ Connecting to DB...")
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    print("\n📊 Benchmarking Queries...\n")
    for name, sql in QUERIES.items():
        print(f"🔍 Query: {name}")
        results = run_benchmark(cursor, sql, runs=10)
        print(f"    Avg   : {results['avg']:.5f} sec")
        print(f"    Min   : {results['min']:.5f} sec")
        print(f"    Max   : {results['max']:.5f} sec")
        print(f"    StdDev: {results['stddev']:.5f} sec\n")

    cursor.close()
    conn.close()
    print("✅ Done.")

if __name__ == "__main__":
    main()
