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

# ─────────────────────────────────────────────────────────────────
# GENERAL CONFIGURATION
# ─────────────────────────────────────────────────────────────────
# Always treat these .PHONY names as Make commands
.PHONY: all clean setup test

# ─────────────────────────────────────────────────────────────────
# BACKEND COMMANDS
# ─────────────────────────────────────────────────────────────────
.PHONY: backend-clean backend-venv backend-install backend-migrate backend-test \
        backend-runserver backend-shell backend-coverage backend-coverage-html

backend-clean:
	@if [ -d "$(VENV)" ]; then \
		echo "Removing existing virtual environment..."; \
		$(RM) "$(VENV)"; \
	else \
		echo "No virtual environment found."; \
	fi

backend-venv:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Creating a new virtual environment..."; \
		$(PYTHON) -m venv "$(VENV)"; \
	else \
		echo "Virtual environment already exists, skipping creation."; \
	fi

backend-install: backend-venv
	@echo "Installing dependencies..."
	@$(PIP) install --upgrade pip
	@$(PIP) install -r "$(BACKEND_DIR)/requirements.txt"

backend-check_manage:
	@if [ ! -f "$(DJANGO_MANAGE)" ]; then \
		echo "Error: manage.py not found at $(DJANGO_MANAGE). Ensure the backend directory is correctly set up."; \
		exit 1; \
	fi

backend-migrate: backend-check_manage
	@echo "Applying database migrations..."
	@$(RUN_DJANGO_MANAGE) migrate

backend-test: backend-check_manage
	@echo "Running tests..."
	@cd $(BACKEND_DIR) && $(RUN_DJANGO_MANAGE) test

backend-runserver: backend-check_manage
	@echo "Starting the Django development server..."
	@$(RUN_DJANGO_MANAGE) runserver

backend-shell: backend-check_manage
	@echo "Launching Django shell..."
	@$(RUN_DJANGO_MANAGE) shell

backend-coverage: backend-install backend-check_manage
	@echo "Running tests with coverage tracking..."
	@cd $(BACKEND_DIR) && $(COVERAGE) run --omit='*/migrations/*' $(DJANGO_MANAGE) test
	@cd $(BACKEND_DIR) && $(COVERAGE) report -m

backend-coverage-html: backend-coverage
	@echo "Generating HTML coverage report..."
	@$(COVERAGE) html
	@echo "Open htmlcov/index.html to view the report."

# ─────────────────────────────────────────────────────────────────
# FRONTEND COMMANDS
# ─────────────────────────────────────────────────────────────────
.PHONY: frontend-clean frontend-install frontend-start frontend-build frontend-test \
        frontend-lint frontend-format

frontend-clean:
	@echo "Cleaning frontend dependencies and build files..."
	@if [ -d "$(FRONTEND_DIR)/node_modules" ]; then \
		echo "Removing node_modules..."; \
		$(RM) "$(FRONTEND_DIR)/node_modules"; \
	else \
		echo "No node_modules directory found."; \
	fi
	@if [ -d "$(FRONTEND_DIR)/dist" ]; then \
		echo "Removing frontend build files..."; \
		$(RM) "$(FRONTEND_DIR)/dist"; \
	else \
		echo "No frontend build files found."; \
	fi
	@if [ -d "$(FRONTEND_DIR)/build" ]; then \
		echo "Removing React build output..."; \
		$(RM) "$(FRONTEND_DIR)/build"; \
	else \
		echo "No frontend build output found."; \
	fi

frontend-install:
	@echo "Installing frontend dependencies..."
	@cd $(FRONTEND_DIR) && npm install

frontend-dev:
	@echo "Starting frontend development server..."
	@cd $(FRONTEND_DIR) && npm run dev

frontend-build:
	@echo "Building frontend for production..."
	@cd $(FRONTEND_DIR) && npm run build

frontend-test:
	@echo "Running frontend tests..."
	@cd $(FRONTEND_DIR) && npm test

frontend-lint:
	@echo "Linting frontend code..."
	@cd $(FRONTEND_DIR) && npm run lint

frontend-format:
	@echo "Formatting frontend code..."
	@cd $(FRONTEND_DIR) && npm run format

# ─────────────────────────────────────────────────────────────────
# GLOBAL COMMANDS
# ─────────────────────────────────────────────────────────────────
setup: backend-install
	@echo "Backend dependencies installed."

test: backend-test
	@echo "Backend tests completed."

clean: backend-clean
	@echo "Cleaned backend environment."

all: clean backend-venv backend-install backend-migrate backend-test
