# Detect OS (Windows or Unix-like)
OS := $(shell uname -s 2>/dev/null || echo Windows)

# Project root directory (works for Git Bash, MinGW, WSL, macOS, and Linux)
PROJECT_ROOT := $(shell git rev-parse --show-toplevel)
ifeq ($(PROJECT_ROOT),)
  $(error Failed to determine PROJECT_ROOT. Ensure this is a Git repository and 'git' is installed.)
endif

VENV := $(PROJECT_ROOT)/backend/venv

# Adjust paths for Windows (use Scripts instead of bin)
ifeq ($(OS), Windows)
	PYTHON := python
	PIP := $(VENV)/Scripts/pip
	DJANGO_MANAGE := $(VENV)/Scripts/python $(PROJECT_ROOT)/backend/manage.py
	COVERAGE := $(VENV)/Scripts/coverage
	RM := rmdir /s /q
else
	PYTHON := python3
	PIP := $(VENV)/bin/pip
	DJANGO_MANAGE := $(VENV)/bin/python $(PROJECT_ROOT)/backend/manage.py
	COVERAGE := $(VENV)/bin/coverage
	RM := rm -rf
endif

# Always treat these names as Make commands
.PHONY: all clean venv install migrate test runserver shell coverage coverage-html

all: clean venv install migrate test

clean:
	@echo "Removing existing virtual environment..."
	-$(RM) $(VENV)

venv:
	@echo "Creating a new virtual environment..."
	$(PYTHON) -m venv $(VENV)

install: venv
	@echo "Installing dependencies..."
	$(PIP) install --upgrade pip
	$(PIP) install -r $(PROJECT_ROOT)/backend/requirements.txt

migrate:
	@echo "Applying database migrations..."
	$(DJANGO_MANAGE) migrate

test:
	@echo "Running tests..."
	$(DJANGO_MANAGE) test

runserver:
	@echo "Starting the Django development server..."
	$(DJANGO_MANAGE) runserver

shell:
	@echo "Launching Django shell..."
	$(DJANGO_MANAGE) shell

coverage: install
	@echo "Running tests with coverage tracking..."
	$(COVERAGE) run --source=$(PROJECT_ROOT)/backend --omit='*/migrations/*' $(DJANGO_MANAGE) test
	$(COVERAGE) report -m

coverage-html: coverage
	@echo "Generating HTML coverage report..."
	$(COVERAGE) html
	@echo "Open htmlcov/index.html to view the report."
