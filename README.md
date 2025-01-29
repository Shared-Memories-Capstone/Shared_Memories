# Shared_Memories
---
1. Checkout the repository:
  - `git clone git@github.com:Shared-Memories-Capstone/Shared_Memories.git`

2. Create your venv folder in the backend dir and activate it:
  - `python3 -m venv venv`
  - `source venv/bin/activate` (mac)

3. Install Python requirements in virtual environment (from backend dir):
  - `pip install -r requirements.txt`

4. Get Django spun up: (from backend dir)
  - `python manage.py migrate` (run initial migration)
  - `python manage.py runserver` (run backend)
  - hit `http://127.0.0.1:8000` in browser to see admin UI

5. Get React/Vite spun up: (from frontend dir)
  - `npm install` (install dependencies)
  - `npm run dev` (run frontend)
  - hit `http://localhost:5173/` in browser to see admin UI

6. [Optional] Import sample data (from backend dir):
  - `sqlite3 db.sqlite3 < sample-data.sql` (insert sample data)

- GIT AID -
1. `git branch` - see what branch you are currently on
2. `git checkout {branch_name}` - move to another branch
3. `git checkout -b {new_branch_name}` - create and move to a new branch
4. `git remote -v` - see your remote fetch and push locations
