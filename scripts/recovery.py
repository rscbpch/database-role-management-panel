import os
import subprocess

def restore_database(host, user, password, db_name, backup_file):
    # Construct the mysql command
    # restore_command = f"/Applications/MAMP/Library/bin/mysql -h {host} -u {user} -p{password} {db_name} < {backup_file}"
    restore_command = f"/Applications/XAMPP/bin/mysql -h {host} -u {user} {password} {db_name} < {backup_file}"

    try:
        # Execute the restore command
        subprocess.run(restore_command, shell=True, check=True)
        print(f"Restore successful from: {backup_file}")
    except subprocess.CalledProcessError as e:
        print(f"Restore failed: {e}")

# backup_dir = '/Users/seth/Desktop/dba-w5/backup/HotelManagement_backup1_20250606155601.sql'
# # Usage example
# restore_database('localhost', 'root', '', 'hotel_backup', backup_dir)

backup_dir = './db_backups'
# Usage example
restore_database('localhost', 'root', '', 'music_platform', 'db_backups')
