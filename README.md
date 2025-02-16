# Shared_Memories
---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [Deploying](#deploying)
- [Git Aid](#git-aid)
- [Pre-Commit Hook Troubleshooting](#pre-commit-hook-troubleshooting)
- [Acknowledgements](#acknowledgements)

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Shared-Memories-Capstone/Shared_Memories.git
    cd Shared_Memories
    ```

1. Configure the environment variables (from project root):

    ```bash
    cp .env.example .env
    ```

    Edit `.env` to include your Django secret key.

    If you need to generate a new secret key, run the following command and copy its output:

    ```bash
    python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
    ```

1. Create and activate a virtual environment (from backend dir):

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use venv\Scripts\activate
    ```

1. Install Python requirements in virtual environment (from backend dir):

    ```bash
    pip install -r requirements.txt
    ```

1. Install Node.js dependencies (from frontend dir):

    ```bash
    npm install  # install dependencies
    ```

## Usage

1. Get Django spun up: (from backend dir)

    ```bash
    python manage.py migrate  # Run intial migration
    python manage.py runserver
    ```

    - hit `http://127.0.0.1:8000` in browser to see admin UI
    - hint: run `python manage.py collectstatic` if django admin UI is missing css

1. Create a superuser:

    ```bash
    python manage.py createsuperuser
    ```

    - follow prompts to create a username, email, and password
    - this creates a user that can access django admin UI

1. Get React/Vite spun up: (from frontend dir)

    ```bash
    npm run dev  # run frontend
    ```

    - hit `http://localhost:5173/` in browser to see admin UI

## Testing

1. Test the backend:

    ```bash
    # run a specific test
    python manage.py test api.tests.EventModelTest.test_event_creation
    # run a test case class
    python manage.py test api.tests.PhotoUploadTest
    # run the apps test cases
    python manage.py test api
    # run all the tests detected
    python manage.py test
    ```

1. Generate coverage report (from backend dir):

    ```bash
    coverage run manage.py test
    coverage report -m
    ```

1. Test the frontend:

    ```bash
    npm test  # run all the tests
    ```

1. Run all tests (from project root dir):

    ```bash
    make test  # run all of the backend and frontend tests
    ```

## Contributing

1. Enable automatic code review on commit (from project root dir):

    ```bash
    pre-commit install  # linters will run on your next commit
    ```

1. Run pre-commit hooks manually (from project root dir):

    ```bash
    pre-commit run  # run the hooks manually on modified files
    pre-commit run --all-files  # run the hooks manually on all files
    ```

1. Fetch a pull request:

    ```bash
    git fetch origin pull/{pr_number}/head:{branch_name}
    ```

1. Checkout a branch:

    ```bash
    git switch {branch_name}
    ```

## Deploying

### Install Docker Desktop

Follow the instructions on [Docker's "Get Docker Desktop" article](https://docs.docker.com/get-started/introduction/get-docker-desktop/) to install Docker on your device.

### Individually building and running the frontend and backend for development

You will use `docker-compose` to deploy the services, but you may want to build and run the containers individually to test their Dockerfiles.

1. Build the backend container (from backend dir):

    ```bash
    docker build -t sm-backend:0.1.0 .
    ```

1. Run the backend container image (from backend dir):

    ```bash
    docker run --name=sm-backend -p 8000:8000 -d --env-file ../.env sm-backend:0.1.0
    ```

1. Build the frontend container (from frontend dir):

    ```bash
    docker build -t sm-frontend:0.1.0 .
    ```

1. Run the frontend container image (from frontend dir):

    ```bash
    docker run --name=sm-frontend -p 5173:5173 -d sm-frontend:0.1.0
    ```

## GIT AID

1. `git branch` - see what branch you are currently on
1. `git checkout {branch_name}` - move to another branch
1. `git checkout -b {new_branch_name}` - create and move to a new branch
1. `git remote -v` - see your remote fetch and push locations
1. `git fetch origin pull/{pr_number}/head:{branch_name}` - create a new branch from a pull request
1. `git status` - see what files have been changed
1. `git add {file_name}` - add a file to the staging area
1. `git commit -m "{commit_message}"` - commit your changes
1. `git push origin {branch_name}` - push your changes to the remote repository

## Pre-Commit Hook Troubleshooting

### 1. Check if `pre-commit` is installed

If pre-commit hooks aren't running, make sure it’s installed in your environment:
```bash
pre-commit --version
```
If it's not installed, install it (from backend dir):
```bash
pip install -r requirements.txt
```

### 2. Ensure pre-commit is installed in the repo

If pre-commit hooks are not running automatically on commit, ensure it's installed in the repository:
```bash
pre-commit install
```

### 3. Run all pre-commit hooks manually

To check if pre-commit hooks are failing before committing:
```bash
pre-commit run --all-files
```
This will manually trigger all hooks on all files.

### 4. Run pre-commit on changed files

If you only want to check modified files:
```bash
pre-commit run
```

### 5. Check installed hooks

To see which hooks are installed:
```bash
pre-commit list
```

### 6. Bypass pre-commit hooks (if necessary)

If you need to commit but want to skip pre-commit hooks:
```bash
git commit --no-verify
```
**Use this with caution**—bypassing pre-commit can lead to linting issues or unformatted code.

### 7. Update pre-commit hooks

If pre-commit hooks are outdated or failing unexpectedly, update them:
```bash
pre-commit autoupdate
```

### 8. Reinstall pre-commit hooks

If hooks aren't working properly, try reinstalling:
```bash
pre-commit clean
pre-commit install
```

### 9. Debug failing hooks

If a hook is failing, check logs with:
```bash
pre-commit run --verbose
```

## Docker Troubleshooting

1. Error when running the backend container image:

    > docker: Error response from daemon: Conflict. The container name "/sm-backend" is already in use by container "container-id". You have to remove (or rename) that container to be able to reuse that name.

    Run the following command to remove the container. NOTE: Any changes to the container image will be lost.

    ```bash
    docker stop sm-backend
    docker rm sm-backend
    ```

    Now that you've removed the container, execute the command to run the container again (from the backend dir):

    ```bash
    docker run --name=sm-backend -p 8000:8000 -d --env-file ../.env sm-backend:0.1.0
    ```

## Acknowledgements

Created by Kaylee Burch, Victor Hong, Michael Hooker, and Cory Nagel.
