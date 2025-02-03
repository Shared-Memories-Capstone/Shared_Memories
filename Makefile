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

BACKEND_DIR := $(PROJECT_ROOT)/backend

# Ensure BACKEND_DIR is inside PROJECT_ROOT
ifneq ($(findstring $(PROJECT_ROOT),$(BACKEND_DIR)), $(PROJECT_ROOT))
	$(error BACKEND_DIR is outside of PROJECT_ROOT, refusing to proceed.)
endif

FRONTEND_DIR := $(PROJECT_ROOT)/frontend

# Ensure FRONTEND_DIR is inside PROJECT_ROOT
ifneq ($(findstring $(PROJECT_ROOT),$(FRONTEND_DIR)), $(PROJECT_ROOT))
	$(error FRONTEND_DIR is outside of PROJECT_ROOT, refusing to proceed.)
endif

VENV := $(BACKEND_DIR)/venv

# Ensure VENV is inside BACKEND_DIR
ifneq ($(findstring $(BACKEND_DIR),$(VENV)), $(BACKEND_DIR))
	$(error VENV is outside of BACKEND_DIR, refusing to proceed.)
endif

DJANGO_MANAGE := $(BACKEND_DIR)/manage.py

# Ensure DJANGO_MANAGE exists
# Ensure DJANGO_MANAGE exists
ifeq ($(wildcard $(DJANGO_MANAGE)),)
	$(error manage.py not found at $(DJANGO_MANAGE). Ensure the backend directory is correctly set up.)
endif

# Adjust paths for Windows (use Scripts instead of bin)
ifeq ($(OS), Windows)
	PYTHON := python
	PIP := $(VENV)/Scripts/pip
	RUN_DJANGO_MANAGE := $(VENV)/Scripts/python $(DJANGO_MANAGE)
	COVERAGE := $(VENV)/Scripts/coverage
	RM := rmdir /s /q
else
	PYTHON := python3
	PIP := $(VENV)/bin/pip
	RUN_DJANGO_MANAGE := $(VENV)/bin/python $(DJANGO_MANAGE)
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
	@$(PIP) install -r "$(BACKEND_DIR)/requirements.txt"

check_manage:
	@if [ ! -f "$(DJANGO_MANAGE)" ]; then \
		echo "Error: manage.py not found at $(DJANGO_MANAGE). Ensure the backend directory is correctly set up."; \
		exit 1; \
	fi

migrate: check_manage
	@echo "Applying database migrations..."
	@$(RUN_DJANGO_MANAGE) migrate

test: check_manage
	@echo "Running tests..."
	@cd $(BACKEND_DIR) && $(RUN_DJANGO_MANAGE) test

runserver: check_manage
	@echo "Starting the Django development server..."
	@$(RUN_DJANGO_MANAGE) runserver

shell: check_manage
	@echo "Launching Django shell..."
	@$(RUN_DJANGO_MANAGE) shell

coverage: install check_manage
	@echo "Running tests with coverage tracking..."
	@cd $(BACKEND_DIR) && $(COVERAGE) run --omit='*/migrations/*' $(DJANGO_MANAGE) test
	@cd $(BACKEND_DIR) && $(COVERAGE) report -m

coverage-html: coverage
	@echo "Generating HTML coverage report..."
	@$(COVERAGE) html
	@echo "Open htmlcov/index.html to view the report."
