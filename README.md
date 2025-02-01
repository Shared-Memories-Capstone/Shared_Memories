# Shared_Memories
---
1. Checkout the repository:
  - `git clone git@github.com:Shared-Memories-Capstone/Shared_Memories.git`

2. [Optional] Fetch a pull request:
  - `git fetch origin pull/{pr_number}/head:{branch_name}`

3. [Optional] Checkout a branch:
  - `git checkout {branch_name}`

4. Create your venv folder in the backend dir and activate it:
  - `python3 -m venv venv`
  - `source venv/bin/activate` (mac)

5. Install Python requirements in virtual environment (from backend dir):
  - `pip install -r requirements.txt`

6. Get Django spun up: (from backend dir)
  - `python manage.py migrate` (run initial migration)
  - `python manage.py runserver` (run backend)
  - hit `http://127.0.0.1:8000` in browser to see admin UI

7. Get React/Vite spun up: (from frontend dir)
  - `npm install` (install dependencies)
  - `npm run dev` (run frontend)
  - hit `http://localhost:5173/` in browser to see admin UI

6. [Optional] Run tests and generate coverage report (from project root dir):
  - `make test` (run manually)

- GIT AID -
1. `git branch` - see what branch you are currently on
1. `git checkout {branch_name}` - move to another branch
1. `git checkout -b {new_branch_name}` - create and move to a new branch
1. `git remote -v` - see your remote fetch and push locations
1. `git fetch origin pull/{pr_number}/head:{branch_name}` - create a new branch from a pull request
