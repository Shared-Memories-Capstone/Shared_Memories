# Project root directory (adjust if needed)
PROJECT_ROOT := $(shell git rev-parse --show-toplevel)  # Get the project's root from Git
VENV := $(PROJECT_ROOT)/backend/venv  # Default venv location for Python backend
PYTHON := python3  # Used to create the virtual environment
PIP := $(VENV)/bin/pip  # Virtual environment's pip
DJANGO_MANAGE := $(VENV)/bin/python $(PROJECT_ROOT)/backend/manage.py
COVERAGE := $(VENV)/bin/coverage  # Coverage tool

# Always treat these names as Make commands
.PHONY: all clean venv install migrate test runserver shell coverage coverage-html

all: clean venv install migrate test

clean:
	@echo "Removing existing virtual environment..."
	rm -rf $(VENV)

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
