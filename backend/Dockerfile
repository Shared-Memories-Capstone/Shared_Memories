# ─────────────────────────────────────────────────────────────────
# Backend - Python Django Application
# ─────────────────────────────────────────────────────────────────

# Use the official Python image with a lightweight Alpine Linux base
FROM python:3.11-alpine

# Set environment variables for Python
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Set the working directory inside the container
WORKDIR /usr/local/src/app

# Copy the application's dependency list (requirements.txt)
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend application code into the container
COPY . .

# Allow entrypoint.sh to execute
RUN chmod +x ./entrypoint.sh

# Expose port 8000 (default for Django's development server)
EXPOSE 8000

# Check whether the backend returns 200 OK periodically
HEALTHCHECK --interval=60s --start-interval=5s --start-period=10s \
    --timeout=10s --retries=3 \
    CMD python -c "import sys, urllib.request; \
    sys.exit( \
    0 if urllib.request.urlopen('http://localhost:8000/api/').getcode() == 200 else 1)"

# Define the entry point to start the Django server
ENTRYPOINT ["./entrypoint.sh"]
