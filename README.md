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

3. Create a superuser:
  - `python manage.py createsuperuser`
  - follow prompts to create a username, email, and password
  - this creates a user that can access django admin UI

4. Get React/Vite spun up: (from frontend dir)
  - `npm install` (install dependencies)
  - `npm run dev` (run frontend)
  - hit `http://localhost:5173/` in browser to see admin UI

- GIT AID -
1. `git branch` - see what branch you are currently on
2. `git checkout {branch_name}` - move to another branch
3. `git checkout -b {new_branch_name}` - create and move to a new branch
4. `git remote -v` - see your remote fetch and push locations
5. `git status` - see what files have been changed
6. `git add {file_name}` - add a file to the staging area
7. `git commit -m "{commit_message}"` - commit your changes
8. `git push origin {branch_name}` - push your changes to the remote repository
