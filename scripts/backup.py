import os
import subprocess
import datetime

def backup_database(host, user, password, db_name, backup_dir):
    # Ensure the backup directory exists
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)

    # Create a timestamp for the backup file
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    backup_file = os.path.join(backup_dir, f"{db_name}_backup1_{timestamp}.sql")

    # Construct the mysqldump command
    #dump_command = f"/Applications/XAMPP/bin/mysqldump -h {host} -u {user} -p{password} {db_name} > {backup_file}"
    dump_command = f"/Applications/XAMPP/bin/mysqldump -h {host} -u {user} {password} {db_name} > {backup_file}"

    try:
        # Execute the backup command
        subprocess.run(dump_command, shell=True, check=True)
        print(f"Backup successful: {backup_file}")
    except subprocess.CalledProcessError as e:
        print(f"Backup failed: {e}")

backup_dir = './db_backups'
# Usage example
backup_database('localhost', 'root', '', 'music_platform', 'db_backups')
