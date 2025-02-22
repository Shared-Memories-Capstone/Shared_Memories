# Shared_Memories
---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [Deploying](#deploying)
- [Publishing Docker Images](#publishing-docker-images)
- [Git Aid](#git-aid)
- [Pre-Commit Hook Troubleshooting](#pre-commit-hook-troubleshooting)
- [Acknowledgements](#acknowledgements)

## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Shared-Memories-Capstone/Shared_Memories.git
    cd Shared_Memories
    ```

1. Create and activate a virtual environment (from backend dir):

    ```bash
    python3 -m venv venv  # On Windows, uses `python -m venv venv`.
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`.
    ```

1. Install Python requirements in virtual environment (from backend dir):

    ```bash
    pip install -r requirements.txt
    ```

1. Configure the environment variables (from project root):

    ```bash
    cp .env.dev.example .env # For deployment.
    cp .env.prod.example .env  # OPTIONAL: For production. Will overwite deployment .env.
    ```

    Edit `.env` to include your Django secret key and other unique values.

    OPTIONAL: If you need to generate a new secret key, run the following command and copy its output:

    ```bash
    python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
    ```

    OPTIONAL: If you want to dynamically set the .env file for the backend, you can set a shell environment variable:

    ```bash
    export ENV_FILE=$(pwd)/.env.dev
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
    make test  # Linux and MacOS-only: run all of the backend and frontend tests
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

### Install the Development Environment

Follow the instructions in the [Installation](#installation) section to establish your development environment. You will need the cloned repo to build your container images. Make sure you configure your `.env` for either development (e.g., `.env.dev.example`) or production (e.g., `.env.prod.example`).

### Install Docker Desktop

Follow the instructions on [Docker's "Get Docker Desktop" article](https://docs.docker.com/get-started/introduction/get-docker-desktop/) to install Docker on your device.

### Running Docker Compose

1. Build and start services using docker compose (from project root):

    ```bash
    docker compose up --build -d
    ```

1. Run migrations on postgres container image (from project root):

    ```bash
    docker exec -it shared_memories-backend-1 python manage.py migrate
    ```

1. Tear down multi-container setup (from project root):

    ```bash
    docker compose down
    ```

### Individually building and running the frontend and backend for development

You will use `docker compose` to deploy the services, but you may want to build and run the containers individually to test their Dockerfiles.

1. Create the network so the containers can communicate (from project root):

    ```bash
    docker network create shared_memories_net
    ```

1. Build the backend container (from backend dir):

    ```bash
    docker build -t sm-backend:latest .
    ```

1. Run the backend container image (from project root):

    On MacOS and Linux devices:

    ```bash
    docker run --name sm-backend \
        --hostname backend \
        --mount src=static_volume,dst=/usr/local/src/app/static \
        --mount src=media_volume,dst=/usr/local/src/app/media \
        --network shared_memories_net \
        --rm \
        -p "8000:8000" \
        -v $(pwd)/.env:/usr/local/src/.env \
        sm-backend:latest
    ```

    On Windows devices:

    ```powershell
    docker run --name sm-backend `
        --hostname backend `
        --mount src=static_volume,dst=/usr/local/src/app/static `
        --mount src=media_volume,dst=/usr/local/src/app/media `
        --network shared_memories_net `
        --rm `
        -p "8000:8000" `
        -v "${PWD}/.env:/usr/local/src/.env" `
        sm-backend:latest
    ```

1. Build the frontend container (from frontend dir):

    On MacOS and Linux devices:

    ```bash
    docker build \
        --build-arg VITE_API_URL=http://localhost/api \
        -t sm-frontend:latest .
    ```

    On Windows devices:

    ```powershell
    docker build `
        --build-arg VITE_API_URL="http://localhost/api" `
        -t sm-frontend:latest .
    ```

1. Run the frontend container image (from frontend dir):

    On MacOS and Linux devices:

    ```bash
    docker run --name sm-frontend \
        --hostname frontend \
        --mount src=static_volume,dst=/usr/local/src/app/static,readonly \
        --mount src=media_volume,dst=/usr/local/src/app/media,readonly \
        --network shared_memories_net \
        --rm \
        -p "80:80" \
        sm-frontend:latest
    ```

    On Windows devices:

    ```powershell
    docker run `
        --name sm-frontend `
        --hostname frontend `
        --mount src=static_volume,dst=/usr/local/src/app/static,readonly `
        --mount src=media_volume,dst=/usr/local/src/app/media,readonly `
        --network shared_memories_net `
        --rm `
        -p "80:80" `
        sm-frontend:latest
    ```

1. Run the official postgres container image (from project root):

    ```bash
    docker run --name sm-db \
        --hostname db \
        --network shared_memories_net \
        --env-file .env \
        --rm \
        -v postgres_data:/var/lib/postgresql/data \
        -d postgres:17.3-alpine
    ```

1. Run migrations on postgres container image (from project root):

    ```bash
    docker exec -it sm-backend python manage.py migrate
    ```

## Publishing Docker Images

To build the Docker container images that the server will pull, you need to create builds for the `linux/amd64` platform.

1. Log in to Docker Hub

    Before pushing, make sure you're logged into Docker Hub:

    ```bash
    docker login
    ```

    You'll be prompted for your Docker Hub username and password.

1. Build, tag, and push your backend image (from project root):

    ```bash
    # Build backend images for Apple Silicon and AMD64 Linux.
    docker buildx build --platform linux/amd64,linux/arm64 \
        -t mhooker/shared_memories-backend:latest \
        --push \
        ./backend
    ```

1. Build, tag, and push your frontend image (from project root):

    Building the frontend requires you to provide a `VITE_API_URL` build arg. If this argument is not included, the site frontend will be built with the development backend URL (`http://localhost:8000/api`). You need to know where you'll deploy this image, but, in general, you should use either `http://localhost/api` (local production deployments) or `http://sharedmemories.org/api` (live production deployments).

    ```bash
     export VITE_API_URL=http://sharedmemories.org/api  # Live production deployment
     ```

     The build process will bake the `VITE_API_URL` value into the HTML and JS source code that Nginx will serve.

    ```bash
    # Build frontend images for Apple Silicon and AMD64 Linux.
    docker buildx build --platform linux/amd64,linux/arm64 \
        -t mhooker/shared_memories-frontend:latest \
        --build-arg VITE_API_URL=$VITE_API_URL \
        --push \
        ./frontend
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

    Now that you've removed the container, execute the command to run the container again.

## Acknowledgements

Created by Kaylee Burch, Victor Hong, Michael Hooker, and Cory Nagel.
