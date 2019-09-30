import time, datetime, subprocess

# NOTE: specify the scheduled post time here
scheduled_time = datetime.datetime(2019, 9, 30, 23, 34) 

while True:
	if datetime.datetime.now() > scheduled_time:
		subprocess.check_call(['node', 'index.js'])
		exit()
	else:
		time.sleep(1)