# Shared_Memories
---
1. Create your venv folder and activate it:
  - `python3 -m venv venv`
  - `source venv/bin/activate` (mac)

2. Get Django spun up:
  - `python manage.py migrate` (run initial migration)
  - `python manage.py runserver` (run server locally)
  - hit `http://127.0.0.1:8000` in browser to see admin UI

- GIT AID -
1. `git branch` - see what branch you are currently on
2. `git checkout {branch_name}` - move to another branch
3. `git checkout -b {new_branch_name}` - create and move to a new branch
4. `git remote -v` - see your remote fetch and push locations