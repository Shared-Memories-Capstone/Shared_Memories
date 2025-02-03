# Detect OS (Windows or Unix-like)
OS := $(shell uname -s 2>/dev/null || echo Windows)

# Ensure required tools exist before proceeding
PYTHON := $(shell command -v python3 || command -v python || echo "not found")
PIP := $(shell command -v pip3 || command -v pip || echo "not found")
GIT := $(shell command -v git || echo "not found")

ifeq ($(PYTHON), not found)
	$(error Python is not installed or not in PATH)
endif

ifeq ($(PIP), not found)
	$(error Pip is not installed or not in PATH)
endif

ifeq ($(GIT), not found)
	$(error Git is not installed or not in PATH)
endif

# Project root directory (ensure it's a valid directory)
PROJECT_ROOT := $(shell git rev-parse --show-toplevel 2>/dev/null)

ifeq ($(PROJECT_ROOT),)
	$(error Failed to determine PROJECT_ROOT. Ensure this is a Git repository and 'git' is installed.)
endif

ifneq ($(wildcard $(PROJECT_ROOT)),)
else
	$(error PROJECT_ROOT does not exist or is inaccessible.)
endif

VENV := $(PROJECT_ROOT)/backend/venv

# Ensure VENV is inside PROJECT_ROOT
ifneq ($(findstring $(PROJECT_ROOT),$(VENV)), $(PROJECT_ROOT))
	$(error VENV is outside of PROJECT_ROOT, refusing to proceed.)
endif

# Adjust paths for Windows (use Scripts instead of bin)
ifeq ($(OS), Windows)
	PYTHON := python
	PIP := $(VENV)/Scripts/pip
	DJANGO_MANAGE := $(PROJECT_ROOT)/backend/manage.py
	COVERAGE := $(VENV)/Scripts/coverage
	RM := rmdir /s /q
else
	PYTHON := python3
	PIP := $(VENV)/bin/pip
	DJANGO_MANAGE := $(PROJECT_ROOT)/backend/manage.py
	COVERAGE := $(VENV)/bin/coverage
	RM := rm -rf
endif

# Prevent execution as root (Linux/macOS)
ifeq ($(OS), Windows)
else
	ifeq ($(shell id -u), 0)
		$(error Do not run this Makefile as root)
	endif
endif

# Ensures make halts if an error occurs during execution
.DELETE_ON_ERROR:

# Always treat these names as Make commands
.PHONY: all clean venv install migrate test runserver shell coverage coverage-html

all: clean venv install migrate test

clean:
	@if [ -d "$(VENV)" ]; then \
		echo "Removing existing virtual environment..."; \
		$(RM) "$(VENV)"; \
	else \
		echo "No virtual environment found."; \
	fi

venv:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Creating a new virtual environment..."; \
		$(PYTHON) -m venv "$(VENV)"; \
	else \
		echo "Virtual environment already exists, skipping creation."; \
	fi

install: venv
	@echo "Installing dependencies..."
	@$(PIP) install --upgrade pip
	@$(PIP) install -r "$(PROJECT_ROOT)/backend/requirements.txt"

migrate:
	@echo "Applying database migrations..."
	@$(VENV)/bin/python $(DJANGO_MANAGE) migrate

test:
	@echo "Running tests..."
	@$(VENV)/bin/python $(DJANGO_MANAGE) test

runserver:
	@echo "Starting the Django development server..."
	@$(VENV)/bin/python $(DJANGO_MANAGE) runserver

shell:
	@echo "Launching Django shell..."
	@$(VENV)/bin/python $(DJANGO_MANAGE) shell

coverage: install
	@echo "Running tests with coverage tracking..."
	@cd backend && $(COVERAGE) run --source="$(PROJECT_ROOT)/backend" --omit='*/migrations/*' $(DJANGO_MANAGE) test
	@$(COVERAGE) report -m

coverage-html: coverage
	@echo "Generating HTML coverage report..."
	@$(COVERAGE) html
	@echo "Open htmlcov/index.html to view the report."
